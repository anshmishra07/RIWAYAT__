const express = require('express');
const router = express.Router();
const FeaturedStory = require('../models/FeaturedStory');
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

// Get all featured stories
router.get('/', async (req, res) => {
  try {
    const stories = await FeaturedStory.find().sort({ _id: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Get a single story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await FeaturedStory.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// Add a new story (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, image, category, region, author, readTime, link } = req.body;
    const story = new FeaturedStory({ title, description, image, category, region, author, readTime, link });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add story' });
  }
});

module.exports = router; 