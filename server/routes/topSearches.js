const express = require('express');
const router = express.Router();
const passport = require('passport');
const Search = require('../models/Search');

// Middleware to check authentication
const auth = passport.authenticate('jwt', { session: false });

// Get top 5 most frequent search terms
router.get('/', auth, async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    res.json(topSearches.map(search => ({
      term: search._id,
      count: search.count
    })));
  } catch (error) {
    console.error('Top searches error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;