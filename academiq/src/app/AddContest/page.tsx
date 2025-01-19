"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Assume this is set up

type Question = {
  description: string;
  answer: string;
};

type Contest = {
  name: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  students: string[];
  description: string;
  startTime: Date;
  endTime: Date;
  questions: Question[];
};

export default function AddContestPage() {
  const router = useRouter();
  const [contest, setContest] = useState<Contest>({
    name: "",
    status: "Upcoming",
    students: [],
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState<Question>({
    description: "",
    answer: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContest((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContest((prev) => ({
      ...prev,
      status: e.target.value as Contest["status"],
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContest((prev) => ({ ...prev, [name]: new Date(value) }));
  };

  const handleAddQuestion = () => {
    if (newQuestion.description && newQuestion.answer) {
      setContest((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
      setNewQuestion({ description: "", answer: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const docRef = await addDoc(collection(db, "Contests"), {
        ...contest,
        startTime: Timestamp.fromDate(contest.startTime),
        endTime: Timestamp.fromDate(contest.endTime),
      });

      // Add questions to a nested collection
      const questionsCollectionRef = collection(
        db,
        `Contests/${docRef.id}/quesArr`,
      );
      for (const question of contest.questions) {
        await addDoc(questionsCollectionRef, question);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/contests"); // Assuming there's a contests list page
      }, 2000);
    } catch (error) {
      console.error("Error adding contest: ", error);
      setError("There was an error adding the contest. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Contest</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contest Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={contest.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={contest.status}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={contest.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Time
              </label>
              <input
                id="startTime"
                name="startTime"
                type="datetime-local"
                value={contest.startTime.toISOString().slice(0, 16)}
                onChange={handleDateChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Time
              </label>
              <input
                id="endTime"
                name="endTime"
                type="datetime-local"
                value={contest.endTime.toISOString().slice(0, 16)}
                onChange={handleDateChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Questions</h3>
            {contest.questions.map((q, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                <p>
                  <strong>Description:</strong> {q.description}
                </p>
                <p>
                  <strong>Answer:</strong> {q.answer}
                </p>
              </div>
            ))}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Question description"
                value={newQuestion.description}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Answer"
                value={newQuestion.answer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, answer: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Question
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Contest
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Contest added successfully! Redirecting to contests page...
          </div>
        )}
      </div>
    </div>
  );
}
