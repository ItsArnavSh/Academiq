"use client";
import { getContestData } from "./getContests";
import { useState, useEffect } from "react";
import { Card } from "./card";
import Timer from "./timer";
import Calculator from "./calculator";

export default function ContestPage() {
  const data = getContestData();
  const [doneList, setDoneList] = useState([]);
  useEffect(() => {
    setDoneList(Array(data.questions.length).fill(false));
  }, [data.questions.length]); // Re-run only if the questions length changes

  const [questionList, setQuestionList] = useState(data.questions);
  const [loading, setLoading] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState<{
    text: string;
    isCorrect: boolean;
    show: boolean;
  } | null>(null);

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
    //If is correct
    if (isCorrect) {
      doneList[currentQuestionIndex] = true;
    }

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
                <Timer contestId="TMTqpSqeeIdYmCg4T6N1" initialTime={3600} />
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
