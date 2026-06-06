const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

exports.getPatientTreatmentHistory = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId, status: { $in: ['Approved', 'Completed'] } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .sort({ appointmentDate: -1 });
    const prescriptions = await Prescription.find({ patient: req.params.patientId })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: { appointments, prescriptions } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getMyTreatments = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found.' });
    const appointments = await Appointment.find({ patient: patient._id, treatmentStatus: { $in: ['Ongoing', 'Completed'] } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .sort({ appointmentDate: -1 });
    const prescriptions = await Prescription.find({ patient: patient._id })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: { appointments, prescriptions } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });
    const approvedAppointments = await Appointment.countDocuments({ status: 'Approved' });
    const completedAppointments = await Appointment.countDocuments({ status: 'Completed' });
    const totalPrescriptions = await Prescription.countDocuments();
    const recentAppointments = await Appointment.find()
      .populate({ path: 'patient', populate: { path: 'user', select: 'name' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .sort({ createdAt: -1 }).limit(5);
    res.json({
      success: true, data: {
        totalDoctors, totalPatients, totalAppointments, pendingAppointments,
        approvedAppointments, completedAppointments, totalPrescriptions, recentAppointments,
      }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
