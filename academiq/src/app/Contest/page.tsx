'use client'

import { useState, useEffect } from 'react'
import { Card } from './card'

export default function ContestPage() {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Description Section */}
        <Card title="" className="lg:col-span-2 bg-[#6b5558] p-6 rounded-lg ">
          <h2 className="text-2xl font-bold text-white mb-4">Question Description</h2>
          <div className="prose prose-invert">
            <p className="text-gray-100">
              Sample question text goes here. This is where the detailed problem description, 
              constraints, and examples would be displayed.
            </p>
            <h3 className="text-white mt-4">Example 1:</h3>
            <pre className="bg-black/30 p-4 rounded-lg text-gray-100">
              Input: n = 5
              Output: 120
              Explanation: 5! = 5 * 4 * 3 * 2 * 1 = 120
            </pre>
          </div>
        </Card>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Options Section */}
          <Card title="" className="bg-[#6b5558] p-6 rounded-lg min-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Options</h2>
              <div className="bg-black/30 px-4 py-2 rounded-lg">
                <span className="font-mono text-white">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {['A', 'B', 'C', 'D'].map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedOption === option 
                      ? 'bg-white/20 border border-white' 
                      : 'bg-black/20 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-white">{option}.</span>
                  <span className="text-gray-100">Option {option}</span>
                </label>
              ))}
            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              onClick={() => console.log('Submitted:', selectedOption)}
            >
              Submit Answer
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}

