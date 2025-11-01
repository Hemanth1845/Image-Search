import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import OAuthCallback from './pages/OAuthCallback';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import { AuthProvider } from './context/AuthContext';

import './App.css';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className={`app ${theme}`}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route 
              path="/home" 
              element={
                <>
                  <Navbar toggleTheme={toggleTheme} theme={theme} />
                  <main className="container">
                    <Home />
                  </main>
                </>
              } 
            />
            <Route 
              path="/login" 
              element={
                <>
                  <Navbar toggleTheme={toggleTheme} theme={theme} />
                  <main className="container">
                    <Login />
                  </main>
                </>
              } 
            />
            <Route 
              path="/register" 
              element={
                <>
                  <Navbar toggleTheme={toggleTheme} theme={theme} />
                  <main className="container">
                    <Register />
                  </main>
                </>
              } 
            />
            <Route 
              path="/oauth-callback" 
              element={<OAuthCallback />} 
            />
            <Route 
              path="/history" 
              element={
                <>
                  <Navbar toggleTheme={toggleTheme} theme={theme} />
                  <main className="container">
                    <History />
                  </main>
                </>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <>
                  <Navbar toggleTheme={toggleTheme} theme={theme} />
                  <main className="container">
                    <Profile />
                  </main>
                </>
              } 
            />
          </Routes>
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
