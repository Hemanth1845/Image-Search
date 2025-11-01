import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import '../styles/History.css';

const History = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
 
  useEffect(() => {
    fetchSearchHistory();
  }, []);
  
  // Fetch search history
  const fetchSearchHistory = async () => {
    try {
      const res = await axios.get('/api/history');
      setSearchHistory(res.data);
    } catch (error) {
      console.error('Fetch history error:', error);
      toast.error('Error fetching search history');
    }
    
    setIsLoading(false);
  };
  
  
  const clearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      setIsLoading(true);
      
      try {
        await axios.delete('/api/history');
        setSearchHistory([]);
        toast.success('Search history cleared');
      } catch (error) {
        console.error('Clear history error:', error);
        toast.error('Error clearing search history');
      }
      
      setIsLoading(false);
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  
  const handleSearchClick = (term) => {
    navigate('/', { state: { searchTerm: term } });
  };
  
  return (
    <motion.div 
      className="history-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="history-header">
        <h1>Search History</h1>
        {searchHistory.length > 0 && (
          <button 
            className="clear-history-button"
            onClick={clearHistory}
          >
            Clear History
          </button>
        )}
      </div>
      
      {isLoading ? (
        <Loader />
      ) : (
        <div className="history-content">
          {searchHistory.length === 0 ? (
            <div className="empty-history">
              <p>No search history found</p>
            </div>
          ) : (
            <motion.ul 
              className="history-list"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {searchHistory.map((search) => (
                <motion.li 
                  key={search._id}
                  className="history-item"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="history-item-content">
                    <div className="history-term" onClick={() => handleSearchClick(search.term)}>
                      <span className="term">{search.term}</span>
                      <span className="result-count">{search.resultCount} results</span>
                    </div>
                    <div className="history-timestamp">
                      {formatDate(search.timestamp)}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default History;
