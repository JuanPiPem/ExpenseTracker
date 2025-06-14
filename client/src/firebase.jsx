// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4OlA8N9HdWwFHSTux4wIl2eiUVgTRilQ",
  authDomain: "expetrack-18a4f.firebaseapp.com",
  projectId: "expetrack-18a4f",
  storageBucket: "expetrack-18a4f.firebasestorage.app",
  messagingSenderId: "690833485496",
  appId: "1:690833485496:web:b1e9b3ac17da2d325f0e4d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
