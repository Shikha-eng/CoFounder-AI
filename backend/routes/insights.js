const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const insightController = require('../controllers/insightController');

// Get market insights by category
router.get('/:category', auth, insightController.getInsights);

// Get all market data
router.get('/', auth, insightController.getAllMarketData);

module.exports = router;
