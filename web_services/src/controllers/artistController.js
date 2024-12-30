const Artist = require('../models/Artist');

// Get all artists
const getArtists = async (req, res) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Calculate the starting index
    const startIndex = (page - 1) * limit;

    // Fetch artists with pagination
    const artists = await Artist.find()
      .skip(startIndex) // Skip items for previous pages
      .limit(limit); // Limit the number of items

    // Get the total count of artists
    const totalArtists = await Artist.countDocuments();

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalArtists / limit),
      totalArtists,
      artists,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new artist
const createArtist = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an artist
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an artist
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rateArtist = async (req, res) => {
  const { id } = req.params;
  const { userId, userRating } = req.body; // Expect userId and rating value from the request body

  if (!userId || !userRating || userRating < 1 || userRating > 5) {
    return res.status(400).json({ message: 'Invalid input. Provide a valid userId and rating (1-5).' });
  }

  try {
    // Find the artist by ID
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    // Check if the user has already rated
    const existingRating = artist.ratings.find((rating) => rating.userId === userId);
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this artist.' });
    }

    // Add the new rating to the ratings array
    artist.ratings.push({ userId, value: userRating });

    // Calculate the new average rating
    const totalRatings = artist.ratings.length;
    const sumRatings = artist.ratings.reduce((sum, rating) => sum + rating.value, 0);
    artist.rating = (sumRatings / totalRatings).toFixed(2); // Update the average rating

    // Save the updated artist
    await artist.save();

    res.status(200).json({
      message: 'Rating added successfully',
      averageRating: artist.rating,
      totalRatings: totalRatings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  rateArtist,
};
