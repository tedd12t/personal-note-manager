import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For the Database (CRUD)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALnu_PYS4vug0qhHx9CWZHTl0zjtr9Yns",
  authDomain: "personal-note-manager-dfd84.firebaseapp.com",
  projectId: "personal-note-manager-dfd84",
  storageBucket: "personal-note-manager-dfd84.firebasestorage.app",
  messagingSenderId: "415114174588",
  appId: "1:415114174588:web:d27cab6fe7c4574e2e29f9",
  measurementId: "G-8KSTTC78VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export these so we can use them in our screens
export const auth = getAuth(app);
export const db = getFirestore(app);