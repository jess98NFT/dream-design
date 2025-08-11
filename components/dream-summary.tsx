"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { DreamData } from "./dream-onboarding"

interface DreamSummaryProps {
  dreamData: DreamData
  onRestart: () => void
}

export function DreamSummary({ dreamData, onRestart }: DreamSummaryProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="glass-card p-12 rounded-3xl border-0 shadow-2xl max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-4xl font-bold mb-6 shadow-lg">
            ✨
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Dream Life Vision</h1>

          <p className="text-xl text-gray-600">A beautiful summary of your aspirations and dreams</p>
        </div>

        <div className="space-y-8">
          {/* Life Vision */}
          {dreamData.step1 && (
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Life Vision</h3>
              <p className="text-gray-700 leading-relaxed">{dreamData.step1}</p>
            </div>
          )}

          {/* Core Values */}
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

          {/* Career Dreams */}
          {dreamData.step3 && (
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Career Dreams</h3>
              <p className="text-gray-700 leading-relaxed">{dreamData.step3}</p>
            </div>
          )}

          {/* Personal Growth */}
          {dreamData.step5 && (
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Personal Growth</h3>
              <p className="text-gray-700 leading-relaxed">{dreamData.step5}</p>
            </div>
          )}

          {/* Final Inspiration */}
          {dreamData.step7 && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Your Dream in One Line</h3>
              <p className="text-2xl font-medium text-gray-800 italic">"{dreamData.step7}"</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-12">
          <Button
            onClick={onRestart}
            variant="outline"
            className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            Start Over
          </Button>

          <Button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Generate my dream brand with Lovable
          </Button>
        </div>
      </Card>
    </div>
  )
}
