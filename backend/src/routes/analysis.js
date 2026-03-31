const express = require('express');
const analysisController = require('../controllers/analysisController');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Analyze a new idea
router.post('/', optionalAuth, analysisController.analyzeIdea);

// Get analysis for specific idea
router.get('/:ideaId', analysisController.getAnalysis);

// Get all ideas for logged-in user
router.get('/user/ideas', optionalAuth, analysisController.getUserIdeas);

module.exports = router;
