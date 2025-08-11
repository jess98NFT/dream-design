"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
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

const getImagesForStep = (stepNumber: number, answer: string) => {
  const baseImages = {
    3: [
      // Career
      { id: "entrepreneur", label: "Entrepreneur", url: "/entrepreneur-working.png" },
      { id: "creative", label: "Creative", url: "/artist-creating.png" },
      { id: "leader", label: "Leader", url: "/business-leader.png" },
      { id: "teacher", label: "Teacher", url: "/inspiring-teacher.png" },
      { id: "innovator", label: "Innovator", url: "/tech-innovation-abstract.png" },
      { id: "helper", label: "Helper", url: "/helping-hands.png" },
    ],
    4: [
      // Lifestyle
      { id: "active", label: "Active Life", url: "/fitness-yoga-healthy-lifestyle.png" },
      { id: "peaceful", label: "Peaceful", url: "/peaceful-meditation.png" },
      { id: "social", label: "Social", url: "/friends-gathering.png" },
      { id: "luxury", label: "Luxury", url: "/luxury-elegant-scene.png" },
      { id: "simple", label: "Simple Living", url: "/minimalist-clean-simple-living.png" },
      { id: "adventure", label: "Adventure", url: "/mountain-adventure.png" },
    ],
    5: [
      // Growth
      { id: "learning", label: "Learning", url: "/person-reading-studying.png" },
      { id: "fitness", label: "Physical Growth", url: "/diverse-fitness-training.png" },
      { id: "mindfulness", label: "Mindfulness", url: "/meditation-mindfulness.png" },
      { id: "skills", label: "New Skills", url: "/learning-new-skills.png" },
      { id: "relationships", label: "Relationships", url: "/meaningful-connections.png" },
      { id: "creativity", label: "Creativity", url: "/abstract-creative-expression.png" },
    ],
    6: [
      // Environment
      { id: "nature", label: "Nature", url: "/peaceful-forest-trees.png" },
      { id: "city", label: "Urban", url: "/placeholder.svg?height=120&width=120" },
      { id: "home", label: "Cozy Home", url: "/cozy-modern-interior.png" },
      { id: "beach", label: "Coastal", url: "/beautiful-beach-ocean-waves.png" },
      { id: "mountains", label: "Mountains", url: "/scenic-mountain-peaks.png" },
      { id: "workspace", label: "Creative Space", url: "/placeholder.svg?height=120&width=120" },
    ],
  }

  return baseImages[stepNumber as keyof typeof baseImages] || []
}

export default function ImagesPage() {
  const router = useRouter()
  const params = useParams()
  const stepNumber = Number.parseInt(params.stepNumber as string)
  const [dreamData, setDreamData] = useState<DreamData>({
    step1: "",
    step2: [],
    step3: "",
    step4: [],
    step5: "",
    step6: [],
    step7: "",
  })
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [userAnswer, setUserAnswer] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("dreamData")
    if (saved) {
      const data = JSON.parse(saved)
      setDreamData(data)
      const stepKey = `step${stepNumber}` as keyof DreamData
      const imageKey = `step${stepNumber}` as keyof DreamData
      setUserAnswer(data[stepKey] || "")
      setSelectedImages(data[imageKey] || [])
    }
  }, [stepNumber])

  const images = getImagesForStep(stepNumber, userAnswer)

  const handleImageToggle = (imageId: string) => {
    setSelectedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const handleNext = () => {
    // Save selected images
    const imageKey = `step${stepNumber}` as keyof DreamData
    const updatedData = { ...dreamData, [imageKey]: selectedImages }
    setDreamData(updatedData)
    localStorage.setItem("dreamData", JSON.stringify(updatedData))

    // Navigate to next step
    if (stepNumber < 7) {
      router.push(`/step/${stepNumber + 1}`)
    } else {
      router.push("/summary")
    }
  }

  const handleSkip = () => {
    if (stepNumber < 7) {
      router.push(`/step/${stepNumber + 1}`)
    } else {
      router.push("/summary")
    }
  }

  const handleBack = () => {
    router.push(`/step/${stepNumber}`)
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
        <Card className="glass-card p-8 rounded-3xl border-0 shadow-2xl max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-2">Step {stepNumber} of 7</div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-2xl font-bold mb-4 shadow-lg">
              <span className="text-2xl">🖼️</span>
            </div>
            <h1 className="text-3xl font-bold mb-3 leading-tight text-shimmer">
              Choose the images that feel right for you.
            </h1>
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 mb-4">
              <p className="text-gray-700 italic">"{userAnswer}"</p>
            </div>
            <p className="text-gray-600">Great! Here are some visuals based on your answer.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {images.map((image) => {
              const isSelected = selectedImages.includes(image.id)
              return (
                <div
                  key={image.id}
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isSelected ? "ring-4 ring-purple-400 ring-opacity-60" : ""
                  }`}
                  onClick={() => handleImageToggle(image.id)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.label}
                      className="w-full h-full object-cover"
                    />
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

          {selectedImages.length > 0 && (
            <div className="text-center mb-6">
              <p className="text-gray-600">{selectedImages.length} images selected</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              ← Back
            </Button>

            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="px-8 py-3 rounded-full text-gray-600 hover:bg-white/20 transition-all duration-300"
              >
                Skip
              </Button>

              <Button
                onClick={handleNext}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
