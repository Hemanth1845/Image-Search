import React from 'react';
import { motion } from 'framer-motion';
import '../styles/TopBanner.css';

const TopBanner = ({ topSearches, onSearchClick }) => {
  if (!topSearches || topSearches.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="top-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="top-banner-content">
        <div className="top-banner-title">
          <i className="fas fa-fire"></i>
          <span>Top Searches:</span>
        </div>
        <div className="top-searches-carousel">
          {topSearches.map((search, index) => (
            <motion.div 
              key={index}
              className="top-search-item"
              whileHover={{ scale: 1.05 }}
              onClick={() => onSearchClick(search.term)}
            >
              <span className="search-term">{search.term}</span>
              <span className="search-count">({search.count})</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TopBanner;