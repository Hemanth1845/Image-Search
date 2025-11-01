
const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const Search = require('../models/Search');
const Image = require('../models/Image');
const User = require('../models/User');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const auth = passport.authenticate('jwt', { session: false });

router.post('/', auth, async (req, res) => {
  try {
    const { term } = req.body;
    
    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }
    
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term,
        per_page: 30
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });
    
    const results = response.data.results;
    
    const search = new Search({
      userId: req.user._id,
      term,
      resultCount: results.length
    });
    
    await search.save();
    
    res.json({
      term,
      count: results.length,
      results: results.map(img => ({
        id: img.id,
        url: img.urls.regular,
        thumbnailUrl: img.urls.thumb,
        description: img.description || img.alt_description,
        user: img.user.name,
        downloadUrl: img.urls.full
      }))
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching images' });
  }
});

router.post('/download', auth, async (req, res) => {
  try {
    const { images } = req.body;
    
    if (!images || !images.length) {
      return res.status(400).json({ message: 'No images selected' });
    }
    
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const zipPath = path.join(tempDir, `images-${Date.now()}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      res.download(zipPath, 'images.zip', (err) => {
        if (err) {
          console.error('Download error:', err);
        }
        fs.unlinkSync(zipPath);
      });
    });
    
    archive.on('error', (err) => {
      res.status(500).json({ message: 'Error creating ZIP file' });
    });
    
    archive.pipe(output);
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const response = await axios({
        method: 'GET',
        url: image.downloadUrl,
        responseType: 'stream'
      });
      
      archive.append(response.data, { name: `image-${i+1}.jpg` });
    }
    
    archive.finalize();
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Error downloading images' });
  }
});

router.post('/favorites', auth, async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ message: 'Image data is required' });
    }
    
    let image = await Image.findOne({ unsplashId: imageData.id });
    
    if (!image) {
      image = new Image({
        unsplashId: imageData.id,
        url: imageData.url,
        thumbnailUrl: imageData.thumbnailUrl,
        description: imageData.description,
        user: imageData.user
      });
      
      await image.save();
    }
    
    const user = await User.findById(req.user._id);
    
    if (!user.favorites.includes(image._id)) {
      user.favorites.push(image._id);
      await user.save();
    }
    
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    console.error('Favorites error:', error);
    res.status(500).json({ message: 'Error adding to favorites' });
  }
});

router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

router.delete('/favorites/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.favorites = user.favorites.filter(
      favorite => favorite.toString() !== req.params.id
    );
    
    await user.save();
    
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ message: 'Error removing from favorites' });
  }
});

module.exports = router;
