const { body, validationResult } = require('express-validator');

class ValidateInput {
  // Validate member registration
  static validateMemberRegistration() {
    return [
      body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Name must be between 1 and 100 characters')
        .matches(/^[a-zA-Z\s\-'\.]+$/)
        .withMessage('Name can only contain letters, spaces, hyphens, apostrophes, and periods'),
      
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address'),
      
      body('uo_id')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('UO ID must be between 8 and 20 characters')
        .matches(/^[0-9]+$/)
        .withMessage('UO ID must contain only numbers'),
      
      body('workplace_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Workplace ID must be a positive integer'),
      
      body('role_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Role ID must be a positive integer'),
      
      body('dues_status')
        .optional()
        .isIn(['paid', 'unpaid', 'exempt'])
        .withMessage('Dues status must be paid, unpaid, or exempt'),
      
      body('membership_status')
        .optional()
        .isIn(['active', 'inactive', 'graduated', 'suspended'])
        .withMessage('Membership status must be active, inactive, graduated, or suspended'),
      
      body('major')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Major must be 100 characters or less'),
      
      body('phone')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Phone must be 20 characters or less')
        .matches(/^[\d\-\+\(\)\s]+$/)
        .withMessage('Phone can only contain digits, spaces, hyphens, parentheses, and plus signs'),
      
      body('pronouns')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Pronouns must be 50 characters or less'),
      
      body('graduation_year')
        .optional()
        .isInt({ min: 2020, max: 2030 })
        .withMessage('Graduation year must be between 2020 and 2030')
    ];
  }

  // Validate event creation
  static validateEventCreation() {
    return [
      body('title')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
      
      body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description must be 1000 characters or less'),
      
      body('event_date')
        .isISO8601()
        .withMessage('Event date must be a valid ISO 8601 date')
        .custom((value) => {
          const eventDate = new Date(value);
          const now = new Date();
          if (eventDate < now) {
            throw new Error('Event date cannot be in the past');
          }
          return true;
        }),
      
      body('location')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Location must be 200 characters or less'),
      
      body('created_by')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Creator ID must be a positive integer')
    ];
  }

  // Validate email format
  static validateEmail() {
    return [
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address')
    ];
  }

  // Validate UO ID format
  static validateUOID() {
    return [
      body('uo_id')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('UO ID must be between 8 and 20 characters')
        .matches(/^[0-9]+$/)
        .withMessage('UO ID must contain only numbers')
    ];
  }

  // Validate login credentials
  static validateLogin() {
    return [
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address'),
      
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
    ];
  }

  // Validate check-in data
  static validateCheckIn() {
    return [
      body('member_id')
        .isInt({ min: 1 })
        .withMessage('Member ID must be a positive integer'),
      
      body('qr_code_token')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('QR code token must be 100 characters or less')
    ];
  }

  // Validate workplace data
  static validateWorkplace() {
    return [
      body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Workplace name must be between 1 and 100 characters'),
      
      body('location')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Location must be 200 characters or less')
    ];
  }

  // Validate role data
  static validateRole() {
    return [
      body('name')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Role name must be between 1 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Role name can only contain letters and spaces'),
      
      body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must be 500 characters or less')
    ];
  }

  // Validate announcement data
  static validateAnnouncement() {
    return [
      body('subject')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Subject must be between 1 and 200 characters'),
      
      body('message')
        .trim()
        .isLength({ min: 1, max: 5000 })
        .withMessage('Message must be between 1 and 5000 characters'),
      
      body('recipients')
        .isArray({ min: 1 })
        .withMessage('Recipients must be an array with at least one member')
    ];
  }

  // Handle validation errors
  static handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }

  // Sanitize input data
  static sanitizeInput(req, res, next) {
    // Trim string values
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
    next();
  }

  // Validate pagination parameters
  static validatePagination() {
    return [
      body('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
      
      body('offset')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Offset must be a non-negative integer')
    ];
  }
}

module.exports = ValidateInput;

