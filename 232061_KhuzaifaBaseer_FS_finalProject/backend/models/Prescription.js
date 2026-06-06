const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medications: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true }, // e.g. "Twice daily"
    duration: { type: String, required: true }, // e.g. "7 days"
    instructions: { type: String },
    times: [String], // e.g. ["08:00", "20:00"]
  }],
  diagnosis: { type: String, required: true },
  labTests: [String],
  followUpRequired: { type: Boolean, default: false },
  followUpDate: { type: Date },
  notes: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
