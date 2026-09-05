import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // for auth
import { getFirestore } from "firebase/firestore"; // for database

// web app's firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALnu_PYS4vug0qhHx9CWZHTl0zjtr9Yns",
  authDomain: "personal-note-manager-dfd84.firebaseapp.com",
  projectId: "personal-note-manager-dfd84",
  storageBucket: "personal-note-manager-dfd84.firebasestorage.app",
  messagingSenderId: "415114174588",
  appId: "1:415114174588:web:d27cab6fe7c4574e2e29f9",
  measurementId: "G-8KSTTC78VC"
};

// start/initialize Firebase
const app = initializeApp(firebaseConfig);

// exporting so seen in the screen
export const auth = getAuth(app);
export const db = getFirestore(app);