"use client"

interface StepSidebarProps {
  currentStep: number
  totalSteps: number
}

const stepLabels = [
  "Daily Habits",
  "Core Values",
  "Career Dreams",
  "Lifestyle",
  "Personal Growth",
  "Environment",
  "Final Vision",
]

const stepIcons = ["☁️", "⭐", "🚀", "🏡", "🌱", "🌍", "✨"]

export function StepSidebar({ currentStep, totalSteps }: StepSidebarProps) {
  return (
    <div className="w-80 bg-gradient-to-b from-sky-100/80 to-blue-200/60 backdrop-blur-xl border-r border-sky-200/50 p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud-small" style={{ top: "10%", left: "70%", animationDelay: "0s" }}></div>
        <div className="cloud-small" style={{ top: "40%", left: "10%", animationDelay: "2s" }}></div>
        <div className="cloud-small" style={{ top: "70%", left: "60%", animationDelay: "4s" }}></div>
      </div>

      <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-sky-800 mb-2 cloud-text">Dream Journey</h1>
        <p className="text-sky-600 text-sm">Navigate your path to your ideal life</p>
      </div>

      <div className="space-y-3 relative z-10">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div
              key={stepNumber}
              className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 transform ${
                isActive
                  ? "bg-white/40 backdrop-blur-sm shadow-xl scale-105 cloud-glow"
                  : isCompleted
                    ? "bg-white/20 backdrop-blur-sm shadow-md hover:bg-white/30"
                    : "opacity-60 hover:opacity-80"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg cloud-bounce"
                    : isCompleted
                      ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md"
                      : "bg-white/30 backdrop-blur-sm text-sky-600 border-2 border-sky-200"
                }`}
              >
                {isCompleted ? "✓" : stepIcons[i]}
              </div>

              <div className="flex-1">
                <div
                  className={`font-semibold transition-colors duration-300 ${
                    isActive ? "text-sky-800" : isCompleted ? "text-sky-700" : "text-sky-600"
                  }`}
                >
                  Step {stepNumber}
                </div>
                <div
                  className={`text-sm transition-colors duration-300 ${
                    isActive ? "text-sky-700" : isCompleted ? "text-sky-600" : "text-sky-500"
                  }`}
                >
                  {stepLabels[i]}
                </div>
              </div>

              {isActive && <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse shadow-lg"></div>}
            </div>
          )
        })}
      </div>

      <div className="mt-8 relative z-10">
        <div className="flex justify-between text-sm text-sky-700 mb-3 font-medium">
          <span>Journey Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="text-xs text-sky-600 mt-2 text-center">
          {currentStep} of {totalSteps} steps completed
        </div>
      </div>
    </div>
  )
}
