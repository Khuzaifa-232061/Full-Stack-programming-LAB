const express = require('express');
const router = express.Router();
const { getPatientTreatmentHistory, getMyTreatments, getDashboardStats } = require('../controllers/treatmentController');
const { protect, authorize } = require('../middleware/auth');

router.get('/my-treatments', protect, authorize('patient'), getMyTreatments);
router.get('/dashboard-stats', protect, authorize('admin'), getDashboardStats);
router.get('/patient/:patientId', protect, authorize('admin', 'doctor'), getPatientTreatmentHistory);

module.exports = router;
