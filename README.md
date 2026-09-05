# 📝 Personal Note Manager

A full-stack mobile and web application built with **React Native (Expo)** and **Firebase**. This app features a modern UI, data synchronization, 
and a global Dark Mode system.

## 🚀 Features

- **Modern Auth Cards**: Clean Login and Sign Up interfaces with:
- **Full CRUD Operations**:
  - **Create**: Add notes instantly.
  - **Read**: Real-time updates using Firestore Snapshots.
  - **Update**: In-line editing of existing notes.
  - **Delete**: Quick removal of notes.
- **Global Dark Mode**: A custom Theme Context that toggles the entire app between Light and Dark themes.

## 🛠️ Tech Stack

- **Framework**: [React Native (Expo)](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Backend**: [Firebase 11+](https://firebase.google.com/) (Auth & Firestore)
- **State Management**: React Context API (for Theme)
- **Icons**: [@expo/vector-icons](https://icons.expo.fyi/)

## Setup
1. **Clone the project:**
   ``` bash
   git clone https://github.com/tedd12t/personal-note-manager.git
   
2. **Install dependencies:**
   ``` bash
   yarn install

3. **Configure Firebase:**
    
    -Paste your API keys into src/api/firebase.js.
   
    -Enable Email/Auth and Firestore (Test Mode) in Firebase Console.

4. **Run the app:**
   ``` bash
   npx expo start
   
