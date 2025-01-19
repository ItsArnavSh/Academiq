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
  apiKey: "AIzaSyBCxnqCbqrqpBFnj5mgI2oCDKH5jNAqPAI",
  authDomain: "academiq-b80b4.firebaseapp.com",
  projectId: "academiq-b80b4",
  storageBucket: "academiq-b80b4.firebasestorage.app",
  messagingSenderId: "737817395473",
  appId: "1:737817395473:web:f5560142fd8b6926b98cb0",
  measurementId: "G-BDXJMF9T2B",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export {db};

// Get all contests
export const getContests = async () => {
  try {
    const contestsRef = collection(db, "contest");
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

// Get questions for a specific contest
export const getContestQuestions = async (contestId) => {
  try {
    if (typeof contestId !== "string") {
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
      return questions;
    } else {
      console.log(`No contest found with ID: ${contestId}`);
    }
  } catch (error) {
    console.error("Error fetching contest questions:", error);
  }
};

// Example usage
//getContests();
getContestQuestions("TMTqpSqeeIdYmCg4T6N1"); // Replace with a valid contest ID
