const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');

// GET /api/reports/membership - membership report
router.get('/membership', ReportController.getMembershipReport);

// GET /api/reports/attendance - attendance report
router.get('/attendance', ReportController.getAttendanceReport);

// GET /api/reports/workplace - workplace report
router.get('/workplace', ReportController.getWorkplaceReport);

// GET /api/reports/dues - dues report
router.get('/dues', ReportController.getDuesReport);

// GET /api/reports/dashboard - comprehensive dashboard report
router.get('/dashboard', ReportController.getDashboardReport);

module.exports = router;

