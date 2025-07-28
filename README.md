# 🏥 HealBook - AI-Powered Doctor Appointment & Medicine Recommendation Platform

<div align="center">

![HealBook Logo](https://img.shields.io/badge/HealBook-Healthcare%20Platform-blue?style=for-the-badge&logo=medical)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9.3-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern doctor appointment booking system with AI-powered medicine recommendations, connecting patients with healthcare professionals through seamless scheduling and intelligent prescription insights.**

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 API Endpoints](#-api-endpoints)
- [👥 User Roles](#-user-roles)
- [🤖 AI Integration](#-ai-integration)
- [🔮 Future Features](#-future-features)

---

## ✨ Features

### 🏥 **Patient Features**
- **🔍 Doctor Discovery**: Browse doctors by speciality and location
- **📅 Appointment Booking**: Easy slot booking with real-time availability
- **📱 Profile Management**: Complete patient profile with medical history
- **📋 Appointment History**: Track all past and upcoming appointments
- **💊 Prescription Management**: Digital prescription storage and access
- **🧠 AI Medicine Recommendations**: AI-powered medicine suggestions based on doctor prescriptions
- **📱 Responsive Design**: Works seamlessly on all devices

### 👨‍⚕️ **Doctor Features**
- **📊 Dashboard Analytics**: Real-time appointment and earnings data
- **👥 Patient Management**: View and manage patient appointments
- **💊 Prescription System**: Digital prescription creation with AI medicine suggestions
- **👨‍⚕️ Profile Management**: Update availability, fees, and specialities
- **📈 Earning Analysis**: Payment and earnings analytics
- **📱 Mobile Responsive**: Manage practice from anywhere

### 👨‍💼 **Admin Features**
- **📊 System Analytics**: Comprehensive platform statistics
- **👨‍⚕️ Doctor Management**: Add, edit, and manage doctor profiles
- **📋 Appointment Oversight**: Monitor all platform appointments
- **🔧 System Configuration**: Platform settings and configurations
- **📈 Revenue Tracking**: Payment and earnings analytics
---

## 🏗️ Architecture

```
HealBook/
├── 🎨 frontend/          # Patient-facing React application
├── ⚙️ backend/           # Node.js/Express API server
├── 🏢 admin-dashboard/   # Admin & Doctor dashboard
└── 📚 README.md         # Project documentation
```

### **Three-Tier Architecture:**
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js/Express with MongoDB
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based secure authentication
- **File Storage**: Cloudinary for image management

---

## 🛠️ Tech Stack

### **Frontend Technologies**
- ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react) React 18.3.1
- ![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=flat&logo=vite) Vite 6.0.5
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=flat&logo=tailwind-css) Tailwind CSS 3.4.17
- ![React Router](https://img.shields.io/badge/React%20Router-7.1.1-CA4245?style=flat&logo=react-router) React Router DOM 7.1.1
- ![React Toastify](https://img.shields.io/badge/React%20Toastify-11.0.2-FF6B6B?style=flat) React Toastify 11.0.2

### **Backend Technologies**
- ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js) Node.js with Express
- ![MongoDB](https://img.shields.io/badge/MongoDB-8.9.3-47A248?style=flat&logo=mongodb) MongoDB 8.9.3
- ![Mongoose](https://img.shields.io/badge/Mongoose-8.9.3-880000?style=flat) Mongoose 8.9.3
- ![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=flat&logo=json-web-tokens) JWT Authentication
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-2.5.1-3448C5?style=flat) Cloudinary 2.5.1

### **AI Integration**
- ![OpenAI](https://img.shields.io/badge/OpenAI-4.96.0-412991?style=flat&logo=openai) OpenAI GPT Integration
- ![Google AI](https://img.shields.io/badge/Google%20AI-0.12.0-4285F4?style=flat&logo=google) Google Generative AI

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

### **1. Clone the Repository**
```bash
git clone https://github.com/Ironspidy2506/HealBook.git
cd healbook
```

### **2. Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OPENAI_API_KEY=your_openai_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

Start the backend server:
```bash
npm start
```

### **3. Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

### **4. Admin Dashboard Setup**
```bash
cd ../admin-dashboard
npm install
npm run dev
```

### **5. Access the Applications**
- **Patient Portal**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5174
- **Backend API**: http://localhost:5000

---

## 📁 Project Structure

```
HealBook/
├── 🎨 frontend/                    # Patient-facing application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── context/               # React context providers
│   │   └── assets/                # Images and static files
│   └── package.json
│
├── ⚙️ backend/                     # API server
│   ├── config/                    # Database & cloudinary config
│   ├── controllers/               # Route controllers
│   ├── middlewares/               # Authentication & validation
│   ├── models/                    # MongoDB schemas
│   ├── routes/                    # API routes
│   └── server.js                  # Main server file
│
├── 🏢 admin-dashboard/            # Admin & Doctor dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin/            # Admin-specific pages
│   │   │   └── Doctor/           # Doctor-specific pages
│   │   ├── components/           # Dashboard components
│   │   └── context/              # Context providers
│   └── package.json
│
└── 📚 README.md                   # Project documentation
```

---

## 🔧 API Endpoints

### **Authentication Routes**
```
POST   /api/user/register          # User registration
POST   /api/user/login             # User login
POST   /api/doctor/register        # Doctor registration
POST   /api/doctor/login           # Doctor login
POST   /api/admin/login            # Admin login
```

### **User Routes**
```
GET    /api/user/profile           # Get user profile
PUT    /api/user/profile           # Update user profile
GET    /api/user/appointments      # Get user appointments
```

### **Doctor Routes**
```
GET    /api/doctor/profile         # Get doctor profile
PUT    /api/doctor/profile         # Update doctor profile
GET    /api/doctor/appointments    # Get doctor appointments
POST   /api/doctor/prescription   # Add prescription
```

### **Admin Routes**
```
GET    /api/admin/dashboard        # Admin dashboard data
GET    /api/admin/doctors          # Get all doctors
POST   /api/admin/doctors          # Add new doctor
GET    /api/admin/appointments     # Get all appointments
```

### **AI & Medicine Routes**
```
POST   /api/ai/chat               # AI medicine consultation
GET    /api/insights              # Get medicine insights
POST   /api/insights              # Save medicine recommendations
POST   /api/prescription/analyze  # Analyze prescription with AI
```

---

## 👥 User Roles

### **👤 Patient**
- Browse and search doctors
- Book appointments
- Manage profile and appointments
- Access AI medicine recommendations
- View prescriptions with AI insights

### **👨‍⚕️ Doctor**
- Manage appointment schedule
- Create digital prescriptions with AI assistance
- Update profile and availability
- View patient history
- Track earnings and analytics

### **👨‍💼 Admin**
- Manage all doctors
- Monitor platform statistics
- Oversee appointments
- System configuration
- Revenue tracking

---

## 🤖 AI Integration

### **OpenAI GPT Integration**
- **Medicine Recommendations**: AI-powered medicine suggestions based on prescriptions
- **Drug Interaction Analysis**: Check for potential drug interactions
- **Dosage Guidance**: Intelligent dosage recommendations
- **Side Effect Information**: Comprehensive medicine side effect data

### **Google Generative AI**
- **Prescription Analysis**: Advanced prescription analytics
- **Medicine Alternatives**: Suggest alternative medicines when needed
- **Treatment Optimization**: Evidence-based medicine recommendations
- **Patient Education**: AI-generated medicine information for patients

---

## 🔮 Future Features

### **💳 Payment Integration** *(Coming Soon)*
- **Razorpay Integration**: Indian payment gateway support
- **Stripe Integration**: International payment processing
- **Secure Transactions**: PCI DSS compliant payment processing
- **Multiple Payment Methods**: UPI, cards, net banking support

---

<div align="center">

**Made with ❤️ for better healthcare**

</div>
