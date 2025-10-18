# Task Distribution System (MERN Stack)

A full-stack **MERN (MongoDB, Express, React, Node.js)** application that allows **Admins** to upload `.csv` or `.xlsx` files and automatically distribute work among registered **Agents**.

This project demonstrates clean role-based authentication, file upload handling, dynamic work assignment, and a modern dashboard UI for both roles.

---

##  Features

###  Admin Side
- Register & Login as Admin.
- Upload `.csv` / `.xlsx` files from local system.
- Automatic distribution of records among registered Agents.
- View each Agent’s assigned task count in a modern dashboard.
- Logout functionality with secure token validation.

### Agent Side
- Register & Login as Agent.
- View only tasks assigned to them.
- Clean, responsive dashboard with logout.

---

##  Project Flow

1. **Admin registers** → logs in → uploads a CSV/XLSX file.  
2. The backend parses and divides the file rows equally among registered agents.  
3. **Agents login** → view only their assigned tasks.  


---

##  Installation & Setup

###  Prerequisites
Make sure you have:
- Node.js (v18+)
- MongoDB running locally (`mongodb://127.0.0.1:27017/MERNPROJECT`)

---

###  Backend Setup

```bash
cd backend
npm install

Create a .env file inside backend/ with:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/MERNPROJECT
JWT_SECRET=your_super_secret_key_here

Start the backend server:
```bash
 npm run dev

If successful, you’ll see:
MongoDB connected
Server running on port 5000
```
--- 

### Frontend Setup

| Role      | Register URL      | Login URL      | Dashboard URL      |
| --------- | ----------------- | -------------- | ------------------ |
| **Admin** | `/admin/register` | `/admin/login` | `/admin/dashboard` |
| **Agent** | `/agent/register` | `/agent/login` | `/agent/dashboard` |

```bash
cd frontend
npm install
npm run dev
http://localhost:3000
```


 Screenshots
   Landing Page
![Landing Page](/screenshots/LandingPage.png)


 Admin Dashboard

![Admin Dashboard](/screenshots/AdminDashboard.png)


 Agent Dashboard

![Agent Dashboard](/screenshots/AgentDashboard.png)


 Login & Registration

Modern styled forms for both roles

| Layer             | Technologies Used                |
| ----------------- | -------------------------------- |
| **Frontend**      | React, Axios, Vite               |
| **Backend**       | Node.js, Express.js              |
| **Database**      | MongoDB, Mongoose                |
| **Auth**          | JWT (JSON Web Token), bcryptjs   |
| **File Handling** | Multer, XLSX, csv-parser         |
| **Styling**       | Custom CSS with modern UI layout |

## Key Features Implementation

 # File Upload & Distribution

- Supports both CSV and Excel formats
- Automatic equal distribution among available agents
- File validation and error handling

 # Authentication & Authorization
 - Role-based access control (Admin/Agent)
 - JWT token-based authentication
 - Secure password hashing with bcrypt

 # Dashboard Features
 - Real-time task statistics
 - Responsive design for all devices
 - Clean and intuitive user interface

# Authors
- Name - Sujeet M A
- Email - sujeetmalagundi999@gmail.com
  


















