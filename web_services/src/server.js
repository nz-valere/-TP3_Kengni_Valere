/** 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/artists', artistRoutes); // Artist-related routes

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

**/