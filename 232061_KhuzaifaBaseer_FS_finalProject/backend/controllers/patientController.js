const Patient = require('../models/Patient');
const User = require('../models/User');

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('user', 'name email phone')
      .populate({ path: 'assignedDoctor', populate: { path: 'user', select: 'name' } });
    res.json({ success: true, count: patients.length, data: patients });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate({ path: 'assignedDoctor', populate: { path: 'user', select: 'name' } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found.' });
    res.json({ success: true, data: patient });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getMyProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id })
      .populate('user', 'name email phone')
      .populate({ path: 'assignedDoctor', populate: { path: 'user', select: 'name email' } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient profile not found.' });
    res.json({ success: true, data: patient });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createPatient = async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, gender, bloodGroup, address, allergies, chronicConditions } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: password || 'Patient@123', role: 'patient', phone });
    }
    const patient = await Patient.create({
      user: user._id, dateOfBirth, gender, bloodGroup, address, allergies, chronicConditions,
    });
    res.status(201).json({ success: true, data: patient });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user', 'name email phone');
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found.' });
    res.json({ success: true, data: patient });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found.' });
    res.json({ success: true, message: 'Patient deleted.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.assignDoctor = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, { assignedDoctor: req.body.doctorId }, { new: true })
      .populate('user', 'name email');
    res.json({ success: true, data: patient });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
