const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: String,
  bio: String,
  location: String,
  image: String,
  specialties: [String],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Artist', artistSchema); 