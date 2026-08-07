const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for Vite frontend
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});