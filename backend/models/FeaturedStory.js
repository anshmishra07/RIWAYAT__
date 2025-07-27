const mongoose = require('mongoose');

const FeaturedStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  region: { type: String },
  author: { type: String },
  readTime: { type: String }
});

module.exports = mongoose.model('FeaturedStory', FeaturedStorySchema); 