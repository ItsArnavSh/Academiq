"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { getContestsdetails } from "./ContestDetails"

interface Contest {
  id: string
  name: string
  startTime: { seconds: number; nanoseconds: number }
  endTime: { seconds: number; nanoseconds: number }
  description: string
  url: string
}

function categorizeContests(contests: Contest[]) {
  const now = Date.now() / 1000 // Current time in seconds

  return contests.reduce(
    (acc, contest) => {
      if (now < contest.startTime.seconds) {
        acc.upcoming.push(contest)
      } else if (now >= contest.startTime.seconds && now <= contest.endTime.seconds) {
        acc.ongoing.push(contest)
      } else {
        acc.past.push(contest)
      }
      return acc
    },
    { upcoming: [] as Contest[], ongoing: [] as Contest[], past: [] as Contest[] },
  )
}

function formatDate(seconds: number) {
  return new Date(seconds * 1000).toLocaleString()
}

function formatDuration(startSeconds: number, endSeconds: number) {
  const durationInSeconds = endSeconds - startSeconds
  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor((durationInSeconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

export default function ContestTable() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [contests, setContests] = useState<Contest[]>([])

  useEffect(() => {
    const fetchContests = async () => {
      const fetchedContests = await getContestsdetails()
      setContests(fetchedContests)
    }
    fetchContests()
  }, [])

  const { upcoming, ongoing, past } = useMemo(() => categorizeContests(contests), [contests])

  const renderContestTable = (contests: Contest[], isOngoing = false) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-800/50">
          <tr>
            {["Name", "Start Time", "End Time", "Duration", "Actions"].map((header) => (
              <th key={header} className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {contests.map((contest) => (
            <tr key={contest.id} className="text-gray-300 hover:bg-gray-800/50">
              <td className="whitespace-nowrap px-4 py-3 text-sm text-blue-400">
                {isOngoing ? (
                  <a href={contest.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {contest.name}
                  </a>
                ) : (
                  contest.name
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">{formatDate(contest.startTime.seconds)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">{formatDate(contest.endTime.seconds)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                {formatDuration(contest.startTime.seconds, contest.endTime.seconds)}
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-sm">
                {isOngoing ? (
                  <Link href={`/ContestList/${contest.id}`} className="text-blue-400 hover:underline">
                    View Details
                  </Link>
                ) : (
                  <div className="text-blue-400">View Details</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="mb-4 relative">
        <div className="flex">
          {["upcoming", "ongoing", "past"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <Link href="/Profile" className="absolute top-0 right-0">
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded">
            Dashboard
          </button>
        </Link>
      </div>

      <div className="rounded-lg border border-gray-800">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold text-white">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Contests
          </h2>
        </div>

        {activeTab === "upcoming" &&
          (upcoming.length > 0 ? (
            renderContestTable(upcoming, false)
          ) : (
            <div className="p-8 text-center text-gray-400">No upcoming contests at the moment</div>
          ))}

        {activeTab === "ongoing" &&
          (ongoing.length > 0 ? (
            renderContestTable(ongoing, true)
          ) : (
            <div className="p-8 text-center text-gray-400">No ongoing contests at the moment</div>
          ))}

        {activeTab === "past" &&
          (past.length > 0 ? (
            renderContestTable(past, false)
          ) : (
            <div className="p-8 text-center text-gray-400">No past contests</div>
          ))}
      </div>
    </div>
  )
}

