
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const { name, email, password, confirmPassword } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    const success = await register({
      name,
      email,
      password
    });
    
    setIsLoading(false);
    
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-card">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <div className="oauth-buttons">
            <a href="http://localhost:5000/api/auth/google" className="btn btn-google">
              <i className="fab fa-google"></i> Sign up with Google
            </a>
            <a href="http://localhost:5000/api/auth/facebook" className="btn btn-facebook">
              <i className="fab fa-facebook"></i> Sign up with Facebook
            </a>
            <a href="http://localhost:5000/api/auth/github" className="btn btn-github">
              <i className="fab fa-github"></i> Sign up with GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
