import Link from "next/link";
import { ArrowRight, BookOpen, Trophy, BarChart2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Academiq</h1>
          <div className="space-x-4">
            <Link
              href="/ContestList"
              className="text-gray-600 hover:text-blue-600"
            >
              Contests
            </Link>
            <Link
              href="/Login"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col justify-center">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Prepare for Olympiads and JEE
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join live contests and boost your academic performance
          </p>
          <Link
            href="/Signup"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Trophy className="w-12 h-12 text-blue-600" />}
            title="Live Contests"
            description="Participate in real-time competitions to test your skills and knowledge"
          />
          <FeatureCard
            icon={<BookOpen className="w-12 h-12 text-blue-600" />}
            title="Comprehensive Syllabus"
            description="Cover all topics for Olympiads and JEE with our expertly curated content"
          />
          <FeatureCard
            icon={<BarChart2 className="w-12 h-12 text-blue-600" />}
            title="Live Ranking"
            description="Track your progress and compete with peers through our real-time ranking system"
          />
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 Academiq. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
