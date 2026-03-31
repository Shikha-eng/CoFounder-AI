const express = require('express');
const competitorController = require('../controllers/competitorController');

const router = express.Router();

// Get competitors for idea
router.get('/:ideaId', competitorController.getCompetitors);

// Get all competitors
router.get('/', competitorController.getAllCompetitors);

// Add competitor
router.post('/', competitorController.addCompetitor);

module.exports = router;
