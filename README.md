# 💰 FinanceFlow

FinanceFlow is a modern full-stack finance management application built with React, Vite, TypeScript, Express, Node.js, and MongoDB Atlas.

It provides secure JWT authentication, role-based access control, financial record management, analytics dashboards, and MongoDB Atlas integration.

---

# 🚀 Features

- JWT Authentication
- Role-Based Access Control
- MongoDB Atlas Integration
- CRUD Operations for Financial Records
- Dashboard Analytics
- Responsive UI
- REST API
- Production Ready

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Axios
- Recharts
- Tailwind CSS

## Backend

- Node.js
- Express
- TypeScript
- JWT
- MongoDB Atlas
- Mongoose
- bcryptjs

---

# 📂 Project Structure

```
FinanceFlow
│
├── frontend/
│
├── backend/
│
├── server.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

# ⚙ Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

NODE_ENV=development

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:3000
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/FinanceFlow.git
```

Go inside project

```bash
cd FinanceFlow
```

Install dependencies

```bash
npm install
```

---

# ▶ Run Development Server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🏗 Production Build

Build project

```bash
npm run build
```

Run production server

```bash
npm start
```

---

# 🗄 MongoDB Atlas Setup

1. Create a MongoDB Atlas Cluster
2. Create a Database User
3. Allow Network Access (0.0.0.0/0)
4. Copy Connection String
5. Add it to `.env`

Example

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/financeflow?retryWrites=true&w=majority
```

---

# ☁ Deployment

## Render

Build Command

```bash
npm install && npm run build
```

Start Command

```bash
npm start
```

Environment Variables

```
NODE_ENV=production

PORT=3000

MONGODB_URI=your_atlas_connection_string

JWT_SECRET=your_secret

FRONTEND_URL=https://your-app.onrender.com
```

---

## Vercel

If you separate the frontend and backend:

Frontend → Vercel

Backend → Render

Frontend Environment Variable

```
VITE_API_URL=https://your-render-backend.onrender.com/api
```

---

# 🔐 Default Seeded Users

Admin

```
Email:
admin@example.com

Password:
admin123
```

Analyst

```
analyst@example.com

analyst123
```

Viewer

```
viewer@example.com

viewer123
```

---

# 📄 License

MIT License