import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Get all contests
const getContests = async () => {
  try {
    const contestsRef = collection(db, "contest");
    const snapshot = await getDocs(contestsRef);

    const contests = [];
    snapshot.forEach((doc) => {
      contests.push({ id: doc.id, ...doc.data() });
    });

    console.log("Contests:", contests);
  } catch (error) {
    console.error("Error fetching contests:", error);
  }
};

// Get questions for a specific contest
const getContestQuestions = async (contestId) => {
  try {
    if (typeof contestId !== 'string') {
      console.error("Invalid contestId:", contestId);
      return;
    }

    const contestRef = doc(db, "contest", contestId); // Ensure "Contests" matches Firestore collection name
    console.log("Fetching contest with ID:", contestId); // Log contestId for debugging

    const contestDoc = await getDoc(contestRef);

    if (contestDoc.exists()) {
      const contestData = contestDoc.data();
      console.log("Contest Data:", contestData); // Log the data to check its structure

      const questionReferences = contestData.questions;
      const questions = [];

      for (const questionRef of questionReferences) {
        console.log("Fetching question document:", questionRef.id); // Log the question document reference ID for debugging
        
        // Get the question document data
        const questionDoc = await getDoc(questionRef);
        
        if (questionDoc.exists()) {
          questions.push({ id: questionDoc.id, ...questionDoc.data() });
        } else {
          console.log(`No question found with ID: ${questionRef.id}`);
        }
      }

      console.log("Questions for contest:", questions);
    } else {
      console.log(`No contest found with ID: ${contestId}`);
    }
  } catch (error) {
    console.error("Error fetching contest questions:", error);
  }
};

// Example usage
getContests();
getContestQuestions("TMTqpSqeeIdYmCg4T6N1"); // Replace with a valid contest ID
