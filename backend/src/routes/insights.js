const express = require('express');
const insightController = require('../controllers/insightController');

const router = express.Router();

// Get insights
router.get('/', insightController.getInsights);

// Get market statistics
router.get('/stats', insightController.getMarketStats);

// Add insight
router.post('/', insightController.addInsight);

module.exports = router;
