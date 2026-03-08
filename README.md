# 💍 ShaadiBio - Premium Matrimonial Biodata Generator

A full-stack web application designed to help users create, customize, and download beautiful matrimonial biodatas in seconds. Built with the MERN stack (MongoDB, Express, React, Node.js).

https://shaadi-bio-inky.vercel.app

## ✨ Features

### Core Functionality
* **Real-time Dynamic Preview:** See your biodata update instantly as you type.
* **Multiple Templates:** Choose between Modern (Blue) and Traditional (Rose/Sidebar) layouts.
* **PDF Export:** High-resolution A4 PDF generation using `html2canvas` and `jspdf`.

### Advanced UX & Customization
* **Dynamic Theming:** Templates automatically adjust color schemes based on gender (Female = Pink, Male = Blue), with manual overrides for Blue, Pink, and Neutral Black.
* **Font Customization:** Switch between modern Sans-serif and classic Serif typography.
* **Auto-Save Engine:** Form data is continuously persisted to `localStorage` to prevent accidental data loss upon refreshing.
* **Profile Completion Tracker:** Real-time visual progress bar indicating how many core fields are filled out.

### Security & Authentication
* **Full-Stack JWT Auth:** Secure user registration and login flow.
* **Encrypted Passwords:** Passwords are mathematically hashed using `bcryptjs` before entering the database.
* **Database Isolation:** Connected to a dedicated MongoDB database for secure user credential storage.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Context API, React Router, Lucide Icons.
* **Backend:** Node.js, Express.js.
* **Database & Security:** MongoDB, Mongoose, JSON Web Tokens (JWT), Bcrypt.js.
* **Exporting:** html2canvas, jsPDF.

## 🚀 Local Setup Instructions

This project requires two terminal windows to run both the frontend and backend servers simultaneously.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/YOUR_GITHUB_USERNAME/ShaadiBio.git
cd ShaadiBio
\`\`\`

### 2. Setup the Backend
Open a terminal and navigate to the backend folder:
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory and add your MongoDB connection string and JWT secret:
\`\`\`env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shaadibio
JWT_SECRET=your_super_secret_key_here
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Setup the Frontend
Open a second terminal window and stay in the root project folder (or navigate to your frontend folder if it's separate):
\`\`\`bash
npm install
npm run dev
\`\`\`

### 4. View the App
Open your browser and navigate to `http://localhost:5173`. 
Register a new account to access the editor!
