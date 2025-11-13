const { Member } = require('../models');
const crypto = require('crypto');

class AuthMiddleware {
  // Verify user is logged in using JWT token
  static async authenticate(req, res, next) {
    try {
      // Get token from Authorization header
      const authHeader = req.header('Authorization');
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      }

      // Extract token (format: "Bearer <token>")
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      }

      // Verify session token using built-in crypto
      const sessionSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const [encodedData, signature] = token.split('.');
      
      if (!encodedData || !signature) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token format'
        });
      }

      // Verify signature
      const hmac = crypto.createHmac('sha256', sessionSecret);
      hmac.update(encodedData);
      const expectedSignature = hmac.digest('hex');
      
      if (signature !== expectedSignature) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }

      // Decode and parse token data
      const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
      const [id, email, name, expiresAt] = decodedData.split(':');
      
      // Check expiration
      if (parseInt(expiresAt) < Date.now()) {
        return res.status(401).json({
          success: false,
          message: 'Token expired'
        });
      }

      // Attach user info to request
      req.user = {
        id: parseInt(id),
        email: email,
        name: name
      };

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({
        success: false,
        message: 'Authentication failed'
      });
    }
  }

  // Check user role permissions
  static authorizeRole(allowedRoles) {
    return async (req, res, next) => {
      try {
        // TODO: Implement role checking when authentication is added
        // For now, just pass through
        
        // Example implementation:
        // const member = await Member.findById(req.user.id);
        // if (!member || !allowedRoles.includes(member.role_name)) {
        //   return res.status(403).json({
        //     success: false,
        //     message: 'Access denied. Insufficient permissions.'
        //   });
        // }
        
        next();
      } catch (error) {
        console.error('Authorization error:', error);
        res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    };
  }

  // Verify admin access
  static async authorizeAdmin(req, res, next) {
    try {
      // TODO: Implement admin checking when authentication is added
      // For now, just pass through
      
      // Example implementation:
      // const member = await Member.findById(req.user.id);
      // const adminRoles = ['President', 'Treasurer', 'Executive Member'];
      // if (!member || !adminRoles.includes(member.role_name)) {
      //   return res.status(403).json({
      //     success: false,
      //     message: 'Admin access required'
      //   });
      // }
      
      next();
    } catch (error) {
      console.error('Admin authorization error:', error);
      res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
  }

  // Optional authentication (doesn't fail if no auth)
  static async optionalAuth(req, res, next) {
    try {
      // TODO: Implement optional authentication
      // This would be useful for endpoints that work differently for logged-in vs anonymous users
      
      req.user = null; // Placeholder
      next();
    } catch (error) {
      // Don't fail on optional auth errors
      req.user = null;
      next();
    }
  }
}

module.exports = AuthMiddleware;

