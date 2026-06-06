const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  type: { type: String, enum: ['Consultation', 'Follow-up', 'Checkup', 'Emergency'], default: 'Consultation' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'], default: 'Pending' },
  symptoms: { type: String },
  notes: { type: String },
  rejectionReason: { type: String },
  followUpDate: { type: Date },
  checkupRecords: [{
    date: Date,
    weight: Number,
    bloodPressure: String,
    temperature: Number,
    heartRate: Number,
    notes: String,
  }],
  treatmentStatus: { type: String, enum: ['Not Started', 'Ongoing', 'Completed'], default: 'Not Started' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
