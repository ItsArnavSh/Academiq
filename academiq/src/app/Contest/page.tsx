"use client";
import { getContestData } from "./getContests";
import { useState, useEffect } from "react";
import { Card } from "./card";
import Timer from "./timer";
import Calculator from "./calculator";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Cookies from "js-cookie";

async function updateStudentScore(
  db,
  contestId,
  studentEmail,
  index,
  modifier,
) {
  try {
    // Reference to the specific student document
    const studentRef = doc(db, `Contests/${contestId}/students`, studentEmail);

    // Get the current document data
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
      console.error("Student document not found!");
      return;
    }

    // Get the current scores array
    const studentData = studentSnap.data();
    const scores = studentData.scores;

    // Update the score at the specified index
    if (index < 0 || index >= scores.length) {
      console.error("Invalid index!");
      return;
    }
    scores[index] += modifier;

    // Update the Firestore document with the modified scores array
    await updateDoc(studentRef, { scores });

    console.log(
      `Score updated successfully for ${studentEmail} at index ${index}`,
    );
  } catch (error) {
    console.error("Error updating student score:", error);
  }
}

async function updateScore(email, docId, change) {
  try {
    // Fetch the user document using email (assuming the email is stored in the user document)
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    let userId = null;

    // Find the userId based on the email
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        userId = doc.id;
      }
    });

    if (!userId) {
      console.log("User not found with the provided email.");
      return;
    }

    // Reference the scores subcollection using the found userId
    const scoreRef = doc(collection(db, `users/${userId}/scores`), docId);

    const scoreDoc = await getDoc(scoreRef);

    if (scoreDoc.exists()) {
      // Document exists, update the value
      await updateDoc(scoreRef, {
        value: scoreDoc.data().value + change,
      });
      console.log(
        `Updated score in document ${docId} for user with email ${email}`,
      );
    } else {
      // Document does not exist, create it
      await setDoc(scoreRef, { value: change });
      console.log(
        `Created document ${docId} with initial value ${change} for user with email ${email}`,
      );
    }
  } catch (error) {
    console.error("Error updating/creating score document: ", error);
  }
}
export default function ContestPage() {
  const [data, setData] = useState({ id: String, questions: [] });

  const [doneList, setDoneList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState<{
    text: string;
    isCorrect: boolean;
    show: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const contestData = await getContestData();
      setData(contestData);
      setQuestionList(contestData.questions);
      setDoneList(new Array(contestData.questions.length).fill(false)); // Initialize doneList
      setLoading(false);
    };

    fetchData();
  }, []); // Only runs once on mount to fetch data
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This is required for most browsers to show a confirmation dialog.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleNext = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswer("");
    }
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Please provide an answer before submitting!");
      return;
    }

    const isCorrect = questionList[currentQuestionIndex].answer == answer;
    if (isCorrect) {
      //Add score in the server
      const userCookie = Cookies.get("user");
      const user = JSON.parse(userCookie);
      updateScore(user.email, data.id, 200);
      updateStudentScore(db, data.id, user.email, currentQuestionIndex, 20);
    } else {
      //Deduct Score from the server
      const userCookie = Cookies.get("user");
      const user = JSON.parse(userCookie);
      console.log("data: ", data.id, user.email);
      updateScore(user.email, data.id, -80);
      updateStudentScore(db, data.id, user.email, currentQuestionIndex, -8);
    }
    // Update doneList correctly using setDoneList
    setDoneList((prevDoneList) => {
      const updatedDoneList = [...prevDoneList];
      if (isCorrect) updatedDoneList[currentQuestionIndex] = true;
      return updatedDoneList;
    });

    setResultMessage({
      text: isCorrect ? "Correct answer!" : "Wrong answer!",
      isCorrect: isCorrect,
      show: true,
    });

    // Hide the message after 3 seconds
    setTimeout(() => {
      setResultMessage((prev) => (prev ? { ...prev, show: false } : null));
      setTimeout(() => setResultMessage(null), 500);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-2xl font-bold">Loading questions...</div>
      </div>
    );
  }

  if (questionList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-2xl font-bold">
          No questions available for this contest.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card
            title="Question"
            className="lg:col-span-3 bg-gray-800 text-white shadow-md relative"
          >
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">
                {questionList[currentQuestionIndex]?.qname ||
                  "No title available."}
              </h2>
              <p className="text-lg mb-4">
                {questionList[currentQuestionIndex]?.description ||
                  "No description available."}
              </p>

              <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                {questionList[currentQuestionIndex].image !== "" ? (
                  <img
                    src={questionList[currentQuestionIndex].image}
                    alt="Question Image"
                    className="w-full h-auto rounded-lg"
                  />
                ) : null}
              </pre>
            </div>
            {resultMessage && (
              <div
                className={`absolute bottom-8 left-4 right-4 p-4 text-white text-xl font-semibold rounded-md transition-opacity duration-500 ease-in-out ${
                  resultMessage.isCorrect ? "bg-green-500" : "bg-red-500"
                } ${resultMessage.show ? "opacity-100" : "opacity-0"}`}
              >
                {resultMessage.text}
              </div>
            )}
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card title="Answer" className="bg-gray-800 text-white shadow-md">
              <div className="flex justify-between items-center mb-4">
                <Timer />
              </div>

              <textarea
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>

              <div className="flex justify-between mt-6">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>

                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questionList.length - 1}
                >
                  Next
                </button>
              </div>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors mt-4"
                disabled={doneList[currentQuestionIndex]}
                onClick={handleSubmit}
              >
                Submit Answer
              </button>
            </Card>

            <Calculator />
          </div>
        </div>
      </div>
    </div>
  );
}