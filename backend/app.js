const dotenv = require('dotenv');
// Must be called before importing db.js or accessing process.env
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');

// Prevent Mongoose from hanging requests indefinitely if DB drops
mongoose.set('bufferCommands', false);

// Connect to MongoDB
connectDB();

const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

// Enable CORS for Vite frontend
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});