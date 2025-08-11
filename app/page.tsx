"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()

  const startJourney = () => {
    // Clear any existing data
    localStorage.removeItem("dreamData")
    router.push("/step/1")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-purple-50 to-blue-100 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>

        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>

        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <Card className="glass-card p-12 rounded-3xl border-0 shadow-2xl max-w-2xl w-full mx-4 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-4xl font-bold mb-6 shadow-lg pulse-glow">
          ✨
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-shimmer">Dream Life Journey</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover and visualize your perfect future through 7 transformative questions
        </p>

        <Button
          onClick={startJourney}
          className="px-12 py-4 text-lg rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Begin Your Journey
        </Button>
      </Card>
    </div>
  )
}
