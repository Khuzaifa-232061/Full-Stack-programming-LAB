const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const Notification = require('../models/Notification');
const bcrypt = require('bcryptjs');

const doctorData = [
  { name: 'Dr. Ahmed Raza', email: 'ahmed.raza@hlapp.com', specialization: 'Cardiology', qualification: 'MBBS, FCPS (Cardiology)', experience: 12, department: 'Cardiology', licenseNumber: 'PMC-001', consultationFee: 2500, availableDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'], bio: 'Expert in cardiovascular diseases with 12 years of experience.' },
  { name: 'Dr. Sara Khan', email: 'sara.khan@hlapp.com', specialization: 'Neurology', qualification: 'MBBS, FCPS (Neurology)', experience: 9, department: 'Neurology', licenseNumber: 'PMC-002', consultationFee: 3000, availableDays: ['Monday','Wednesday','Friday'], bio: 'Specialist in neurological disorders and brain health.' },
  { name: 'Dr. Usman Ali', email: 'usman.ali@hlapp.com', specialization: 'Orthopedics', qualification: 'MBBS, MS (Orthopedics)', experience: 15, department: 'Orthopedics', licenseNumber: 'PMC-003', consultationFee: 2000, availableDays: ['Tuesday','Thursday','Saturday'], bio: 'Leading orthopedic surgeon specializing in joint replacements.' },
  { name: 'Dr. Fatima Malik', email: 'fatima.malik@hlapp.com', specialization: 'Pediatrics', qualification: 'MBBS, FCPS (Pediatrics)', experience: 8, department: 'Pediatrics', licenseNumber: 'PMC-004', consultationFee: 1500, availableDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'], bio: 'Dedicated pediatrician with expertise in child health.' },
  { name: 'Dr. Bilal Hassan', email: 'bilal.hassan@hlapp.com', specialization: 'Dermatology', qualification: 'MBBS, FCPS (Dermatology)', experience: 7, department: 'Dermatology', licenseNumber: 'PMC-005', consultationFee: 2200, availableDays: ['Monday','Wednesday','Thursday'], bio: 'Skin specialist with focus on chronic skin conditions.' },
  { name: 'Dr. Ayesha Siddiqui', email: 'ayesha.siddiqui@hlapp.com', specialization: 'Gynecology', qualification: 'MBBS, FCPS (Gynecology)', experience: 11, department: 'Gynecology', licenseNumber: 'PMC-006', consultationFee: 2800, availableDays: ['Tuesday','Thursday','Saturday'], bio: 'Expert in women\'s health, obstetrics and gynecology.' },
  { name: 'Dr. Zain Iqbal', email: 'zain.iqbal@hlapp.com', specialization: 'Gastroenterology', qualification: 'MBBS, FCPS (Gastro)', experience: 10, department: 'Gastroenterology', licenseNumber: 'PMC-007', consultationFee: 2600, availableDays: ['Monday','Wednesday','Friday'], bio: 'Gastroenterologist specializing in digestive system disorders.' },
  { name: 'Dr. Mehwish Tariq', email: 'mehwish.tariq@hlapp.com', specialization: 'Psychiatry', qualification: 'MBBS, FCPS (Psychiatry)', experience: 6, department: 'Psychiatry', licenseNumber: 'PMC-008', consultationFee: 3500, availableDays: ['Monday','Tuesday','Thursday'], bio: 'Mental health specialist with focus on anxiety and depression.' },
  { name: 'Dr. Omar Farooq', email: 'omar.farooq@hlapp.com', specialization: 'Ophthalmology', qualification: 'MBBS, FCPS (Ophthalmology)', experience: 13, department: 'Ophthalmology', licenseNumber: 'PMC-009', consultationFee: 2400, availableDays: ['Tuesday','Wednesday','Friday'], bio: 'Eye specialist with expertise in cataract and retinal surgery.' },
  { name: 'Dr. Hina Baig', email: 'hina.baig@hlapp.com', specialization: 'ENT', qualification: 'MBBS, FCPS (ENT)', experience: 9, department: 'ENT', licenseNumber: 'PMC-010', consultationFee: 2000, availableDays: ['Monday','Thursday','Saturday'], bio: 'ENT specialist treating ear, nose, and throat conditions.' },
  { name: 'Dr. Kamran Sheikh', email: 'kamran.sheikh@hlapp.com', specialization: 'Urology', qualification: 'MBBS, FCPS (Urology)', experience: 14, department: 'Urology', licenseNumber: 'PMC-011', consultationFee: 2700, availableDays: ['Monday','Wednesday','Friday'], bio: 'Urologist specializing in kidney and urinary tract disorders.' },
  { name: 'Dr. Nadia Rehman', email: 'nadia.rehman@hlapp.com', specialization: 'Endocrinology', qualification: 'MBBS, FCPS (Endocrinology)', experience: 8, department: 'Endocrinology', licenseNumber: 'PMC-012', consultationFee: 3000, availableDays: ['Tuesday','Thursday'], bio: 'Endocrinologist specializing in diabetes and thyroid disorders.' },
  { name: 'Dr. Imran Butt', email: 'imran.butt@hlapp.com', specialization: 'Pulmonology', qualification: 'MBBS, FCPS (Pulmonology)', experience: 10, department: 'Pulmonology', licenseNumber: 'PMC-013', consultationFee: 2500, availableDays: ['Monday','Wednesday','Saturday'], bio: 'Lung specialist treating asthma, COPD, and respiratory diseases.' },
  { name: 'Dr. Rabia Javed', email: 'rabia.javed@hlapp.com', specialization: 'Rheumatology', qualification: 'MBBS, FCPS (Rheumatology)', experience: 7, department: 'Rheumatology', licenseNumber: 'PMC-014', consultationFee: 2800, availableDays: ['Tuesday','Friday'], bio: 'Rheumatologist treating arthritis and autoimmune disorders.' },
  { name: 'Dr. Asad Nawaz', email: 'asad.nawaz@hlapp.com', specialization: 'General Medicine', qualification: 'MBBS, MRCP', experience: 16, department: 'General Medicine', licenseNumber: 'PMC-015', consultationFee: 1800, availableDays: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], bio: 'Senior general physician with broad expertise in internal medicine.' },
];

const patientData = [
  { name: 'Muhammad Arif', email: 'arif@patient.com', phone: '0300-1234567', dateOfBirth: new Date('1985-03-15'), gender: 'Male', bloodGroup: 'A+', address: 'House 12, Street 5, Rawalpindi', allergies: ['Penicillin'], chronicConditions: ['Hypertension'] },
  { name: 'Sana Akhtar', email: 'sana@patient.com', phone: '0301-2345678', dateOfBirth: new Date('1992-07-22'), gender: 'Female', bloodGroup: 'B+', address: 'Flat 3, Block C, Islamabad', allergies: [], chronicConditions: ['Diabetes Type 2'] },
  { name: 'Tariq Mahmood', email: 'tariq@patient.com', phone: '0302-3456789', dateOfBirth: new Date('1978-11-08'), gender: 'Male', bloodGroup: 'O+', address: 'Villa 7, DHA Phase 2, Lahore', allergies: ['Aspirin'], chronicConditions: [] },
  { name: 'Amna Qureshi', email: 'amna@patient.com', phone: '0303-4567890', dateOfBirth: new Date('1995-01-30'), gender: 'Female', bloodGroup: 'AB+', address: '34 Garden Town, Lahore', allergies: [], chronicConditions: ['Asthma'] },
  { name: 'Fahad Hussain', email: 'fahad@patient.com', phone: '0304-5678901', dateOfBirth: new Date('1990-05-14'), gender: 'Male', bloodGroup: 'A-', address: 'Plot 55, Gulshan-e-Iqbal, Karachi', allergies: ['Sulfa'], chronicConditions: [] },
  { name: 'Zara Shahid', email: 'zara@patient.com', phone: '0305-6789012', dateOfBirth: new Date('1988-09-19'), gender: 'Female', bloodGroup: 'B-', address: 'House 8, Bahria Town, Rawalpindi', allergies: [], chronicConditions: ['Hypothyroidism'] },
  { name: 'Adnan Mirza', email: 'adnan@patient.com', phone: '0306-7890123', dateOfBirth: new Date('1975-12-25'), gender: 'Male', bloodGroup: 'O-', address: 'Street 11, Satellite Town, Quetta', allergies: ['Codeine'], chronicConditions: ['Arthritis'] },
  { name: 'Mahnoor Ijaz', email: 'mahnoor@patient.com', phone: '0307-8901234', dateOfBirth: new Date('1999-04-03'), gender: 'Female', bloodGroup: 'A+', address: 'Apt 201, Clifton, Karachi', allergies: [], chronicConditions: [] },
  { name: 'Shoaib Rauf', email: 'shoaib@patient.com', phone: '0308-9012345', dateOfBirth: new Date('1983-08-17'), gender: 'Male', bloodGroup: 'AB-', address: 'House 3, Model Town, Lahore', allergies: ['Latex'], chronicConditions: ['COPD'] },
  { name: 'Hira Yousaf', email: 'hira@patient.com', phone: '0309-0123456', dateOfBirth: new Date('1997-02-28'), gender: 'Female', bloodGroup: 'B+', address: 'Block D, Gulberg, Lahore', allergies: [], chronicConditions: [] },
  { name: 'Nasir Mehmood', email: 'nasir@patient.com', phone: '0310-1234567', dateOfBirth: new Date('1970-06-10'), gender: 'Male', bloodGroup: 'O+', address: 'Sector F, Islamabad', allergies: ['NSAIDs'], chronicConditions: ['Hypertension', 'Diabetes'] },
  { name: 'Ayesha Noor', email: 'ayesha@patient.com', phone: '0311-2345678', dateOfBirth: new Date('1993-10-05'), gender: 'Female', bloodGroup: 'A+', address: 'Street 4, PWD Colony, Rawalpindi', allergies: [], chronicConditions: [] },
  { name: 'Waheed Sultan', email: 'waheed@patient.com', phone: '0312-3456789', dateOfBirth: new Date('1980-03-21'), gender: 'Male', bloodGroup: 'B+', address: 'House 19, Hayatabad, Peshawar', allergies: ['Morphine'], chronicConditions: ['Kidney Stones'] },
  { name: 'Bushra Khalid', email: 'bushra@patient.com', phone: '0313-4567890', dateOfBirth: new Date('1987-07-14'), gender: 'Female', bloodGroup: 'O+', address: 'Lane 7, Cavalry Ground, Lahore', allergies: [], chronicConditions: ['Migraine'] },
  { name: 'Salman Akram', email: 'salman@patient.com', phone: '0314-5678901', dateOfBirth: new Date('1976-11-30'), gender: 'Male', bloodGroup: 'AB+', address: 'Phase 6, DHA, Karachi', allergies: [], chronicConditions: ['High Cholesterol'] },
];

exports.seedDatabase = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@hlapp.com' });
    if (adminExists) {
      console.log('✅ Database already seeded. Skipping...');
      return;
    }

    console.log('🌱 Seeding database...');

    // Create Admin
    await User.create({ name: 'Super Admin', email: 'admin@hlapp.com', password: 'Admin@123', role: 'admin', phone: '0300-0000000' });
    console.log('✅ Admin created: admin@hlapp.com / Admin@123');

    // Create Doctors
    const createdDoctors = [];
    for (const d of doctorData) {
      const user = await User.create({ name: d.name, email: d.email, password: 'Doctor@123', role: 'doctor', phone: '0300-1111111' });
      const doctor = await Doctor.create({
        user: user._id, specialization: d.specialization, qualification: d.qualification,
        experience: d.experience, department: d.department, licenseNumber: d.licenseNumber,
        consultationFee: d.consultationFee, availableDays: d.availableDays, bio: d.bio,
        isAvailable: true,
      });
      createdDoctors.push(doctor);
    }
    console.log(`✅ ${createdDoctors.length} doctors seeded`);

    // Create Patients
    const createdPatients = [];
    for (let i = 0; i < patientData.length; i++) {
      const p = patientData[i];
      const user = await User.create({ name: p.name, email: p.email, password: 'Patient@123', role: 'patient', phone: p.phone });
      const assignedDoc = createdDoctors[i % createdDoctors.length];
      const patient = await Patient.create({
        user: user._id, dateOfBirth: p.dateOfBirth, gender: p.gender, bloodGroup: p.bloodGroup,
        address: p.address, allergies: p.allergies, chronicConditions: p.chronicConditions,
        assignedDoctor: assignedDoc._id,
      });
      createdPatients.push(patient);
    }
    console.log(`✅ ${createdPatients.length} patients seeded`);

    // Create Sample Appointments
    const statuses = ['Pending', 'Approved', 'Completed', 'Rejected'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
    const types = ['Consultation', 'Follow-up', 'Checkup'];

    for (let i = 0; i < 20; i++) {
      const patient = createdPatients[i % createdPatients.length];
      const doctor = createdDoctors[i % createdDoctors.length];
      const status = statuses[i % statuses.length];
      const apptDate = new Date();
      apptDate.setDate(apptDate.getDate() + (i % 2 === 0 ? i : -i));

      const appt = await Appointment.create({
        patient: patient._id, doctor: doctor._id,
        appointmentDate: apptDate,
        timeSlot: timeSlots[i % timeSlots.length],
        type: types[i % types.length],
        status,
        symptoms: 'General checkup and routine examination',
        treatmentStatus: status === 'Completed' ? 'Completed' : status === 'Approved' ? 'Ongoing' : 'Not Started',
        checkupRecords: status === 'Approved' || status === 'Completed' ? [{
          date: new Date(), weight: 70 + i, bloodPressure: '120/80',
          temperature: 98.6, heartRate: 72 + i, notes: 'Patient in stable condition',
        }] : [],
      });

      // Prescription for completed appointments
      if (status === 'Completed') {
        await Prescription.create({
          appointment: appt._id, patient: patient._id, doctor: doctor._id,
          diagnosis: 'Routine checkup - Normal findings',
          medications: [
            { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days', instructions: 'Take after meals', times: ['08:00', '20:00'] },
            { name: 'Vitamin C', dosage: '1000mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take with water', times: ['08:00'] },
          ],
          followUpRequired: true,
          followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          notes: 'Patient advised to rest and maintain hydration.',
          isActive: true,
        });
      }
    }
    console.log('✅ Sample appointments and prescriptions seeded');

    // Create Sample Notifications for admin
    const adminUser = await User.findOne({ email: 'admin@hlapp.com' });
    await Notification.create([
      { user: adminUser._id, type: 'general', title: 'System Ready', message: 'HLApp healthcare system is fully operational.', isRead: false },
      { user: adminUser._id, type: 'appointment_confirmed', title: 'New Appointments', message: '5 new appointments are pending review.', isRead: false },
    ]);

    console.log('🎉 Database seeding complete!');
    console.log('-----------------------------------');
    console.log('🔑 Login Credentials:');
    console.log('   Admin:   admin@hlapp.com / Admin@123');
    console.log('   Doctor:  ahmed.raza@hlapp.com / Doctor@123');
    console.log('   Patient: arif@patient.com / Patient@123');
    console.log('-----------------------------------');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  }
};
