"use client"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import type { DreamData } from "./dream-onboarding"

interface StepContentProps {
  currentStep: number
  dreamData: DreamData
  updateDreamData: (stepKey: keyof DreamData, value: any) => void
}

const stepQuestions = {
  1: {
    title: "What's your ultimate life vision?",
    subtitle: "Describe the life you dream of living in vivid detail",
    type: "textarea" as const,
    placeholder: "In my dream life, I wake up every morning feeling...",
  },
  2: {
    title: "What values guide your dreams?",
    subtitle: "Select the core values that resonate with your ideal self",
    type: "multi-select" as const,
    options: [
      "Freedom",
      "Creativity",
      "Adventure",
      "Family",
      "Success",
      "Peace",
      "Growth",
      "Impact",
      "Authenticity",
      "Connection",
      "Balance",
      "Innovation",
    ],
  },
  3: {
    title: "What's your dream career path?",
    subtitle: "Describe the work that would make you jump out of bed excited",
    type: "textarea" as const,
    placeholder: "My dream career involves...",
  },
  4: {
    title: "How do you want to live?",
    subtitle: "Choose lifestyle elements that speak to your soul",
    type: "image-select" as const,
    description: "Select images that represent your ideal lifestyle",
  },
  5: {
    title: "How do you want to grow?",
    subtitle: "What personal development journey calls to you?",
    type: "textarea" as const,
    placeholder: "I want to become someone who...",
  },
  6: {
    title: "What environment inspires you?",
    subtitle: "Choose the settings where you thrive",
    type: "image-select" as const,
    description: "Select environments that energize and inspire you",
  },
  7: {
    title: "What's your final inspiration?",
    subtitle: "One last thought about your dream life",
    type: "input" as const,
    placeholder: "My dream life in one sentence...",
  },
}

export function StepContent({ currentStep, dreamData, updateDreamData }: StepContentProps) {
  const question = stepQuestions[currentStep as keyof typeof stepQuestions]
  const stepKey = `step${currentStep}` as keyof DreamData

  const handleTextChange = (value: string) => {
    updateDreamData(stepKey, value)
  }

  const handleMultiSelectToggle = (value: string) => {
    const currentValues = dreamData[stepKey] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    updateDreamData(stepKey, newValues)
  }

  return (
    <Card className="glass-card p-8 rounded-3xl border-0 shadow-2xl relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="sparkle" style={{ top: "15%", left: "85%", animationDelay: "0.2s" }}></div>
        <div className="sparkle" style={{ top: "75%", left: "10%", animationDelay: "1.2s" }}></div>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-2xl font-bold mb-4 shadow-lg pulse-glow">
          {currentStep}
        </div>

        <h2 className="text-3xl font-bold mb-3 leading-tight text-shimmer">{question.title}</h2>

        <p className="text-gray-600 text-lg">{question.subtitle}</p>
      </div>

      <div className="space-y-6">
        {question.type === "input" && (
          <Input
            value={dreamData[stepKey] as string}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 text-lg rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all duration-300 shadow-inner"
          />
        )}

        {question.type === "textarea" && (
          <Textarea
            value={dreamData[stepKey] as string}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={question.placeholder}
            rows={6}
            className="w-full p-4 text-lg rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all duration-300 shadow-inner resize-none"
          />
        )}

        {question.type === "multi-select" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {question.options?.map((option) => {
                const isSelected = (dreamData[stepKey] as string[]).includes(option)
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`px-6 py-3 text-base rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl"
                        : "bg-white/30 backdrop-blur-sm border-white/50 text-gray-700 hover:bg-white/50"
                    }`}
                    onClick={() => handleMultiSelectToggle(option)}
                  >
                    {option}
                  </Badge>
                )
              })}
            </div>

            {(dreamData[stepKey] as string[]).length > 0 && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Selected {(dreamData[stepKey] as string[]).length} values
              </div>
            )}
          </div>
        )}

        {question.type === "image-select" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white text-3xl mb-4">
              🖼️
            </div>
            <p className="text-gray-600 text-lg">{question.description}</p>
            <p className="text-sm text-gray-500 mt-2">Image selection will appear in the right panel</p>
          </div>
        )}
      </div>

      {/* Step Progress Indicator */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i + 1 === currentStep
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg scale-125"
                  : i + 1 < currentStep
                    ? "bg-green-400"
                    : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
