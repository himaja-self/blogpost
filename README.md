# BlogPost - MERN Stack Blogging Platform

A full-stack blogging application with user authentication and CRUD functionality, built with MongoDB, Express, React, and Node.js.

## Key Features
- **User Authentication**: JWT-based login/signup
- **Post Management**: Create, read, update, and delete blog posts
- **Responsive UI**: Mobile-friendly design
- **REST API**: Backend with Express.js routes

## 🛠 Tech Stack
- **Frontend**: React.js, React Router, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)

## 📦 Project Structure
blogpost/
├── client/ # React frontend
│ ├── public/ # Static assets
│ └── src/
│ ├── components/ # Reusable UI components
│ ├── context/ # State management
│ ├── pages/ # Route components
│ └── App.js # Main entry point
├── controllers/ # Business logic
├── models/ # MongoDB schemas
├── routes/ # API endpoints
├── middleware/ # Auth middleware
└── server.js # Express server


## 🚀 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/himaja-self/blogpost.git
   cd blogpost

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Start backend server (from root)
npm start

# Start frontend (from /client)
cd client
npm start
