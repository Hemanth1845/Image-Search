import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const { email, password } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(formData);
    
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
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
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
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
          <div className="oauth-buttons">
            <a href="http://localhost:5000/api/auth/google" className="btn btn-google">
              <i className="fab fa-google"></i> Sign in with Google
            </a>
            <a href="http://localhost:5000/api/auth/facebook" className="btn btn-facebook">
              <i className="fab fa-facebook"></i> Sign in with Facebook
            </a>
            <a href="http://localhost:5000/api/auth/github" className="btn btn-github">
              <i className="fab fa-github"></i> Sign in with GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
