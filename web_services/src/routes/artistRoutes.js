const express = require('express');
// const { rateArtist } = require('../controllers/artistController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const { getArtists, createArtist, getArtistById, updateArtist, deleteArtist, rateArtist, upload } = require('../controllers/artistController');

router.get('/', getArtists); 
router.post('/', createArtist);
router.get('/:id', getArtistById); 
router.put('/:id', updateArtist); 
router.delete('/:id', deleteArtist);
router.post('/:id/rate', rateArtist);
router.post('/:id/rate', protect, rateArtist);

module.exports = router;
