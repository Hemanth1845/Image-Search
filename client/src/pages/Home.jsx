import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageGrid from '../components/ImageGrid';
import TopBanner from '../components/TopBanner';
import Loader from '../components/Loader';
import '../styles/Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topSearches, setTopSearches] = useState([]);
  const [lastSearch, setLastSearch] = useState({ term: '', count: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Fetch top searches on component mount
  useEffect(() => {
    fetchTopSearches();
  }, []);
  
  // Fetch top searches
  const fetchTopSearches = async () => {
    try {
      const res = await axios.get('/api/top-searches');
      setTopSearches(res.data);
    } catch (error) {
      console.error('Fetch top searches error:', error);
    }
  };
  
  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    
    setIsLoading(true);
    setSelectedImages([]);
    
    try {
      const res = await axios.post('/api/search', { term: searchTerm });
      
      setSearchResults(res.data.results);
      setLastSearch({
        term: res.data.term,
        count: res.data.count
      });
      
      // Refresh top searches
      fetchTopSearches();
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Error searching for images');
    }
    
    setIsLoading(false);
  };
  
  // Handle image selection
  const handleImageSelect = (image) => {
    setSelectedImages(prevSelected => {
      const isSelected = prevSelected.some(img => img.id === image.id);
      
      if (isSelected) {
        return prevSelected.filter(img => img.id !== image.id);
      } else {
        return [...prevSelected, image];
      }
    });
  };
  
  // Handle download selected images
  const handleDownload = async () => {
    if (selectedImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }
    
    setIsDownloading(true);
    
    try {
      const res = await axios.post('/api/search/download', {
        images: selectedImages
      }, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'images.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Images downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Error downloading images');
    }
    
    setIsDownloading(false);
  };
  
  // Handle clicking on a top search term
  const handleTopSearchClick = (term) => {
    setSearchTerm(term);
    // Submit the search form
    document.getElementById('search-form').dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };
  
  return (
    <div className="home-container">
      <TopBanner topSearches={topSearches} onSearchClick={handleTopSearchClick} />
      
      <motion.div 
        className="search-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form id="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for images..."
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={isLoading}>
              {isLoading ? <span className="spinner-small"></span> : 'Search'}
            </button>
          </div>
        </form>
      </motion.div>
      
      {selectedImages.length > 0 && (
        <motion.div 
          className="selected-images-bar"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Selected: {selectedImages.length} images</p>
          <button 
            className="download-button"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download Selected'}
          </button>
        </motion.div>
      )}
      
      {lastSearch.term && !isLoading && (
        <motion.div 
          className="search-results-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>You searched for "{lastSearch.term}" — {lastSearch.count} results</h2>
        </motion.div>
      )}
      
      {isLoading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          {searchResults.length > 0 && (
            <ImageGrid 
              images={searchResults} 
              selectedImages={selectedImages}
              onImageSelect={handleImageSelect}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Home;