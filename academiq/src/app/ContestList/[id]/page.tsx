"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getContestsdetails } from "../ContestDetails";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Adjust this path based on your configuration
import Cookies from "js-cookie";

interface Contest {
  id: string;
  name: string;
  startTime: { seconds: number; nanoseconds: number };
  endTime: { seconds: number; nanoseconds: number };
  description: string;
  questions: Array<{
    qname: string;
    description: string;
    image: string;
    solution: string;
  }>;
}

async function addStudentToContestSubcollection(
  contestid: string,
  studentEmail: string,
  questionCount: number,
) {
  try {
    // Reference the subcollection "students" within the specific contest document
    const studentRef = doc(
      collection(db, `Contests/${contestid}/students`),
      studentEmail,
    );

    // Check if the document already exists
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      console.log("Student entry already exists. No action taken.");
      return;
    }

    // Create the student document with an email and an array of scores initialized to 0
    await setDoc(studentRef, {
      email: studentEmail,
      scores: Array(questionCount).fill(0),
    });

    console.log("Student added successfully!");
  } catch (error) {
    console.error("Error adding student: ", error);
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
      // Document does not exist, create it with the current date and initial value
      const currentDate = new Date().toISOString(); // Get the current date in ISO format
      await setDoc(scoreRef, {
        value: change,
        createdAt: currentDate, // Store the creation date
      });
      console.log(
        `Created document ${docId} with initial value ${change} and date ${currentDate} for user with email ${email}`,
      );
    }
  } catch (error) {
    console.error("Error updating/creating score document: ", error);
  }
}
export default function ContestDetails() {
  const router = useRouter(); // Initialize the router
  const params = useParams();
  const id = params?.id as string;
  const [contest, setContest] = React.useState<Contest | null>(null);

  React.useEffect(() => {
    const fetchContestDetails = async () => {
      const contests = await getContestsdetails();
      const selectedContest = contests.find((contest) => contest.id === id);
      setContest(selectedContest || null);
    };
    fetchContestDetails();
  }, [id]);

  const handleButtonClick = () => {
    console.log("Contest: ", contest);

    Cookies.remove("contest"); // Remove any existing cookie named "contest"
    Cookies.set(
      "contest",
      JSON.stringify({
        id: contest.id,
        endTime: contest.endTime,
        questions: contest.questions,
      }),
      {
        expires: 7, // Expires in 7 days
        path: "", // Optional: Set the path if necessary
        secure: process.env.NODE_ENV === "production", // Optional: Set secure flag for production
        sameSite: "Lax", // Optional: Adjust SameSite policy if needed
      },
    );

    if (contest) {
      const userCookie = Cookies.get("user");

      const user = JSON.parse(userCookie);
      updateScore(user.email, contest.id, 0);
      console.log(user);
      const studentEmail = user.email;
      if (studentEmail) {
        addStudentToContestSubcollection(
          contest.id,
          studentEmail,
          contest.questions.length,
        )
          .then(() => {
            console.log("Redirecting to /Contest...");
            router.push("/Contest"); // Redirect to /Contest
          })
          .catch((error) => {
            console.error("Error while adding student: ", error);
          });
      }
    }
  };

  if (!contest) {
    return (
      <div className="p-8 text-center text-gray-400">
        Loading contest details...
      </div>
    );
  }

  const formatTime = (time: { seconds: number; nanoseconds: number }) => {
    return new Date(time.seconds * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8">
          <h1 className="text-4xl font-bold">{contest.name}</h1>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {contest.description}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Questions
              </h2>
              <div className="space-y-4">
                {contest.questions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 shadow-md"
                  >
                    <h3 className="font-medium text-xl text-gray-800 mb-2">
                      Question {index + 1}: {question.qname}
                    </h3>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contest Time
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Start:</span>{" "}
                  {formatTime(contest.startTime)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">End:</span>{" "}
                  {formatTime(contest.endTime)}
                </p>
              </div>
            </section>
            <div className="sticky top-8">
              <button
                onClick={handleButtonClick}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Enter Contest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
          <div className="h-10 w-3/4 bg-white/20 rounded animate-pulse"></div>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-lg p-6 shadow-md space-y-2"
                >
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md space-y-4">
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
