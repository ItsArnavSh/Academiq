"use client";
import { getContestQuestions } from "./getContests";
import { useState, useEffect } from "react";
import { Card } from "./card";

export default function ContestPage() {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getContestQuestions("TMTqpSqeeIdYmCg4T6N1");
        setLoading(true);
        console.log("Fetched questions:", questions); // Debugging log

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

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
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
      setAnswer(""); // Reset answer field for the new question
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswer(""); // Reset answer field for the previous question
    }
  };

  const handleSubmit = () => {
    console.log(
      "Submitted answer for question",
      currentQuestionIndex + 1,
      ":",
      answer,
    );
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
        <Card title="" className="lg:col-span-2 bg-[#6b5558] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Question Description
          </h2>
          <div className="prose prose-invert">
            <p className="text-gray-100">
              {questionList[currentQuestionIndex]?.questionDesc ||
                "No description available."}
            </p>
            <h3 className="text-white mt-4">Example:</h3>
            <pre className="bg-black/30 p-4 rounded-lg text-gray-100">
              {questionList[currentQuestionIndex]?.title ||
                "No example available."}
            </pre>
          </div>
        </Card>

        <div className="lg:col-span-1 space-y-6">
          <Card title="" className="bg-[#6b5558] p-6 rounded-lg min-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Answer</h2>
              <div className="bg-black/30 px-4 py-2 rounded-lg">
                <span className="font-mono text-white">
                  {formatTime(timeLeft)}
                </span>
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
