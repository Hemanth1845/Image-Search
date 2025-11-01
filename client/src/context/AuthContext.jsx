import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const res = await axios.get('/api/auth/me');
        
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Load user error:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, []);
  
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      toast.success('Registration successful!');
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };
  
  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      toast.success('Login successful!');
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };
  
  const setTokenFromOAuth = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    loadUser();
  };
  
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      
      setUser(res.data);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Load user error:', error);
      logout();
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsAuthenticated(false);
    
    toast.info('Logged out');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
        setTokenFromOAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;