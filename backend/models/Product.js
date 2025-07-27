const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  origin: String,
  artist: String,
  price: Number,
  image: String,
  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);