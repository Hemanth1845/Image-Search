# 🖼️ Image Search Application

A **full-stack web application** for searching, selecting, and managing images with secure authentication.  
Built using **React**, **Node.js**, **Express**, **MongoDB**, and integrated with the **Unsplash API**.

---

## 🚀 Features

- 🔐 **Authentication** with JWT and Google OAuth  
- 🖼️ **Image Search** using Unsplash API  
- 🧮 **Multi-select grid** with live image counter  
- 🏆 **Top Searches** banner across all users  
- 🕒 **User Search History** stored in MongoDB  
- 📥 **Download selected images** as a ZIP file  
- ❤️ **Favorites Section** to save preferred images  
- 🌓 **Dark/Light Mode Toggle**  
- 📱 **Responsive Design** for all screen sizes  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, CSS, Framer Motion, Axios, React Router DOM |
| **Backend** | Node.js, Express.js, Passport.js, JWT, bcrypt |
| **Database** | MongoDB (Compass / Atlas) |
| **API** | Unsplash API |
| **Authentication** | Google OAuth + Manual JWT Auth |

---

## 🔐 OAuth Authentication

Users can log in securely via **Google**, **GitHub**, or **Facebook** using `Passport.js`.  
Only authenticated users can access search, history, and top search features.

**Screenshots:**

<img width="1910" height="878" alt="Screenshot 1" src="https://github.com/user-attachments/assets/56cf6902-5208-4fb2-9505-c06292a5a2ef" />
<img width="1908" height="853" alt="Screenshot 2" src="https://github.com/user-attachments/assets/29768148-c1f8-41b6-80eb-827850c65326" />
<img width="1914" height="892" alt="Screenshot 3" src="https://github.com/user-attachments/assets/6b0cbd64-3606-44bb-be95-ca15f2c565f4" />

---

## 🔍 Search Functionality (Unsplash API)

- Search for any image term (e.g., “Nature”, “Cars”, “Technology”).  
- Backend connects to **Unsplash API** to fetch high-quality images.  
- Displayed in a **4-column responsive grid layout** with **multi-select support**.

<img width="1888" height="724" alt="Screenshot 4" src="https://github.com/user-attachments/assets/dc69dbdc-7e6b-47a0-9c74-00b8ad17ba14" />

- Displays the **Top 5 Most Frequent Search Terms**.
- Each user's searches are tracked and stored with timestamps.
- History is fetched using `GET /api/history` endpoint.

<img width="1920" height="1080" alt="Screenshot 5" src="https://github.com/user-attachments/assets/84c026ad-f851-4d32-908b-442dd4067173" />
<img width="1920" height="1080" alt="Screenshot 6" src="https://github.com/user-attachments/assets/face4281-5345-4ecc-8b69-58c57e90b8c1" />
<img width="1920" height="1080" alt="Screenshot 7" src="https://github.com/user-attachments/assets/927c3157-e422-4f6d-908c-e6cca415f04b" />
<img width="1906" height="822" alt="Screenshot 8" src="https://github.com/user-attachments/assets/4ec828e9-9d80-48f5-81c7-7ed7d7f09104" />
<img width="1883" height="685" alt="Screenshot 9" src="https://github.com/user-attachments/assets/08226f07-25de-4c09-8148-63284ea944d1" />

---

## 🗂️ Project Structure

