import { initializeApp, getApp, getApps } from "firebase/app";
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY2K4J-9jrNpmljDFlWwM8L-D4M8NjXbM",
  authDomain: "academiq1-b4d31.firebaseapp.com",
  projectId: "academiq1-b4d31",
  storageBucket: "academiq1-b4d31.firebasestorage.app",
  messagingSenderId: "741063535355",
  appId: "1:741063535355:web:39169ba641334751c19e5e",
  measurementId: "G-LW1N6NPETN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, app };
