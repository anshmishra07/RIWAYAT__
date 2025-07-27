const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  englishName: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  region: { type: String },
  bestTime: { type: String },
  heritage: { type: String },
  entryFee: { type: String }
});

module.exports = mongoose.model('Destination', DestinationSchema); 