const { Member, LoginToken } = require('../models');
const crypto = require('crypto');
const EmailService = require('../utils/emailService');

class AuthController {
  // Request magic link login (send email with link)
  static async requestLogin(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      // Check if member exists
      const member = await Member.findByEmail(email);
      if (!member) {
        // Don't reveal that email doesn't exist (security best practice)
        // Still return success to prevent email enumeration
        return res.json({
          success: true,
          message: 'If an account exists with this email, a login link has been sent.'
        });
      }

      // Delete any existing tokens for this email (prevent token spam)
      await LoginToken.deleteByEmail(email);

      // Create new login token (expires in 15 minutes)
      const loginToken = await LoginToken.create(email, 15);

      // Generate magic link URL
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const magicLink = `${baseUrl}/verify?token=${loginToken.token}`;

      // Send magic link email (non-blocking - log error but don't fail request)
      try {
        await EmailService.sendMagicLinkEmail(email, member.name, magicLink);
      } catch (emailError) {
        console.error('Failed to send magic link email:', emailError);
        // Continue even if email fails - token is still created and valid
        // User can request another link if needed
      }

      res.json({
        success: true,
        message: 'If an account exists with this email, a login link has been sent.'
      });
    } catch (error) {
      console.error('Request login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Verify magic link token and log user in
  static async verifyToken(req, res) {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token is required'
        });
      }

      // Find and mark token as used in a single atomic operation (more efficient)
      const loginToken = await LoginToken.findAndMarkAsUsed(token);
      if (!loginToken) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired token'
        });
      }

      // Get member by email
      const member = await Member.findByEmail(loginToken.email);
      if (!member) {
        return res.status(401).json({
          success: false,
          message: 'Member not found'
        });
      }

      // Generate session token using built-in crypto (no external dependency needed)
      const sessionSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const sessionData = `${member.id}:${member.email}:${member.name}:${Date.now() + 7 * 24 * 60 * 60 * 1000}`;
      const hmac = crypto.createHmac('sha256', sessionSecret);
      hmac.update(sessionData);
      const signature = hmac.digest('hex');
      const sessionToken = Buffer.from(sessionData).toString('base64') + '.' + signature;

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token: sessionToken,
          member: {
            id: member.id,
            name: member.name,
            email: member.email,
            role_name: member.role_name,
            workplace_name: member.workplace_name
          }
        }
      });
    } catch (error) {
      console.error('Verify token error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Legacy login endpoint (kept for backward compatibility, but now redirects to requestLogin)
  static async login(req, res) {
    // Redirect to requestLogin for email-based auth
    return this.requestLogin(req, res);
  }

  // Logout
  static async logout(req, res) {
    try {
      // Session tokens are stateless (no server-side storage)
      // Client should remove the token from storage
      // For additional security, you could implement a token blacklist here if needed
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get current user info
  static async getCurrentUser(req, res) {
    try {
      // User should be attached by authMiddleware
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const member = await Member.findById(req.user.id);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found'
        });
      }

      res.json({
        success: true,
        data: {
          member: {
            id: member.id,
            name: member.name,
            email: member.email,
            role_name: member.role_name,
            workplace_name: member.workplace_name
          }
        }
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Register new member (if needed for self-registration)
  static async register(req, res) {
    try {
      const memberData = req.body;

      // Check if member already exists
      const existingMember = await Member.findByEmail(memberData.email);
      if (existingMember) {
        return res.status(409).json({
          success: false,
          message: 'Member with this email already exists'
        });
      }

      // Check if UO ID already exists
      const existingUOId = await Member.findByUOId(memberData.uo_id);
      if (existingUOId) {
        return res.status(409).json({
          success: false,
          message: 'Member with this UO ID already exists'
        });
      }

      // Create new member
      const newMember = await Member.create(memberData);

      res.status(201).json({
        success: true,
        message: 'Member registered successfully',
        data: { member: newMember }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController;

