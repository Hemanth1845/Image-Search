import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to Full stack Project
        </motion.h1>
        
        <motion.div
          className="welcome-logo"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <i className="fas fa-images"></i>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Search, select, and manage your favorite images
        </motion.p>
        
        <motion.div 
          className="countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
         
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;