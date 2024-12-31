const Artist = require('../models/Artist');
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  }
});

// File filter (optional: restrict to images only)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
  fileFilter
});

// Get all artists
const getArtists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const startIndex = (page - 1) * limit;

    const artists = await Artist.find()
      .skip(startIndex)
      .limit(limit);

    const totalArtists = await Artist.countDocuments();

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalArtists / limit),
      totalArtists,
      artists
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get an artist by ID
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new artist with file upload
const createArtist = async (req, res) => {
  try {
    const artistData = {
      ...req.body,
      image: req.file ? req.file.path : null // Save file path
    };

    const newArtist = new Artist(artistData);
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an artist with file upload
const updateArtist = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      image: req.file ? req.file.path : req.body.image // Use new file if uploaded
    };

    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedArtist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an artist
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rate an artist
const rateArtist = async (req, res) => {
  const { id } = req.params;
  const { userId, userRating } = req.body;

  if (!userId || !userRating || userRating < 1 || userRating > 5) {
    return res.status(400).json({ message: 'Invalid input. Provide a valid userId and rating (1-5).' });
  }

  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    const existingRating = artist.ratings.find((rating) => rating.userId === userId);
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this artist.' });
    }

    artist.ratings.push({ userId, value: userRating });

    const totalRatings = artist.ratings.length;
    const sumRatings = artist.ratings.reduce((sum, rating) => sum + rating.value, 0);
    artist.rating = (sumRatings / totalRatings).toFixed(2);

    await artist.save();

    res.status(200).json({
      message: 'Rating added successfully',
      averageRating: artist.rating,
      totalRatings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
  rateArtist,
  upload
};
