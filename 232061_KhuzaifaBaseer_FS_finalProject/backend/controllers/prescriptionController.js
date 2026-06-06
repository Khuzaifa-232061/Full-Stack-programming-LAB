const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Notification = require('../models/Notification');

exports.getPrescriptions = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (patient) filter.patient = patient._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (doctor) filter.doctor = doctor._id;
    }
    const prescriptions = await Prescription.find(filter)
      .populate({ path: 'patient', populate: { path: 'user', select: 'name email' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .populate('appointment', 'appointmentDate type')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: prescriptions.length, data: prescriptions });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getPrescription = async (req, res) => {
  try {
    const presc = await Prescription.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user', select: 'name email' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .populate('appointment');
    if (!presc) return res.status(404).json({ success: false, message: 'Prescription not found.' });
    res.json({ success: true, data: presc });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createPrescription = async (req, res) => {
  try {
    const { appointmentId, medications, diagnosis, labTests, followUpRequired, followUpDate, notes } = req.body;
    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found.' });

    const prescription = await Prescription.create({
      appointment: appointmentId,
      patient: appt.patient,
      doctor: appt.doctor,
      medications, diagnosis, labTests, followUpRequired, followUpDate, notes,
    });

    // Update appointment treatment status
    await Appointment.findByIdAndUpdate(appointmentId, { treatmentStatus: 'Ongoing' });

    // Notify patient for medication reminders
    const patientRecord = await Patient.findById(appt.patient).populate('user', '_id');
    if (patientRecord) {
      for (const med of medications) {
        await Notification.create({
          user: patientRecord.user._id,
          type: 'medication_reminder',
          title: `Medication: ${med.name}`,
          message: `Take ${med.name} ${med.dosage} - ${med.frequency} for ${med.duration}. ${med.instructions || ''}`,
          relatedId: prescription._id, relatedModel: 'Prescription',
        });
      }
    }

    res.status(201).json({ success: true, data: prescription });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updatePrescription = async (req, res) => {
  try {
    const presc = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: presc });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Prescription deleted.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
