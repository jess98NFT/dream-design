"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StepSidebar } from "@/components/step-sidebar"

interface DreamData {
  step1: string
  step2: string[]
  step3: string
  step4: string[]
  step5: string
  step6: string[]
  step7: string
  step3_images?: string[]
  step4_images?: string[]
  step5_images?: string[]
  step6_images?: string[]
  step7_images?: string[]
}

const stepQuestions = {
  1: {
    title: "What daily habits or routines would your best self follow to thrive?",
    subtitle: "Think about morning runs, journaling, sunrise meditation, learning new skills...",
    type: "textarea" as const,
    placeholder: "e.g., morning run, journaling, sunrise meditation, learning a new skill...",
    hasImages: false,
  },
  2: {
    title: "What values guide your dreams?",
    subtitle: "Select the core principles your dream life is built on",
    type: "multi-select" as const,
    hasImages: false,
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
    title: "In your dream life, what are you known for?",
    subtitle: "This shapes your dream role, work environment, and public identity",
    type: "textarea" as const,
    placeholder: "e.g., leading a movement, designing beautiful things, healing people, building futuristic tech...",
    hasImages: true,
  },
  4: {
    title: "What activities fill your ideal week?",
    subtitle: "Choose the activities that add color to your dream life's calendar",
    type: "image-multi-select" as const,
    hasImages: true,
  },
  5: {
    title: "How do you invest in yourself?",
    subtitle: "Define your self-improvement ecosystem",
    type: "multi-select" as const,
    hasImages: false,
    options: ["Biohacking", "Education", "Fitness", "Mindfulness", "Creative Expression", "Adventure Challenges"],
  },
  6: {
    title: "Where does your dream self live and spend time?",
    subtitle: "Set the physical backdrop for your dream vision",
    type: "image-select" as const,
    hasImages: true,
  },
  7: {
    title: "If you could wake up tomorrow as your dream self, describe the first scene you'd see.",
    subtitle: "This serves as the anchor visual for your entire dream life",
    type: "textarea" as const,
    placeholder: "Describe the first scene you'd see when you wake up as your dream self...",
    hasImages: true,
  },
}

