const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get current user
router.get('/me', auth, authController.getCurrentUser);

// Logout
router.post('/logout', auth, authController.logout);

// Refresh token
router.post('/refresh', authController.refreshToken);

module.exports = router;
