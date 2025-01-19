"use client";
import { getContestQuestions } from "./getContests";
import { useState, useEffect } from "react";
import { Card } from "./card";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./getContests";

export default function ContestPage() {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(() => {
    // Retrieve saved time from localStorage
    const savedTime = localStorage.getItem("contest-timer");
    const savedTimestamp = localStorage.getItem("contest-timestamp");

    if (savedTime && savedTimestamp) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(savedTimestamp)) / 1000,
      );
      const remainingTime = parseInt(savedTime) - elapsedTime;
      return remainingTime > 0 ? remainingTime : 0;
    }

    // Default time (1 hour in seconds)
    return 3600;
  });

  useEffect(() => {
    // const enterFullscreen = () => {
    //   if (!document.fullscreenElement) {
    //     document.documentElement.requestFullscreen().catch((err) => {
    //       console.error("Error attempting to enable full-screen mode:", err);
    //     });
    //   }
    // };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        alert("You are not allowed to switch tabs during the contest!");
        // enterFullscreen(); // Re-enter full-screen mode
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You must stay in full-screen mode during the contest!");
        // enterFullscreen(); // Re-enter full-screen mode
      }
    };

    const handleBlur = () => {
      alert("You cannot switch windows during the contest!");
      // enterFullscreen(); // Re-enter full-screen mode
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("blur", handleBlur);

    // Enable full-screen on page load
    // enterFullscreen();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getContestQuestions("TMTqpSqeeIdYmCg4T6N1");
        setLoading(true);
        if (Array.isArray(questions) && questions.length > 0) {
          setQuestionList(questions);
        } else {
          console.warn("No questions returned or invalid response:", questions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    // Save timer state to localStorage
    localStorage.setItem("contest-timer", timeLeft.toString());
    localStorage.setItem("contest-timestamp", Date.now().toString());

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          localStorage.removeItem("contest-timer");
          localStorage.removeItem("contest-timestamp");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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

  // Ensure you import your Firestore configuration

  const handleSubmit = () => {
    const questionId = questionList[currentQuestionIndex]?.id;

    if (!questionId || !answer.trim()) {
      alert("Please provide an answer before submitting!");
      return;
    }
    if (questionList[currentQuestionIndex].answer == answer) {
      console.log(true);
    } else console.log(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading questions...
      </div>
    );
  }

  if (questionList.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        No questions available for this contest.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title=""
          className="lg:col-span-2 bg-gradient-to-b from-blue-100 to-white p-6 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Question Description</h2>
          <div className="prose prose-invert">
            <p className="text-gray-800">
              {questionList[currentQuestionIndex]?.questionDesc ||
                "No description available."}
            </p>
            <h3 className=" mt-4">Example:</h3>
            <pre className="bg-black/30 p-4 rounded-lg text-gray-100">
              {questionList[currentQuestionIndex]?.title ||
                "No example available."}
            </pre>
          </div>
        </Card>

        <div className="lg:col-span-1 space-y-6">
          <Card
            title=""
            className="bg-gradient-to-b from-blue-100 to-white p-6 rounded-lg min-h-screen"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Answer</h2>
              <div className="bg-black/30 px-4 py-2 rounded-lg">
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <textarea
              className="w-full p-3 bg-black/30 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white"
              rows={5}
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>

            <div className="flex justify-between mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                onClick={handleNext}
                disabled={currentQuestionIndex === questionList.length - 1}
              >
                Next
              </button>
            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4"
              onClick={handleSubmit}
            >
              Submit Answer
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
