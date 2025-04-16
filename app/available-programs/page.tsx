"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { programTasks, type ProgramTask } from "@/data/program-tasks"
import { useLanguage } from "@/components/language-provider"
import { toast } from "@/hooks/use-toast"

// Define the program type
interface Program {
  id: number
  title: string
  category: string
  description: string
  duration: string
  badge: string
}

export default function AvailablePrograms() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const { t } = useLanguage()

  // Updated programs data with only tech internships
  const programs: Program[] = [
    {
      id: 1,
      title: "Full Stack Development",
      category: "development",
      description: "Build modern web applications using React, Node.js, and cloud technologies.",
      duration: "12 weeks",
      badge: "FS",
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      category: "ai",
      description: "Learn to build and deploy AI models using PyTorch and TensorFlow.",
      duration: "16 weeks",
      badge: "AI",
    },
    {
      id: 3,
      title: "Cloud Architecture",
      category: "cloud",
      description: "Master AWS, Azure, and GCP for modern cloud infrastructure.",
      duration: "14 weeks",
      badge: "CA",
    },
    {
      id: 4,
      title: "DevOps Engineering",
      category: "devops",
      description: "Learn CI/CD, containerization, and infrastructure automation.",
      duration: "12 weeks",
      badge: "DO",
    },
    {
      id: 5,
      title: "Cybersecurity",
      category: "security",
      description: "Master ethical hacking, security analysis, and threat prevention.",
      duration: "14 weeks",
      badge: "CS",
    },
    {
      id: 6,
      title: "Data Engineering",
      category: "data",
      description: "Build data pipelines and infrastructure for big data processing.",
      duration: "12 weeks",
      badge: "DE",
    },
    {
      id: 7,
      title: "Mobile App Development",
      category: "development",
      description: "Create cross-platform mobile apps using React Native and Flutter.",
      duration: "10 weeks",
      badge: "MA",
    },
    {
      id: 8,
      title: "Blockchain Development",
      category: "development",
      description: "Build decentralized applications and smart contracts.",
      duration: "12 weeks",
      badge: "BC",
    },
    {
      id: 9,
      title: "Computer Vision",
      category: "ai",
      description: "Implement image processing and object detection systems.",
      duration: "14 weeks",
      badge: "CV",
    },
    {
      id: 10,
      title: "Natural Language Processing",
      category: "ai",
      description: "Build language models and text processing applications.",
      duration: "14 weeks",
      badge: "NLP",
    },
    {
      id: 11,
      title: "Backend Engineering",
      category: "development",
      description: "Design and build scalable server-side applications.",
      duration: "12 weeks",
      badge: "BE",
    },
    {
      id: 12,
      title: "Frontend Engineering",
      category: "development",
      description: "Create modern user interfaces with React and Next.js.",
      duration: "10 weeks",
      badge: "FE",
    },
  ]

  // Filter programs based on active tab
  const filteredPrograms =
    activeTab === "all" ? programs : programs.filter((program) => program.category === activeTab.toLowerCase())

  const handleApply = (program: Program) => {
    setSelectedProgram(program)
    setIsDialogOpen(true)
  }

  const handleSubmitApplication = () => {
    setIsApplying(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsApplying(false)
      setIsDialogOpen(false)

      // Show success message
      toast({
        title: "Application Submitted",
        description: `Your application for ${selectedProgram?.title} has been submitted successfully.`,
      })

      // Clear previous applications and add the new one
      const newApplication = {
        id: Date.now(),
        programId: selectedProgram?.id,
        programTitle: selectedProgram?.title,
        status: "applied",
        date: new Date().toLocaleDateString(),
        badge: selectedProgram?.badge,
        company: "TalGo",
      }

      // Replace all applications with just the new one
      localStorage.setItem("talgo-applications", JSON.stringify([newApplication]))
    }, 1500)
  }

  // Get tasks for the selected program
  const getTasks = (programId: number): ProgramTask[] => {
    return programTasks[programId] || []
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("programs")}</h1>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 w-full max-w-4xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="ai">AI/ML</TabsTrigger>
          <TabsTrigger value="cloud">Cloud</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/20 h-[80px] flex items-center justify-center">
              <Badge className="text-lg font-bold bg-white dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                {program.badge}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
              <div className="flex justify-between text-sm">
                <span>Duration: {program.duration}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3">
              <Button className="w-full" onClick={() => handleApply(program)}>
                {t("apply")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Program Tasks Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedProgram?.title} - {t("tasks")}
            </DialogTitle>
            <DialogDescription>
              This internship runs for {selectedProgram?.duration}. Below are the key tasks you'll complete during the
              program.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {selectedProgram &&
              getTasks(selectedProgram.id).map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge
                      variant={
                        task.difficulty === "Beginner"
                          ? "outline"
                          : task.difficulty === "Intermediate"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {task.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
                  <p className="text-xs text-gray-500">Duration: {task.duration}</p>
                </div>
              ))}
          </div>

          <DialogFooter className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              By applying, you commit to completing all the tasks within the program duration.
            </p>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmitApplication} disabled={isApplying}>
                {isApplying ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
