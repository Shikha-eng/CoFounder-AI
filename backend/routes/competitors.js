const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const competitorController = require('../controllers/competitorController');

// Get competitors for idea
router.get('/:ideaId', auth, competitorController.getCompetitors);

// Get market competitors by category
router.get('/category/:category', competitorController.getCompetitorsByCategory);

module.exports = router;
