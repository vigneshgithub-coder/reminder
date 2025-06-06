const express = require('express');
const mongoose = require('mongoose');
const reminderRoutes = require('./routes/reminderRoutes');
const cors=require('cors');
require('dotenv').config(); // If using .env for DB URI

const app = express();

// Middleware
app.use(express.json());


// --- CORS setup ---
app.use(cors({
  origin: 'https://reminder-2-2ktk.onrender.com/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}))


// Routes
app.use('/api/reminders', reminderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reminders_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1); // Exit if DB connection fails
  }
};

// Start server after DB connects
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
