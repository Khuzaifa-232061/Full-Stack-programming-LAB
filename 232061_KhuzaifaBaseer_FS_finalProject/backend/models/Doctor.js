const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true }, // years
  department: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  consultationFee: { type: Number, required: true },
  availableDays: [{ type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] }],
  availableTimeSlots: [{ start: String, end: String }],
  bio: { type: String },
  rating: { type: Number, default: 0 },
  totalPatients: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
