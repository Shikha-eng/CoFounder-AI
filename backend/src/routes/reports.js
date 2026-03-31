const express = require('express');
const reportController = require('../controllers/reportController');

const router = express.Router();

// Generate full report
router.get('/:ideaId', reportController.generateReport);

// Get report summary
router.get('/:ideaId/summary', reportController.getReportSummary);

// Export report as PDF
router.get('/:ideaId/export-pdf', reportController.exportReportPDF);

module.exports = router;
