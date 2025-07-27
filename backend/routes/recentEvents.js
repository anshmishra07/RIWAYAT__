const express = require('express');
const router = express.Router();
const RecentEvent = require('../models/RecentEvent');
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

// Get all recent events
router.get('/', async (req, res) => {
  try {
    const events = await RecentEvent.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await RecentEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Add a new event (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, image, location, date, link } = req.body;
    const event = new RecentEvent({ title, description, image, location, date, link });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add event' });
  }
});

module.exports = router; 