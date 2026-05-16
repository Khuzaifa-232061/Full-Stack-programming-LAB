# 🪵 Rustik Plank — MERN Stack eCommerce App

A full-stack dynamic eCommerce website for handcrafted wooden furniture, built with **Next.js**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 📁 Project Structure

```
rustik-plank/
├── backend/          ← Node.js + Express + MongoDB API
│   ├── models/       ← Mongoose models (Product, Category, User, Order, Review)
│   ├── routes/       ← Express routes
│   ├── middleware/   ← JWT auth middleware
│   ├── server.js     ← Entry point
│   ├── seed.js       ← Database seeder
│   └── .env          ← Environment variables
└── frontend/         ← Next.js 14 + Tailwind CSS
    ├── app/          ← App Router pages
    ├── components/   ← Reusable components
    ├── lib/          ← Axios API client
    └── store/        ← Zustand (cart + auth)
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ (LTS)
- **MongoDB** (local or Atlas)
- **MongoDB Compass** (optional, for GUI)

---

## 🚀 How to Run the Project

### Step 1 — Clone / Open the project

```bash
cd rustik-plank
```

### Step 2 — Set up the Backend

```bash
cd backend
npm install
```

Make sure `.env` has the correct MongoDB URI:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rustik_plank
JWT_SECRET=rustik_plank_super_secret_key_2024
```

Seed the database with sample products, categories and users:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

Backend runs at: **http://localhost:5000**

---

### Step 3 — Set up the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

---

## 🔐 Demo Login Credentials

| Role  | Email                     | Password  |
|-------|---------------------------|-----------|
| Admin | admin@rustikplank.com     | admin123  |
| User  | john@example.com          | user123   |

---

## 🌐 Pages & Features

| Page                  | URL                    |
|-----------------------|------------------------|
| Home                  | /                      |
| Shop (with filters)   | /shop                  |
| Product Detail        | /products/[id]         |
| Cart                  | /cart                  |
| Checkout              | /checkout              |
| Login                 | /login                 |
| Register              | /register              |
| My Orders             | /account/orders        |
| Profile               | /account/profile       |
| About Us              | /about                 |
| Blog                  | /blog                  |
| Contact               | /contact               |
| **Admin Dashboard**   | /admin                 |
| Admin Products (CRUD) | /admin/products        |
| Admin Orders          | /admin/orders          |
| Admin Users           | /admin/users           |
| Admin Categories      | /admin/categories      |

---

## 📦 Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)

### Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- Zustand (state management)
- Axios (API calls)
- React Hot Toast (notifications)
- React Icons

---

## 📤 Upload to GitHub

```bash
# 1. Initialize git (inside rustik-plank folder)
git init
git add .
git commit -m "Initial commit: Rustik Plank MERN eCommerce App"

# 2. Create repo on GitHub named: Full-Stack-Programming-Lab
# 3. Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/Full-Stack-Programming-Lab.git
git branch -M main
git push -u origin main
```

---

## ✅ API Endpoints

| Method | Endpoint                    | Description          | Auth |
|--------|-----------------------------|----------------------|------|
| GET    | /api/products               | List products        | -    |
| GET    | /api/products/:id           | Get product          | -    |
| POST   | /api/products               | Create product       | Admin|
| PUT    | /api/products/:id           | Update product       | Admin|
| DELETE | /api/products/:id           | Delete product       | Admin|
| GET    | /api/categories             | List categories      | -    |
| POST   | /api/users/register         | Register             | -    |
| POST   | /api/users/login            | Login                | -    |
| GET    | /api/users/profile          | Get profile          | User |
| POST   | /api/orders                 | Create order         | User |
| GET    | /api/orders/my-orders       | My orders            | User |
| GET    | /api/orders                 | All orders           | Admin|
| PUT    | /api/orders/:id/status      | Update order status  | Admin|
| GET    | /api/reviews/product/:id    | Product reviews      | -    |
| POST   | /api/reviews                | Add review           | User |
