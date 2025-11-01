import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Loader.css';

const OAuthCallback = () => {
  const { setTokenFromOAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleCallback = async () => {
      // Get token from URL query params
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (token) {
       // token
        setTokenFromOAuth(token);
        
        // Redirect to home page
        navigate('/');
      } else {
        // Redirect
        navigate('/login');
      }
    };
    
    handleCallback();
  }, [location, navigate, setTokenFromOAuth]);
  
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Completing authentication...</p>
    </div>
  );
};

export default OAuthCallback;
