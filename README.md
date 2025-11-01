# Image Search Application

A full-stack web application for searching, selecting, and managing images with authentication.

## Features

- 🔐 Authentication with JWT and Google OAuth
- 🖼️ Image search using Unsplash API
- 🧮 Multi-select grid with live counter
- 🏆 Top searches banner
- 🕒 User search history
- 📥 Download selected images as ZIP
- ❤️ Favorites section
- 🌓 Dark/Light mode toggle
- 📱 Responsive design

## Tech Stack

- **Frontend**: React.js, CSS, Framer Motion, Axios, React Router DOM
- **Backend**: Node.js, Express.js, Passport.js, JWT, bcrypt
- **Database**: MongoDB Compass
- **API**: Unsplash API
- **Auth**: Google OAuth + Manual JWT Auth

### 🔐 1. OAuth Authentication
- Users can log in securely via **Google**, **GitHub**, or **Facebook** using `Passport.js`.
- Only logged-in users can access the search and history features.

**Screenshots:**
- ![Google Login](./screenshots/Screenshot%20(593).png)
- ![GitHub Login](./screenshots/Screenshot%20(594).png)
- ![Facebook Login](./screenshots/Screenshot%20(595).png)

