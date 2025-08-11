"use client"

import { useState } from "react"
import { StepSidebar } from "./step-sidebar"
import { StepContent } from "./step-content"
import { ImageSelection } from "./image-selection"
import { DreamSummary } from "./dream-summary"
import { Button } from "./ui/button"

export interface DreamData {
  step1: string // Life vision
  step2: string[] // Values selection
  step3: string // Career dreams
  step4: string[] // Lifestyle images
  step5: string // Personal growth
  step6: string[] // Environment preferences
  step7: string // Final inspiration
}

const TOTAL_STEPS = 7

export function DreamOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [dreamData, setDreamData] = useState<DreamData>({
    step1: "",
    step2: [],
    step3: "",
    step4: [],
    step5: "",
    step6: [],
    step7: "",
  })

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const updateDreamData = (stepKey: keyof DreamData, value: any) => {
    setDreamData((prev) => ({
      ...prev,
      [stepKey]: value,
    }))
  }

  if (isComplete) {
    return (
      <DreamSummary
        dreamData={dreamData}
        onRestart={() => {
          setCurrentStep(1)
          setIsComplete(false)
          setDreamData({
            step1: "",
            step2: [],
            step3: "",
            step4: [],
            step5: "",
            step6: [],
            step7: "",
          })
        }}
      />
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <StepSidebar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Center Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <StepContent currentStep={currentStep} dreamData={dreamData} updateDreamData={updateDreamData} />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="dream-button px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                Back
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="dream-button px-8 py-3 rounded-full text-gray-600 hover:bg-white/20 transition-all duration-300"
                >
                  Skip
                </Button>

                <Button
                  onClick={handleNext}
                  className="dream-button px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {currentStep === TOTAL_STEPS ? "Complete" : "Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 p-6">
          <ImageSelection currentStep={currentStep} dreamData={dreamData} updateDreamData={updateDreamData} />
        </div>
      </div>
    </div>
  )
}
