const express = require('express');
const Artist = require('../models/Artist');
const router = express.Router();

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find().populate('products');
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new artist
router.post('/', async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ error: 'Error creating artist' });
  }
});

module.exports = router;
