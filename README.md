# 🛒 E-Commerce Web Application

A full-stack E-Commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Live Demo
[feshopping.vercel.app](https://feshopping.vercel.app)

## 📁 Project Structure
<pre>
  e_commerce/
├── server/ # Backend - Express.js API
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── ui/ # Frontend - React.js application
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
├── package.json
└── README.md
</pre>

## 🛠️ Technologies
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Deployment: Vercel

## 📦 Installation
```bash
git clone https://github.com/BhumaSai/e_commerce.git
cd e_commerce

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../ui
npm install
# server/.env variables
`
PORT = 4000
MONGO_URI= YOUR_MONGODB_URI
JWT_PASSWORD=YOUR_JWT_SECRET
`
# Start backend
cd server
npm run server 

# Start frontend
cd ../ui
npm run start

This  `README.md` contains everything needed to understand the project structure, technologies, setup, and usage.

For inquiry contact me: `bhumasairam123@gmail.com`
