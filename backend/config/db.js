const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Fails after 5s instead of hanging indefinitely
    });
    console.log('MongoDB connected to', mongoose.connection.name);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Optional: exit process on failure if required
    // process.exit(1);
  }
};

module.exports = connectDB;