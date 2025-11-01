const express = require('express');
const router = express.Router();
const passport = require('passport');
const Search = require('../models/Search');

// Middleware to check authentication
const auth = passport.authenticate('jwt', { session: false });

// Get user's search history
router.get('/', auth, async (req, res) => {
  try {
    const searches = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 });
    
    res.json(searches);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear user's search history
router.delete('/', auth, async (req, res) => {
  try {
    await Search.deleteMany({ userId: req.user._id });
    
    res.json({ message: 'Search history cleared' });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;