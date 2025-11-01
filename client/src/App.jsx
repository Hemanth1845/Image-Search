import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import OAuthCallback from './pages/OAuthCallback';

// Components
import Navbar from './components/Navbar';

// Context
import { AuthProvider } from './context/AuthContext';

// CSS
import './App.css';

// Set default axios baseURL
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  const [theme, setTheme] = useState('light');

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className={`app ${theme}`}>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <main className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default App;