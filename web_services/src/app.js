const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Connect to the database
connectDB();

// Use CORS to handle cross-origin requests
app.use(cors());

// Log HTTP requests using Morgan
app.use(morgan('dev'));

// Parse incoming request bodies or Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api/artists', require('./routes/artistRoutes'));
app.use('/api/auth', authRoutes);

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
