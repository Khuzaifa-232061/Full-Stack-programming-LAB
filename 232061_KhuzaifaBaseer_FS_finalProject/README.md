# HLApp – Healthcare Management System

A full-stack web application for online doctor appointment booking, treatment tracking, prescription management, and patient notifications.

---

## 🔧 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 14, React 18, Axios       |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB + Mongoose                |
| Auth       | JWT (jsonwebtoken) + bcryptjs     |
| Styling    | Custom CSS (no framework)         |
| Alerts     | react-hot-toast                   |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Full-Stack-Programming-Lab.git
cd Full-Stack-Programming-Lab/Final_Term_Project_HLApp
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hlapp
JWT_SECRET=hlapp_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=development
```

Start backend:
```bash
node server.js
```

> On first run, the database auto-seeds with **15 doctors**, **15 patients**, sample appointments, prescriptions, and an admin account.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Open: **http://localhost:3000**

---

## 🔑 Demo Login Credentials

| Role    | Email                      | Password     |
|---------|----------------------------|--------------|
| Admin   | admin@hlapp.com            | Admin@123    |
| Doctor  | ahmed.raza@hlapp.com       | Doctor@123   |
| Patient | arif@patient.com           | Patient@123  |

---

## 📋 Features by Module

### I. Authentication System
- JWT-based login/register with bcrypt password hashing
- Role-based access: Admin, Doctor, Patient
- Protected routes and automatic redirects
- Token stored in localStorage; cleared on logout

### II. Doctor & Patient Management (Admin)
- Full CRUD for 15+ doctors and 15+ patients
- Assign doctors to patients
- Search and filter functionality

### III. Appointment & Treatment Management
- Patients book appointments with any doctor
- Doctors/Admin approve or reject with reason
- Physical checkup records per appointment
- Treatment status lifecycle: Not Started → Ongoing → Completed
- Follow-up scheduling

### IV. Prescription & Medical Record System
- Doctors write prescriptions linked to appointments
- Medication name, dosage, frequency, duration, times
- Lab test orders
- Full prescription history for patients

### V. Notification System
- In-app notifications for all roles
- Types: appointment confirmed/rejected, medication reminders, follow-up alerts
- Mark as read / Mark all read / Delete
- Unread badge on bell icon (auto-refreshes every 30s)

### VI. Next.js Frontend
- SSR-ready with Next.js App Router
- Role-based dashboards (Admin / Doctor / Patient)
- Responsive design, reusable components
- Axios API client with JWT interceptors

---

## 📁 Project Structure

```
Final_Term_Project_HLApp/
├── backend/
│   ├── config/         # DB seed
│   ├── controllers/    # Route handlers
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   └── server.js
└── frontend/
    ├── app/
    │   ├── admin/      # Admin pages
    │   ├── doctor/     # Doctor pages
    │   ├── patient/    # Patient pages
    │   └── auth/       # Login / Register
    ├── components/     # Shared components
    └── lib/            # API client, AuthContext
```

---

## 🔒 Security
- All routes protected with `protect` middleware
- Role-based authorization with `authorize(...roles)`
- Passwords hashed with bcrypt (12 rounds)
- JWT tokens expire in 7 days
- API keys never committed (use .env)
