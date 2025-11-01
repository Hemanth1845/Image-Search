const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'mern-image-search-jwt-secret',
    { expiresIn: '1d' }
  );
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = new User({
      name,
      email,
      password,
      authMethod: 'local'
    });
    
    await user.save();
    
    const token = generateToken(user);
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        authMethod: user.authMethod
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    if (user.authMethod !== 'local') {
      return res.status(400).json({ message: `Please login with ${user.authMethod}` });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        authMethod: user.authMethod
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.get('/google', passport.authenticate('google'));

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed` 
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(`${process.env.CLIENT_URL}/oauth-callback?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=callback_failed`);
    }
  }
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed` 
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(`${process.env.CLIENT_URL}/oauth-callback?token=${token}`);
    } catch (error) {
      console.error('Facebook callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=callback_failed`);
    }
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed` 
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(`${process.env.CLIENT_URL}/oauth-callback?token=${token}`);
    } catch (error) {
      console.error('GitHub callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=callback_failed`);
    }
  }
);

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
    authMethod: req.user.authMethod
  });
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;