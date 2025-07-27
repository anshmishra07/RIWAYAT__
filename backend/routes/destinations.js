const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ _id: -1 });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

// Get a single destination by ID
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
});

// Add a new destination (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, englishName, description, image, region, bestTime, heritage, entryFee, link } = req.body;
    const destination = new Destination({ name, englishName, description, image, region, bestTime, heritage, entryFee, link });
    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add destination' });
  }
});

module.exports = router; 