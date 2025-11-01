import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/ImageGrid.css';

const ImageGrid = ({ images, selectedImages, onImageSelect }) => {
  const isSelected = (imageId) => {
    return selectedImages.some(img => img.id === imageId);
  };
  
  const addToFavorites = async (e, image) => {
    e.stopPropagation();
    
    try {
      await axios.post('/api/search/favorites', { imageData: image });
      toast.success('❤️ Added to favorites');
    } catch (error) {
      console.error('Add to favorites error:', error);
      toast.error('❌ Error adding to favorites');
    }
  };
  
  const shareImage = async (e, image) => {
    e.stopPropagation();
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: image.description || 'Shared Image',
          text: image.description || 'Check out this image!',
          url: image.url
        });
      } else {
        await navigator.clipboard.writeText(image.url);
        toast.success('🔗 Image URL copied to clipboard');
      }
    } catch (error) {
      console.error('Share error:', error);
      toast.error('❌ Error sharing image');
    }
  };
  
  return (
    <motion.div 
      className="image-grid"
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
      {images.map((image) => (
        <motion.div 
          key={image.id}
          className={`image-item ${isSelected(image.id) ? 'selected' : ''}`}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
          }}
          whileHover={{ scale: 1.03 }}
          onClick={() => onImageSelect(image)}
        >
          <div className="image-container">
            <img 
              src={image.thumbnailUrl} 
              alt={image.description || 'Unsplash image'} 
              className="grid-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <div className="image-checkbox">
                <input 
                  type="checkbox" 
                  checked={isSelected(image.id)}
                  onChange={() => {}}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="image-actions">
                <button 
                  className="image-action-button favorite-button"
                  onClick={(e) => addToFavorites(e, image)}
                  title="Add to favorites"
                >
                  ❤️
                </button>
                <button 
                  className="image-action-button share-button"
                  onClick={(e) => shareImage(e, image)}
                  title="Share image"
                >
                  🔗
                </button>
              </div>
            </div>
          </div>
          <div className="image-info">
            <p className="image-description">
              {image.description || 'No description'}
            </p>
            <p className="image-user">
              By {image.user}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageGrid;