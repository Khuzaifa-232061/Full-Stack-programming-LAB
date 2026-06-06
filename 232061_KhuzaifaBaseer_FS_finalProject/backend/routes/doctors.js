const express = require('express');
const router = express.Router();
const { getDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor, getDoctorPatients } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getDoctors);
router.get('/:id', protect, getDoctor);
router.get('/:id/patients', protect, authorize('admin', 'doctor'), getDoctorPatients);
router.post('/', protect, authorize('admin'), createDoctor);
router.put('/:id', protect, authorize('admin', 'doctor'), updateDoctor);
router.delete('/:id', protect, authorize('admin'), deleteDoctor);

module.exports = router;
