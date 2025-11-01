import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({ toggleTheme, theme }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();
  
  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-images"></i>
          <span>Image Search</span>
        </Link>
        
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link 
                to="/" 
                className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              >
                <i className="fas fa-search"></i>
                <span>Search</span>
              </Link>
              <Link 
                to="/history" 
                className={`navbar-link ${isActive('/history') ? 'active' : ''}`}
              >
                <i className="fas fa-history"></i>
                <span>History</span>
              </Link>
              <Link 
                to="/profile" 
                className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
              >
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`navbar-link ${isActive('/login') ? 'active' : ''}`}
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className={`navbar-link ${isActive('/register') ? 'active' : ''}`}
              >
                <i className="fas fa-user-plus"></i>
                <span>Register</span>
              </Link>
            </>
          )}
          
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <i className="fas fa-moon"></i>
            ) : (
              <i className="fas fa-sun"></i>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;