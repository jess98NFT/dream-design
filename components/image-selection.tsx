"use client"

import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import type { DreamData } from "./dream-onboarding"

interface ImageSelectionProps {
  currentStep: number
  dreamData: DreamData
  updateDreamData: (stepKey: keyof DreamData, value: any) => void
}

const imageOptions = {
  4: {
    // Lifestyle
    title: "Lifestyle Vibes",
    images: [
      { id: "cozy-home", label: "Cozy Home", url: "/cozy-modern-interior.png" },
      { id: "travel", label: "Travel", url: "/mountain-adventure.png" },
      { id: "fitness", label: "Active Life", url: "/fitness-yoga-healthy-lifestyle.png" },
      { id: "social", label: "Social", url: "/friends-gathering.png" },
      { id: "luxury", label: "Luxury", url: "/luxury-elegant-scene.png" },
      { id: "minimalist", label: "Minimalist", url: "/minimalist-clean-simple-living.png" },
    ],
  },
  6: {
    // Environment
    title: "Dream Environments",
    images: [
      { id: "city", label: "Urban", url: "/placeholder-zjkyg.png" },
      { id: "nature", label: "Nature", url: "/peaceful-forest-trees.png" },
      { id: "beach", label: "Coastal", url: "/beautiful-beach-ocean-waves.png" },
      { id: "mountains", label: "Mountains", url: "/scenic-mountain-peaks.png" },
      { id: "countryside", label: "Countryside", url: "/placeholder.svg?height=120&width=120" },
      { id: "workspace", label: "Creative Space", url: "/placeholder.svg?height=120&width=120" },
    ],
  },
}

export function ImageSelection({ currentStep, dreamData, updateDreamData }: ImageSelectionProps) {
  const stepKey = `step${currentStep}` as keyof DreamData
  const options = imageOptions[currentStep as keyof typeof imageOptions]

  if (!options) {
    return (
      <Card className="glass-card p-6 rounded-3xl border-0 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-lg">Visualize your dreams</p>
          <p className="text-sm mt-2">Images will appear for relevant steps</p>
        </div>
      </Card>
    )
  }

  const handleImageToggle = (imageId: string) => {
    const currentSelections = dreamData[stepKey] as string[]
    const newSelections = currentSelections.includes(imageId)
      ? currentSelections.filter((id) => id !== imageId)
      : [...currentSelections, imageId]
    updateDreamData(stepKey, newSelections)
  }

  return (
    <Card className="glass-card p-6 rounded-3xl border-0 h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{options.title}</h3>
        <p className="text-sm text-gray-600">Select all that resonate with you</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.images.map((image) => {
          const isSelected = (dreamData[stepKey] as string[]).includes(image.id)
          return (
            <div
              key={image.id}
              className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                isSelected ? "ring-4 ring-purple-400 ring-opacity-60" : ""
              }`}
              onClick={() => handleImageToggle(image.id)}
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm">
                <img src={image.url || "/placeholder.svg"} alt={image.label} className="w-full h-full object-cover" />
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <span className="text-purple-500 font-bold">✓</span>
                    </div>
                  </div>
                )}
              </div>

              <Badge
                variant={isSelected ? "default" : "outline"}
                className={`mt-2 w-full justify-center rounded-full transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                    : "bg-white/30 backdrop-blur-sm border-white/50 text-gray-700"
                }`}
              >
                {image.label}
              </Badge>
            </div>
          )
        })}
      </div>

      {(dreamData[stepKey] as string[]).length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">{(dreamData[stepKey] as string[]).length} selected</p>
        </div>
      )}
    </Card>
  )
}
