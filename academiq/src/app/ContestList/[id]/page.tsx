'use client'

import Cookies from "js-cookie"
import React from "react"
import { useParams, useRouter } from "next/navigation"
import { getContestsdetails } from "../ContestDetails"

interface Contest {
  id: string
  name: string
  startTime: { seconds: number; nanoseconds: number }
  endTime: { seconds: number; nanoseconds: number }
  description: string
  questions: Array<{
    qname: string
    description: string
    image: string
    solution: string
  }>
}

export default function ContestDetails() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [contest, setContest] = React.useState<Contest | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const contests = await getContestsdetails()
        const selectedContest = contests.find((contest) => contest.id === id)
        setContest(selectedContest || null)
      } catch (error) {
        console.error("Error fetching contest details:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchContestDetails()
  }, [id])

  const handleButtonClick = () => {
    Cookies.set("contest", JSON.stringify({ contest: contest }), {
      expires: 7,
    })
    router.push("/Contest")
  }

  const formatTime = (time: { seconds: number; nanoseconds: number }) => {
    return new Date(time.seconds * 1000).toLocaleString()
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!contest) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <p className="text-center text-gray-500">Contest not found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8">
          <h1 className="text-4xl font-bold">{contest.name}</h1>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{contest.description}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions</h2>
              <div className="space-y-4">
                {contest.questions.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contest Time</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Start:</span> {formatTime(contest.startTime)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">End:</span> {formatTime(contest.endTime)}
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
  )
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
                <div key={i} className="bg-gray-50 rounded-lg p-6 shadow-md space-y-2">
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
  )
}

