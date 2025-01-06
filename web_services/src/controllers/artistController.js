const Artist = require('../models/Artist');
const upload = require('../middleware/multer'); // Import multer middleware

// Get all artists
const getArtists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const artists = await Artist.find()
      .skip(startIndex)
      .limit(limit);

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

// Get an artist by ID
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    // Convert image buffer to Base64 if it exists
    if (artist.image && artist.image.data) {
      // const base64Image = `data:${artist.image.contentType};base64,${artist.image.data.toString('base64')}`;
      const base64Image = `data:${artist.image.contentType};base64,${Buffer.from(
        artist.image.data
      ).toString('base64')}`;
      artist.image = base64Image;
    }
    console.log(`Image for artist: ${artist.image}`);
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new artist
const createArtist = async (req, res) => {
  try {
    const artist = new Artist({
      artistId: req.body.artistId,
      name: req.body.name,
      stageName: req.body.stageName,
      albums: req.body.albums || 0,
      socialMedia: req.body.socialMedia ? req.body.socialMedia.split(',') : [],
      label: req.body.label,
      publishingHouse: req.body.publishingHouse,
      startDate: req.body.startDate,
    });

    // Add image data if a file was uploaded
    if (req.file) {
      artist.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await artist.save();

    // Convert image buffer to Base64 after saving
    if (artist.image && artist.image.data) {
      artist.image = `data:${artist.image.contentType};base64,${artist.image.data.toString('base64')}`;
    }

    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an artist
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    // Update fields
    artist.name = req.body.name || artist.name;
    artist.stageName = req.body.stageName || artist.stageName;
    artist.albums = req.body.albums || artist.albums;
    artist.socialMedia = req.body.socialMedia
      ? req.body.socialMedia.split(',')
      : artist.socialMedia;
    artist.label = req.body.label || artist.label;
    artist.publishingHouse = req.body.publishingHouse || artist.publishingHouse;
    artist.startDate = req.body.startDate || artist.startDate;

    // Update image if a new file was uploaded
    if (req.file) {
      artist.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedArtist = await artist.save();

    // Convert image buffer to Base64 after saving
    if (updatedArtist.image && updatedArtist.image.data) {
      updatedArtist.image = `data:${updatedArtist.image.contentType};base64,${updatedArtist.image.data.toString('base64')}`;
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
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rate an artist
const rateArtist = async (req, res) => {
  const { id } = req.params;
  const { userId, userRating } = req.body;

  if (!userId || !userRating || userRating < 1 || userRating > 5) {
    return res
      .status(400)
      .json({ message: 'Invalid input. Provide a valid userId and rating (1-5).' });
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
      totalRatings,
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
};
