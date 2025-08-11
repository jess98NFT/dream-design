"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DreamData {
  step1: string
  step2: string[]
  step3: string
  step4: string[]
  step5: string
  step6: string[]
  step7: string
}

export default function SummaryPage() {
  const router = useRouter()
  const [dreamData, setDreamData] = useState<DreamData>({
    step1: "",
    step2: [],
    step3: "",
    step4: [],
    step5: "",
    step6: [],
    step7: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("dreamData")
    if (saved) {
      setDreamData(JSON.parse(saved))
    }
  }, [])

  const handleRestart = () => {
    localStorage.removeItem("dreamData")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-purple-50 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="glass-card p-12 rounded-3xl border-0 shadow-2xl max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-4xl font-bold mb-6 shadow-lg">
              ✨
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Dream Life Vision</h1>
            <p className="text-xl text-gray-600">A beautiful summary of your aspirations and dreams</p>
          </div>

          <div className="space-y-8">
            {dreamData.step1 && (
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Daily Habits & Routines</h3>
                <p className="text-gray-700 leading-relaxed">{dreamData.step1}</p>
              </div>
            )}

            {dreamData.step2.length > 0 && (
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {dreamData.step2.map((value) => (
                    <Badge
                      key={value}
                      className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full"
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {dreamData.step3 && (
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Dream Career</h3>
                <p className="text-gray-700 leading-relaxed">{dreamData.step3}</p>
              </div>
            )}

            {dreamData.step4 && (
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Lifestyle Vision</h3>
                <p className="text-gray-700 leading-relaxed">{dreamData.step4}</p>
              </div>
            )}

            {dreamData.step5 && (
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Personal Growth</h3>
                <p className="text-gray-700 leading-relaxed">{dreamData.step5}</p>
              </div>
            )}

            {dreamData.step6 && (
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Inspiring Environment</h3>
                <p className="text-gray-700 leading-relaxed">{dreamData.step6}</p>
              </div>
            )}

            {dreamData.step7 && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Your Final Inspiration</h3>
                <p className="text-2xl font-medium text-gray-800 italic">"{dreamData.step7}"</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              Start Over
            </Button>

            <Button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Generate VR Experience
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
