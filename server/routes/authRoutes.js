const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', AuthController.login);

// POST /api/auth/logout
router.post('/logout', AuthController.logout);

// GET /api/auth/me
router.get('/me', AuthController.getCurrentUser);

// POST /api/auth/register (if needed for self-registration)
router.post('/register', AuthController.register);

module.exports = router;

