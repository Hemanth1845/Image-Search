import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user's favorite images on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);
  
  // Fetch favorite images
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/search/favorites');
      setFavorites(res.data);
    } catch (error) {
      console.error('Fetch favorites error:', error);
      toast.error('Error fetching favorite images');
    }
    
    setIsLoading(false);
  };
  
  // Remove image from favorites
  const removeFavorite = async (imageId) => {
    try {
      await axios.delete(`/api/search/favorites/${imageId}`);
      
      // Update favorites state
      setFavorites(favorites.filter(img => img._id !== imageId));
      
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Remove favorite error:', error);
      toast.error('Error removing from favorites');
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
  };
  
  if (!user) {
    return <Loader />;
  }
  
  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-header">
        <div className="profile-info">
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              className="profile-picture"
            />
          ) : (
            <div className="profile-picture-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="profile-details">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p className="auth-method">
              Signed in with {user.authMethod === 'google' ? 'Google' : 'Email'}
            </p>
          </div>
        </div>
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      
      <div className="favorites-section">
        <h2>Favorite Images</h2>
        
        {isLoading ? (
          <Loader />
        ) : (
          <div className="favorites-content">
            {favorites.length === 0 ? (
              <div className="empty-favorites">
                <p>No favorite images found</p>
              </div>
            ) : (
              <motion.div 
                className="favorites-grid"
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
                {favorites.map((image) => (
                  <motion.div 
                    key={image._id}
                    className="favorite-item"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                  >
                    <div className="favorite-image-container">
                      <img 
                        src={image.thumbnailUrl} 
                        alt={image.description || 'Favorite image'} 
                        className="favorite-image"
                      />
                      <div className="favorite-overlay">
                        <button 
                          className="remove-favorite-button"
                          onClick={() => removeFavorite(image._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="favorite-description">
                      {image.description || 'No description'}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;