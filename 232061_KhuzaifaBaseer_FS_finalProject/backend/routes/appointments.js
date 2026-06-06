const express = require('express');
const router = express.Router();
const {
  getAppointments, getAppointment, bookAppointment,
  updateAppointmentStatus, addCheckupRecord, updateTreatmentStatus, deleteAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getAppointments);
router.get('/:id', protect, getAppointment);
router.post('/', protect, authorize('patient'), bookAppointment);
router.put('/:id/status', protect, authorize('admin', 'doctor'), updateAppointmentStatus);
router.post('/:id/checkup', protect, authorize('doctor'), addCheckupRecord);
router.put('/:id/treatment', protect, authorize('admin', 'doctor'), updateTreatmentStatus);
router.delete('/:id', protect, authorize('admin'), deleteAppointment);

module.exports = router;
