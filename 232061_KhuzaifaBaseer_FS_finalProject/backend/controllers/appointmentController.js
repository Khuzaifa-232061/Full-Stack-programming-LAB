const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');
const User = require('../models/User');

exports.getAppointments = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (patient) filter.patient = patient._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (doctor) filter.doctor = doctor._id;
    }
    const appointments = await Appointment.find(filter)
      .populate({ path: 'patient', populate: { path: 'user', select: 'name email phone' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name email' } })
      .sort({ appointmentDate: -1 });
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user', select: 'name email phone' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name email' } });
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found.' });
    res.json({ success: true, data: appt });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, type, symptoms, notes } = req.body;
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient profile not found.' });

    const appointment = await Appointment.create({
      patient: patient._id, doctor: doctorId, appointmentDate, timeSlot, type, symptoms, notes,
    });

    // Notify admin
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await Notification.create({
        user: admin._id, type: 'general',
        title: 'New Appointment Request',
        message: `New appointment booked by patient for ${new Date(appointmentDate).toDateString()}`,
        relatedId: appointment._id, relatedModel: 'Appointment',
      });
    }

    res.status(201).json({ success: true, data: appointment });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, rejectionReason, followUpDate } = req.body;
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { status, rejectionReason, followUpDate }, { new: true })
      .populate({ path: 'patient', populate: { path: 'user', select: 'name email' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } });

    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found.' });

    // Send notification to patient
    const notifType = status === 'Approved' ? 'appointment_confirmed' : status === 'Rejected' ? 'appointment_rejected' : 'general';
    await Notification.create({
      user: appt.patient.user._id,
      type: notifType,
      title: `Appointment ${status}`,
      message: status === 'Approved'
        ? `Your appointment on ${new Date(appt.appointmentDate).toDateString()} has been confirmed!`
        : `Your appointment has been ${status.toLowerCase()}. ${rejectionReason || ''}`,
      relatedId: appt._id, relatedModel: 'Appointment',
    });

    res.json({ success: true, data: appt });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.addCheckupRecord = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found.' });
    appt.checkupRecords.push(req.body);
    appt.treatmentStatus = 'Ongoing';
    await appt.save();
    res.json({ success: true, data: appt });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateTreatmentStatus = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { treatmentStatus: req.body.treatmentStatus }, { new: true });
    res.json({ success: true, data: appt });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Appointment deleted.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
