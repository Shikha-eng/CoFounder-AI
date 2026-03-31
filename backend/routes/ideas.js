const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const ideaController = require('../controllers/ideaController');

// Create new idea
router.post('/', auth, ideaController.createIdea);

// Get all user ideas
router.get('/', auth, ideaController.getUserIdeas);

// Get single idea
router.get('/:id', auth, ideaController.getIdea);

// Update idea
router.put('/:id', auth, ideaController.updateIdea);

// Delete idea
router.delete('/:id', auth, ideaController.deleteIdea);

module.exports = router;
