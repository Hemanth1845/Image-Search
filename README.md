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

<img width="604" height="731" alt="Screenshot 2025-11-02 182228" src="https://github.com/user-attachments/assets/8bf116e8-ef02-4b34-9fef-3846de21ae52" />
<img width="544" height="633" alt="Screenshot 2025-11-02 182244" src="https://github.com/user-attachments/assets/ac2accc1-cad0-4487-82b4-5a405b8622c2" />
<img width="494" height="634" alt="Screenshot 2025-11-02 182311" src="https://github.com/user-attachments/assets/6b3092f9-0474-44e7-b17f-e02b7e6cb065" />
<img width="1403" height="752" alt="Screenshot 2025-11-02 182439" src="https://github.com/user-attachments/assets/9ab64907-1dd1-4be3-92ba-92b87d55cc08" />


- git clone https://github.com/Hemanth1845/Image-Search.git
- cd Image-Search

# Install client dependencies
- cd client
- npm install

# Install server dependencies
- cd ../server
- npm install


- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- UNSPLASH_ACCESS_KEY=your_unsplash_api_key
- SESSION_SECRET=your_secret_key

- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret
- GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

- GITHUB_CLIENT_ID=your_github_client_id
- GITHUB_CLIENT_SECRET=your_github_client_secret
- GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

- FACEBOOK_CLIENT_ID=your_facebook_client_id
- FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
- FACEBOOK_CALLBACK_URL=http://localhost:5000/auth/facebook/callback


<img width="1920" height="1080" alt="Screenshot (595)" src="https://github.com/user-attachments/assets/a3c05d99-10c8-4011-af6d-936a535f0207" /> 
<img width="1920" height="1080" alt="Screenshot (596)" src="https://github.com/user-attachments/assets/9fd2026c-efc8-4760-a1a3-299ad6881704" /> 
<img width="1920" height="1080" alt="Screenshot (598)" src="https://github.com/user-attachments/assets/0b993c43-0eae-44ba-b875-0efc3b36300d" /> 
<img width="1877" height="857" alt="Screenshot 2025-11-01 145735" src="https://github.com/user-attachments/assets/5a09e0b8-b656-4209-b775-6221a15e8004" /> 
<img width="1917" height="864" alt="Screenshot 2025-11-01 145820" src="https://github.com/user-attachments/assets/259f5ef4-42bb-44ef-b71d-8599d0f086e3" /> 
<img width="1901" height="835" alt="Screenshot 2025-11-01 145913" src="https://github.com/user-attachments/assets/6f5ec30e-17ee-4c1e-ad91-5c0c0f0c67d8" /> 
<img width="1910" height="589" alt="Screenshot 2025-11-01 145927" src="https://github.com/user-attachments/assets/4b12b503-847f-4160-aff2-9f18c2a9fa9a" /> 
<img width="1910" height="736" alt="Screenshot 2025-11-01 145937" src="https://github.com/user-attachments/assets/d6681e5b-5f1d-4672-87c5-3f034a930160" /> 
<img width="1905" height="687" alt="Screenshot 2025-11-01 145947" src="https://github.com/user-attachments/assets/6ae2395b-7d5d-43a4-9c3a-41f697e6f49e" />