export default function StepPage() {
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
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [showImages, setShowImages] = useState(false)

  const question = stepQuestions[stepNumber as keyof typeof stepQuestions]

  useEffect(() => {
    const saved = localStorage.getItem("dreamData")
    if (saved) {
      const data = JSON.parse(saved)
      setDreamData(data)
      const stepKey = `step${stepNumber}` as keyof DreamData
      const answer =
        data[stepKey] || (question?.type === "multi-select" || question?.type === "image-multi-select" ? [] : "")
      setCurrentAnswer(answer)
      const imagesKey = `step${stepNumber}_images` as keyof DreamData
      setSelectedImages(data[imagesKey] || [])
      const hasAnswer = Array.isArray(answer)
        ? answer.length > 0
        : typeof answer === "string"
          ? answer.trim().length > 0
          : false
      setShowImages(hasAnswer && question.hasImages)
    } else {
      setCurrentAnswer(question?.type === "multi-select" || question?.type === "image-multi-select" ? [] : "")
      setShowImages(false)
    }
  }, [stepNumber, question?.type, question.hasImages])

  const handleAnswerSubmit = () => {
    if (question.hasImages && canProceed) {
      setShowImages(true)
    } else {
      handleNext()
    }
  }

  const handleNext = () => {
    if (question.hasImages && showImages && selectedImages.length === 0) {
      return
    }

    const stepKey = `step${stepNumber}` as keyof DreamData
    const imagesKey = `step${stepNumber}_images` as keyof DreamData
    const updatedData = {
      ...dreamData,
      [stepKey]: currentAnswer,
      [imagesKey]: selectedImages,
    }
    setDreamData(updatedData)
    localStorage.setItem("dreamData", JSON.stringify(updatedData))

    if (stepNumber < 7) {
      router.push(`/step/${stepNumber + 1}`)
    } else {
      router.push("/summary")
    }
  }

  const handleBack = () => {
    if (stepNumber > 1) {
      router.push(`/step/${stepNumber - 1}`)
    } else {
      router.push("/")
    }
  }

  const handleMultiSelectToggle = (value: string) => {
    const currentValues = currentAnswer as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    setCurrentAnswer(newValues)
  }

  const getImageOptions = () => {
    switch (stepNumber) {
      case 3: // Career & Contribution
        return [
          { id: "leader", src: "/business-leader.png", label: "Leading a Movement" },
          { id: "artist", src: "/artist-creating.png", label: "Designing Beautiful Things" },
          { id: "healer", src: "/inspiring-teacher.png", label: "Healing People" },
          { id: "tech", src: "/tech-innovation-abstract.png", label: "Building Futuristic Tech" },
        ]
      case 4: // Lifestyle & Passions - Multi-select image cards
        return [
          { id: "travel", src: "/mountain-adventure.png", label: "Traveling to New Places" },
          { id: "hosting", src: "/friends-gathering.png", label: "Hosting Dinner Parties" },
          { id: "creative", src: "/artist-creating.png", label: "Painting & Creating" },
          { id: "nature", src: "/minimalist-clean-simple-living.png", label: "Exploring Nature" },
          { id: "fitness", src: "/fitness-yoga-healthy-lifestyle.png", label: "Surfing & Sports" },
          { id: "reading", src: "/cozy-modern-interior.png", label: "Reading & Learning" },
        ]
      case 5: // Growth
        return [
          { id: "meditation", src: "/fitness-yoga-healthy-lifestyle.png", label: "Mindfulness" },
          { id: "learning", src: "/inspiring-teacher.png", label: "Learning" },
          { id: "fitness", src: "/mountain-adventure.png", label: "Physical Growth" },
          { id: "creativity", src: "/artist-creating.png", label: "Creative Expression" },
        ]
      case 6: // Environment & Surroundings
        return [
          { id: "coastal", src: "/luxury-elegant-scene.png", label: "Coastal Villa" },
          { id: "city", src: "/cozy-modern-interior.png", label: "Bustling City Loft" },
          { id: "forest", src: "/minimalist-clean-simple-living.png", label: "Forest Retreat" },
          { id: "mountain", src: "/mountain-adventure.png", label: "Mountain Chalet" },
        ]
      case 7: // Final Vision - Background images
        return [
          { id: "sunrise", src: "/mountain-adventure.png", label: "Mountain Sunrise" },
          { id: "ocean", src: "/luxury-elegant-scene.png", label: "Ocean View" },
          { id: "city", src: "/cozy-modern-interior.png", label: "City Skyline" },
          { id: "nature", src: "/minimalist-clean-simple-living.png", label: "Natural Setting" },
        ]
      default:
        return []
    }
  }

  const handleImageSelect = (imageId: string) => {
    setSelectedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const canProceed = Array.isArray(currentAnswer)
    ? currentAnswer.length > 0
    : typeof currentAnswer === "string"
      ? currentAnswer.trim().length > 0
      : false

  const canProceedToNext = question.hasImages ? showImages && selectedImages.length > 0 : canProceed

  const imageOptions = getImageOptions()

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden flex">
      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="sparkle" style={{ top: "20%", left: "80%", animationDelay: "0.5s" }}></div>
        <div className="sparkle" style={{ top: "60%", left: "15%", animationDelay: "1.5s" }}></div>
        <div className="sparkle" style={{ top: "80%", left: "70%", animationDelay: "2.5s" }}></div>
      </div>

      <StepSidebar currentStep={stepNumber} totalSteps={7} />

      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
            {/* Question & Answer Tile */}
            <Card className="glass-card p-8 rounded-3xl border-0 shadow-2xl flex flex-col justify-center">
              <div className="text-center mb-8 relative z-10">
                <div className="text-sm text-sky-600 mb-2 font-medium">Step {stepNumber} of 7</div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 text-white text-2xl font-bold mb-4 shadow-xl cloud-bounce">
                  {stepNumber}
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight text-sky-800 cloud-text">
                  {question.title}
                </h1>
                <p className="text-sky-600 text-base lg:text-lg">{question.subtitle}</p>
              </div>

              <div className="space-y-6 mb-8 relative z-10 flex-1 flex flex-col justify-center">
                {question.type === "input" && (
                  <Input
                    value={currentAnswer as string}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full p-4 text-lg rounded-2xl border-0 bg-white/60 backdrop-blur-sm focus:bg-white/80 transition-all duration-300 shadow-inner text-sky-800 placeholder:text-sky-500"
                  />
                )}

                {question.type === "textarea" && (
                  <Textarea
                    value={currentAnswer as string}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder={question.placeholder}
                    rows={4}
                    className="w-full p-4 text-lg rounded-2xl border-0 bg-white/60 backdrop-blur-sm focus:bg-white/80 transition-all duration-300 shadow-inner resize-none text-sky-800 placeholder:text-sky-500"
                  />
                )}

                {question.type === "multi-select" && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {question.options?.map((option) => {
                        const isSelected = (currentAnswer as string[]).includes(option)
                        return (
                          <Badge
                            key={option}
                            variant={isSelected ? "default" : "outline"}
                            className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                              isSelected
                                ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg hover:shadow-xl"
                                : "bg-white/40 backdrop-blur-sm border-sky-200 text-sky-700 hover:bg-white/60"
                            }`}
                            onClick={() => handleMultiSelectToggle(option)}
                          >
                            {option}
                          </Badge>
                        )
                      })}
                    </div>
                    {(currentAnswer as string[]).length > 0 && (
                      <div className="text-center text-sm text-sky-600 mt-4 font-medium">
                        Selected {(currentAnswer as string[]).length} values
                      </div>
                    )}
                  </div>
                )}

                {question.type === "image-multi-select" && (
                  <div className="space-y-4">
                    <div className="text-center text-sm text-sky-600 mb-4">
                      Select the activities that fill your ideal week
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {getImageOptions().map((image) => {
                        const isSelected = (currentAnswer as string[]).includes(image.id)
                        return (
                          <div
                            key={image.id}
                            onClick={() => handleMultiSelectToggle(image.id)}
                            className={`relative cursor-pointer group transition-all duration-300 transform hover:scale-105 ${
                              isSelected ? "ring-2 ring-sky-400 ring-offset-2 scale-105" : ""
                            }`}
                          >
                            <div className="aspect-square rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                              <img
                                src={image.src || "/placeholder.svg"}
                                alt={image.label}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="text-center mt-2">
                              <span className="text-xs font-medium text-sky-700">{image.label}</span>
                            </div>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {(currentAnswer as string[]).length > 0 && (
                      <div className="text-center text-sm text-sky-600 mt-4 font-medium">
                        Selected {(currentAnswer as string[]).length} activities
                      </div>
                    )}
                  </div>
                )}

                {question.type === "image-select" && (
                  <div className="space-y-4">
                    <div className="text-center text-sm text-sky-600 mb-4">Choose your dream environment</div>
                    <div className="grid grid-cols-2 gap-3">
                      {getImageOptions().map((image) => {
                        const isSelected = currentAnswer === image.id
                        return (
                          <div
                            key={image.id}
                            onClick={() => setCurrentAnswer(image.id)}
                            className={`relative cursor-pointer group transition-all duration-300 transform hover:scale-105 ${
                              isSelected ? "ring-2 ring-sky-400 ring-offset-2 scale-105" : ""
                            }`}
                          >
                            <div className="aspect-square rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                              <img
                                src={image.src || "/placeholder.svg"}
                                alt={image.label}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="text-center mt-2">
                              <span className="text-xs font-medium text-sky-700">{image.label}</span>
                            </div>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between relative z-10">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="px-6 py-2 rounded-full bg-white/30 backdrop-blur-sm border-sky-200 text-sky-700 hover:bg-white/50 transition-all duration-300"
                >
                  Back
                </Button>

                <Button
                  onClick={question.hasImages && !showImages ? handleAnswerSubmit : handleNext}
                  disabled={question.hasImages && !showImages ? !canProceed : !canProceedToNext}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {question.hasImages && !showImages ? "Continue" : stepNumber === 7 ? "Complete" : "Next"}
                </Button>
              </div>
            </Card>

            {/* Pictures Tile */}
            {question.hasImages ? (
              <Card className="glass-card p-8 rounded-3xl border-0 shadow-2xl flex flex-col">
                {!showImages ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-200 to-blue-300 text-sky-600 text-2xl font-bold mb-4 shadow-lg cloud-bounce">
                      ☁️
                    </div>
                    <h3 className="text-lg font-semibold text-sky-700 mb-2">Dream Space</h3>
                    <p className="text-sky-600 text-sm mb-4">Answer the question to reveal visual inspiration</p>
                    <div className="w-12 h-1 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xl font-bold mb-4 shadow-xl animate-bounce">
                        📸
                      </div>
                      <h2 className="text-xl font-bold mb-2 text-sky-800 cloud-text">Choose images that resonate</h2>
                      <p className="text-sky-600 text-sm">
                        Based on your answer: "
                        {typeof currentAnswer === "string"
                          ? currentAnswer.slice(0, 50) + "..."
                          : "Your selected values"}
                        "
                      </p>
                    </div>

                    <div className="flex-1 flex items-center justify-center mb-6">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        {imageOptions.map((image, index) => (
                          <div
                            key={image.id}
                            onClick={() => handleImageSelect(image.id)}
                            className={`relative cursor-pointer group transition-all duration-500 transform hover:scale-105 animate-fade-in ${
                              selectedImages.includes(image.id) ? "ring-3 ring-sky-400 ring-offset-2 scale-105" : ""
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="aspect-square rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                              <img
                                src={image.src || "/placeholder.svg"}
                                alt={image.label}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="text-center mt-2">
                              <span className="text-xs font-medium text-sky-700">{image.label}</span>
                            </div>
                            {selectedImages.includes(image.id) && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-sky-600 mb-4">
                        {selectedImages.length > 0 ? `${selectedImages.length} selected` : "Select images to continue"}
                      </p>
                    </div>
                  </>
                )}
              </Card>
            ) : (
              <Card className="glass-card p-8 rounded-3xl border-0 shadow-2xl flex flex-col items-center justify-center">
                <div className="text-center opacity-60">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-200 to-blue-300 text-sky-600 text-2xl font-bold mb-4 shadow-lg">
                    ☁️
                  </div>
                  <h3 className="text-lg font-semibold text-sky-700 mb-2">Dream Space</h3>
                  <p className="text-sky-600 text-sm">Your thoughts are taking shape...</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
