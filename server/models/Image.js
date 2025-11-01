const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  unsplashId: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  user: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', ImageSchema);