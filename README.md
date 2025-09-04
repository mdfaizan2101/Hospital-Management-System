# 🏥 Hospital Management System (TrueCare)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)](https://expressjs.com/)

A comprehensive, full-stack Hospital Management System built with modern web technologies. This system provides a complete solution for managing hospital operations, patient appointments, doctor management, and administrative tasks through separate user interfaces for patients, doctors, and administrators.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Testing](#-testing)
- [Contact](#-contact)

## ✨ Features

### 🎯 Core Functionality
- **Multi-Role Authentication System**: Separate interfaces for Patients, Doctors, and Administrators
- **Patient Management**: Registration, profile management, and appointment booking
- **Doctor Management**: Doctor profiles, department assignments, and availability tracking
- **Appointment System**: Real-time appointment booking, scheduling, and status management
- **Message System**: Communication between patients and hospital staff
- **Admin Dashboard**: Comprehensive administrative control panel

### 🏥 Patient Portal Features
- User registration and authentication
- Profile management with Aadhaar verification
- Department browsing and doctor selection
- Online appointment booking
- Appointment history and status tracking
- Contact form for inquiries

### 👨‍⚕️ Doctor Portal Features
- Doctor profile management
- Department specialization
- Patient appointment management
- Professional biography and credentials
- Photo upload and management

### 👨‍💼 Admin Dashboard Features
- Complete system overview and analytics
- User management (Patients, Doctors, Admins)
- Appointment management and approval
- Message management and responses
- Doctor and admin account creation
- System configuration and monitoring

### 🔒 Security Features
- JWT-based authentication
- Password encryption with bcrypt
- Role-based access control
- Secure file upload with Cloudinary
- CORS protection
- Input validation and sanitization

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary
- **Security**: bcrypt, CORS, cookie-parser
- **Validation**: Validator.js

### Frontend Applications
- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Routing**: React Router DOM 7.6.3
- **HTTP Client**: Axios 1.10.0
- **UI Components**: React Icons 5.5.0
- **Notifications**: React Toastify 11.0.5
- **Carousel**: React Multi Carousel 2.8.6

### Development Tools
- **Linting**: ESLint 9.30.1
- **Package Manager**: npm
- **Environment**: dotenv

## 🌐 Live Demo

### Patient Portal (Frontend)
**(https://hospital-management-system-wheat-eta.vercel.app/)**

- Patient registration and login
- Appointment booking system
- Department and doctor browsing
- Contact form and messaging

### Admin Only Dashboard
**(https://hms-dashboard-fawn.vercel.app)**

- Admin authentication
- Doctor management (add, update, delete)
- Appointment management
- User management
- System analytics

### Backend 
**(https://hms-backend-hclq.onrender.com)**

- RESTful API endpoints
- Authentication system
- File upload capabilities
- Real-time data management

---

**Note**: Replace the placeholder URLs above with your actual deployed URLs once you deploy the project.

## 📁 Project Structure

```
Hospital Management System\
├── backend\
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── config\
│   │   └── config.env
│   ├── controller\
│   │   ├── appointmentController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── database\
│   │   └── dbConnection.js
│   ├── middlewares\
│   │   ├── auth.js
│   │   ├── catchAsyncErrors.js
│   │   └── errorMiddleware.js
│   ├── models\
│   │   ├── appointmentSchema.js
│   │   ├── messageSchema.js
│   │   └── userSchema.js
│   ├── router\
│   │   ├── appointmentRouter.js
│   │   ├── messageRouter.js
│   │   └── userRouter.js
│   └── utils\
│       └── jwtToken.js
│
├── dashboard\                  # Admin/Doctor React application (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── public\
│   │   ├── logo.png
│   │   └── (other static assets)
│   └── src\
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       └── components\
│           ├── AddNewAdmin.jsx
│           ├── AddNewDoctor.jsx
│           ├── Dashboard.jsx
│           ├── Doctors.jsx
│           ├── Login.jsx
│           ├── Messages.jsx
│           └── Sidebar.jsx
│
├── frontend\                   # Patient-facing React application (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── public\
│   │   ├── hero.png
│   │   ├── logo.png
│   │   └── (other static assets)
│   └── src\
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       ├── components\
│       │   ├── AppointmentForm.jsx
│       │   ├── Biography.jsx
│       │   ├── Departments.jsx
│       │   ├── Footer.jsx
│       │   ├── Hero.jsx
│       │   ├── MessageForm.jsx
│       │   └── Navbar.jsx
│       └── pages\
│           ├── AboutUs.jsx
│           ├── Appointment.jsx
│           ├── Home.jsx
│           ├── Login.jsx
│           └── Register.jsx
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for file uploads

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd "Hospital Management System"
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Install Dashboard Dependencies
```bash
cd ../dashboard
npm install
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the `backend/config/` directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
```

### Database Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in your environment file

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Update the Cloudinary variables in your environment file

## 🎮 Usage

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:4000`

#### Start Frontend Application
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

#### Start Dashboard Application
```bash
cd dashboard
npm run dev
```
Dashboard will run on `http://localhost:5174`

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Build Dashboard
```bash
cd dashboard
npm run build
```

#### Start Production Server
```bash
cd backend
npm start
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `GET /api/v1/user/patient/me` - Get patient profile
- `GET /api/v1/user/admin/me` - Get admin profile

### Appointment Endpoints
- `POST /api/v1/appointment/post` - Create appointment
- `GET /api/v1/appointment/getall` - Get all appointments
- `PUT /api/v1/appointment/update/:id` - Update appointment status
- `DELETE /api/v1/appointment/delete/:id` - Delete appointment

### Message Endpoints
- `POST /api/v1/message/send` - Send message
- `GET /api/v1/message/getall` - Get all messages
- `DELETE /api/v1/message/delete/:id` - Delete message

### User Management Endpoints
- `GET /api/v1/user/doctors` - Get all doctors
- `POST /api/v1/user/doctor/addnew` - Add new doctor
- `PUT /api/v1/user/doctor/:id` - Update doctor
- `POST /api/v1/user/admin/addnew` - Add new admin
- `DELETE /api/v1/user/delete/:id` - Delete user

## 🚀 Deployment

### Local Deployment
1. Follow the installation steps
2. Configure environment variables
3. Start all three applications
4. Access:
   - Frontend: `http://localhost:5173`
   - Dashboard: `http://localhost:5174`
   - API: `http://localhost:4000`

### Production Deployment

#### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables in your hosting platform
2. Deploy the backend folder
3. Update frontend and dashboard API URLs

#### Frontend Deployment (Vercel/Netlify)
1. Build the frontend application
2. Deploy the build folder
3. Configure environment variables

#### Dashboard Deployment
1. Build the dashboard application
2. Deploy to your preferred hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Dashboard Testing
```bash
cd dashboard
npm test
```


## 📞 Contact

- Email: mohdfaizan21012002@gmail.com
- GitHub: https://github.com/mdfaizan2101
- LinkedIn: https://www.linkedin.com/in/mdfaizan2101/

## 🙏 Acknowledgements

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - File storage
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Routing
- [Axios](https://axios-http.com/) - HTTP client

---

**Note**: This is a comprehensive hospital management system designed for educational and professional use. Ensure proper security measures and compliance with healthcare regulations when deploying in production environments.
