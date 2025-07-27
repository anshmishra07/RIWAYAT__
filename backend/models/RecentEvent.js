const mongoose = require('mongoose');

const RecentEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  location: { type: String },
  date: { type: Date },
  link: { type: String }
});

module.exports = mongoose.model('RecentEvent', RecentEventSchema); 