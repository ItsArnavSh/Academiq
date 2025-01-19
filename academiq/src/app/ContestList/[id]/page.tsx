'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { getContestsdetails } from '../ContestDetails'

interface Contest {
  id: string
  name: string
  startTime: { seconds: number; nanoseconds: number }
  endTime: { seconds: number; nanoseconds: number }
  description: string
  questions: Array<{ question: string; options: string[] }>
}

export default function ContestDetails() {
  const params = useParams()
  const id = params?.id as string
  const [contest, setContest] = React.useState<Contest | null>(null)

  React.useEffect(() => {
    const fetchContestDetails = async () => {
      const contests = await getContestsdetails()
      const selectedContest = contests.find((contest) => contest.id === id)
      setContest(selectedContest || null)
    }
    fetchContestDetails()
  }, [id])

  if (!contest) {
    return <div className="p-8 text-center text-gray-400">Loading contest details...</div>
  }

  const formatTime = (time: { seconds: number; nanoseconds: number }) => {
    return new Date(time.seconds * 1000).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-[#2D2747] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-[#7FFFD4]">
          <h1 className="text-3xl font-bold text-[#2D2747]">{contest.name}</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600">{contest.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Time</h2>
            <p className="text-gray-600">Start: {formatTime(contest.startTime)}</p>
            <p className="text-gray-600">End: {formatTime(contest.endTime)}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
            {contest.questions.map((question, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Question {index + 1}: {question.question}</h3>
                <ul className="list-disc pl-5">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="text-gray-600">{option}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

