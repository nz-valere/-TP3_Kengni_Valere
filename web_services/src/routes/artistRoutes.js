const express = require('express');
const router = express.Router();

const { getArtists, createArtist, getArtistById, updateArtist, deleteArtist, rateArtist  } = require('../controllers/artistController');

router.get('/', getArtists); 
router.post('/', createArtist);
router.get('/:id', getArtistById); 
router.put('/:id', updateArtist); 
router.delete('/:id', deleteArtist);
router.post('/:id/rate', rateArtist);


module.exports = router;
