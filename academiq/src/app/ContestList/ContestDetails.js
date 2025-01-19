import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();

// Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);




export const getContestsdetails = async () => {
    try {
      const contestsRef = collection(db, "Contests");
      const snapshot = await getDocs(contestsRef);
  
      const contests = [];
      snapshot.forEach((doc) => {
        contests.push({ id: doc.id, ...doc.data() });
      });
  
      console.log("Contests:", contests);
      return contests;
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };

 