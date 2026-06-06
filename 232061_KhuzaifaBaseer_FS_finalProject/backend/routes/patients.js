const express = require('express');
const router = express.Router();
const { getPatients, getPatient, createPatient, updatePatient, deletePatient, assignDoctor, getMyProfile } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

router.get('/me', protect, authorize('patient'), getMyProfile);
router.get('/', protect, authorize('admin', 'doctor'), getPatients);
router.get('/:id', protect, getPatient);
router.post('/', protect, authorize('admin'), createPatient);
router.put('/:id', protect, authorize('admin', 'doctor'), updatePatient);
router.delete('/:id', protect, authorize('admin'), deletePatient);
router.put('/:id/assign-doctor', protect, authorize('admin'), assignDoctor);

module.exports = router;
