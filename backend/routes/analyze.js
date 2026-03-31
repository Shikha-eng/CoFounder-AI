const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const analyzeController = require('../controllers/analyzeController');

// Analyze startup idea
router.post('/', auth, analyzeController.analyzeIdea);

// Get analysis results
router.get('/:ideaId', auth, analyzeController.getAnalysisResults);

module.exports = router;
