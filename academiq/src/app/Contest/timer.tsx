'use client'

import { useState, useEffect } from 'react'

interface TimerProps {
  contestId: string // Unique ID for the contest
  initialTime: number // in seconds
}

export default function Timer({ contestId, initialTime }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Check if there's a saved time in localStorage for this contest
    const savedTime = localStorage.getItem(`timer-${contestId}`)
    const savedTimestamp = localStorage.getItem(`timestamp-${contestId}`)
    
    if (savedTime && savedTimestamp) {
      const elapsedTime = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000)
      const remainingTime = parseInt(savedTime) - elapsedTime
      return remainingTime > 0 ? remainingTime : 0
    }
    return initialTime
  })

  useEffect(() => {
    if (timeLeft <= 0) return

    // Save the remaining time and timestamp to localStorage
    localStorage.setItem(`timer-${contestId}`, timeLeft.toString())
    localStorage.setItem(`timestamp-${contestId}`, Date.now().toString())

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          clearInterval(timer)
          localStorage.removeItem(`timer-${contestId}`)
          localStorage.removeItem(`timestamp-${contestId}`)
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, contestId])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-black/30 px-4 py-2 rounded-lg">
      <span className="font-mono text-white">{formatTime(timeLeft)}</span>
    </div>
  )
}
