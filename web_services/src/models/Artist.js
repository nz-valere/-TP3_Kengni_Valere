const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artistId: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  name: { type: String, required: true },
  stageName: { type: String, required: true },
  albums: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }, // Average rating
  ratings: [
    {
      userId: { type: String, required: false }, // User who submitted the rating
      value: { type: Number, required: false }, // Rating value (1-5)
    },
  ],
  socialMedia: { type: [String], default: [] },
  label: { type: String, required: true },
  publishingHouse: { type: String, required: true },
  startDate: { type: Date, required: true },
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
