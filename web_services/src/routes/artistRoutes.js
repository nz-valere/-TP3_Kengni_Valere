const express = require('express');
const upload = require('../middleware/multer'); // Middleware for handling file uploads
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication
const router = express.Router();

const {
  getArtists,
  createArtist,
  getArtistById,
  updateArtist,
  deleteArtist,
  rateArtist,
} = require('../controllers/artistController');

// Routes for artists
router.get('/', getArtists); // Get all artists
router.post('/', upload.single('image'), createArtist); // Create an artist with image upload
router.get('/:id', getArtistById); // Get artist by ID
router.put('/:id', upload.single('image'), updateArtist); // Update artist with image upload
router.delete('/:id', deleteArtist); // Delete artist
router.post('/:id/rate', protect, rateArtist); // Rate an artist (requires authentication)

module.exports = router;
