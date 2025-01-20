import { initializeApp, getApp, getApps } from "firebase/app";
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import `collection` and `getDocs`

// Your web app's Firebase configuration
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

export const getScores = async (contestId) => {
    try {
      const studentsCollection = collection(db, `Contests/${contestId}/students`); // Reference the students collection
      const snapshot = await getDocs(studentsCollection);
  
      const scores = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        let totalScore = 0;
  
        if (Array.isArray(data.scores)) {
          // Calculate the total score if `scores` is an array
          totalScore = data.scores.reduce((acc, score) => acc + score, 0);
        }
  
        scores.push({ id: doc.id, totalScore, ...data }); // Add `totalScore` to the student object
      });
  
      // Sort scores array by totalScore in descending order
      scores.sort((a, b) => b.totalScore - a.totalScore);
  
      console.log("Sorted Contests with Total Scores:", scores);
      return scores;
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };
  

getScores("KttpzuiB9gG8ht6fsAS2");
