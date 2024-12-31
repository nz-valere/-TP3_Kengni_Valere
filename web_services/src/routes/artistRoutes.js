const express = require('express');
const router = express.Router();

const { getArtists, createArtist, getArtistById, updateArtist, deleteArtist, rateArtist, upload } = require('../controllers/artistController');

router.get('/', getArtists); 
router.post('/', createArtist);
router.get('/:id', getArtistById); 
router.put('/:id', updateArtist); 
router.delete('/:id', deleteArtist);
router.post('/:id/rate', rateArtist);
// Create a new artist with image upload
router.post('/', upload.single('artistImage'), createArtist);

// Update an existing artist with a new image upload
router.put('/:id', upload.single('artistImage'), updateArtist);


module.exports = router;
