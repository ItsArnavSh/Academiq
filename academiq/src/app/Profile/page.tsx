'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'

// Sample rating data
const ratingData = [
  { date: 'Jul', rating: 1200 },
  { date: 'Aug', rating: 1300 },
  { date: 'Sep', rating: 1450 },
  { date: 'Oct', rating: 1550 },
  { date: 'Nov', rating: 1650 },
  { date: 'Dec', rating: 1600 },
  { date: 'Jan', rating: 1574 }
]



export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-8">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-grow">
            {/* User Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20From%202025-01-19%2017-13-35-PVi9jGQgJUQ8TVBBqeVElevdYs1wWz.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Krish Wadhwa</h1>
                    <p className="text-gray-600">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-green-100 text-green-800">
                        ✓
                      </span>
                      <span className="ml-2">krish_wadhwa24</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Information */} {/*This is the section where we will display the user's information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Username:</p>
                  <p className="font-medium">krish_wadhwa24</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country:</p>
                  <p className="font-medium flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/w20/in.png"
                      width="20"
                      alt="India flag"
                      className="inline-block"
                    />
                    India
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student/Professional:</p>
                  <p className="font-medium">Other</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">CodeChef Pro Plan:</p>
                  <p className="font-medium flex items-center gap-2">
                    No Active Plan
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      View Details
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-xl font-semibold">Rating Graph</h2>
                <p className="text-sm text-gray-500">
                  No. of Contests Participated: 7
                </p>
              </div>

              {/* Current Rating Card */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-green-700 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">1574</div>
                  <div className="text-sm opacity-90">Rating</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    Starters 169 (Rated)
                  </div>
                  <div className="text-sm text-gray-500">
                    (2025-01-15 22:00:02)
                  </div>
                  <div className="text-sm">
                    Global Rank: <span className="font-medium">1632</span>
                  </div>
                </div>
              </div>

              {/* Rating Graph */}
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '8px'
                      }}
                      formatter={(value) => [`Rating: ${value}`, '']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <XAxis 
                      dataKey="date"
                      stroke="#666"
                      tick={{ fill: '#666' }}
                    />
                    <YAxis 
                      domain={[1200, 1700]}
                      stroke="#666"
                      tick={{ fill: '#666' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ fill: '#16a34a', r: 4 }}
                      activeDot={{ r: 6, fill: '#16a34a' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Rating Card - Now on the right side */}
          <div className="lg:w-72 bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">1574</div>
            <div className="text-gray-600 mb-2">(Div 3)</div>
            <div className="flex justify-center gap-1 mb-2">
              <span className="text-green-600 text-2xl">★</span>
              <span className="text-green-600 text-2xl">★</span>
            </div>
            <a href="#" className="text-blue-600 hover:underline block mb-1">
              CodeChef Rating
            </a>
            <div className="text-sm text-gray-500 mb-4">
              (Highest Rating 1644)
            </div>
            <div className="grid grid-cols-2 gap-4 border-t pt-4 w-full">
              <div>
                <a href="#" className="text-blue-600 hover:underline block text-lg font-semibold">
                  23460
                </a>
                <div className="text-sm text-gray-500">Global Rank</div>
              </div>
              <div>
                <a href="#" className="text-blue-600 hover:underline block text-lg font-semibold">
                  20949
                </a>
                <div className="text-sm text-gray-500">Country Rank</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

