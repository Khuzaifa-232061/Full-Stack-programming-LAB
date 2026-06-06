const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
  address: { type: String },
  emergencyContact: { name: String, phone: String, relation: String },
  allergies: [String],
  chronicConditions: [String],
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  insuranceInfo: { provider: String, policyNumber: String },
  medicalHistory: [{ condition: String, diagnosedDate: Date, notes: String }],
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
