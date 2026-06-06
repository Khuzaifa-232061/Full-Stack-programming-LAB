const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Patient = require('../models/Patient');

// GET all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email phone');
    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET single doctor
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email phone');
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found.' });
    res.json({ success: true, data: doctor });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// POST create doctor (admin)
exports.createDoctor = async (req, res) => {
  try {
    const { name, email, password, phone, specialization, qualification, experience, department, licenseNumber, consultationFee, availableDays, bio } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: password || 'Doctor@123', role: 'doctor', phone });
    } else {
      user.role = 'doctor'; await user.save();
    }
    const doctor = await Doctor.create({
      user: user._id, specialization, qualification, experience, department,
      licenseNumber, consultationFee, availableDays: availableDays || ['Monday','Tuesday','Wednesday','Thursday','Friday'],
      bio,
    });
    res.status(201).json({ success: true, data: await doctor.populate('user', 'name email phone') });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// PUT update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('user', 'name email phone');
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found.' });
    res.json({ success: true, data: doctor });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found.' });
    res.json({ success: true, message: 'Doctor deleted.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET doctor's patients
exports.getDoctorPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ assignedDoctor: req.params.id }).populate('user', 'name email phone');
    res.json({ success: true, count: patients.length, data: patients });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
