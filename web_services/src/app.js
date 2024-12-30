const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Use CORS to handle cross-origin requests
app.use(cors());

// Log HTTP requests using Morgan
app.use(morgan('dev'));

// Parse incoming request bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api/artists', require('./routes/artistRoutes'));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
