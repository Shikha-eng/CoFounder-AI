const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const reportController = require('../controllers/reportController');

// Generate full report
router.post('/:ideaId', auth, reportController.generateReport);

// Get report
router.get('/:ideaId', auth, reportController.getReport);

// Export report as PDF
router.get('/:ideaId/export', auth, reportController.exportPDF);

module.exports = router;
