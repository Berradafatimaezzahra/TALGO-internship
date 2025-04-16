"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function MyApplications() {
  const [activeTab, setActiveTab] = useState("all")

  // Update the applications state to load from localStorage
  const [applications, setApplications] = useState(() => {
    // Load applications from localStorage if available
    if (typeof window !== "undefined") {
      const savedApplications = localStorage.getItem("talgo-applications")
      if (savedApplications) {
        try {
          return JSON.parse(savedApplications)
        } catch (e) {
          console.error("Error parsing applications:", e)
        }
      }
    }

    // Default applications if none in localStorage
    return [
      {
        id: 1,
        position: "Frontend Developer",
        company: "Tech Solutions Inc.",
        status: "applied",
        date: "10/03/2023",
        badge: "TS",
      },
    ]
  })

  // Add useEffect to update applications when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedApplications = localStorage.getItem("talgo-applications")
      if (savedApplications) {
        try {
          setApplications(JSON.parse(savedApplications))
        } catch (e) {
          console.error("Error parsing applications:", e)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Filter applications based on active tab
  const filteredApplications =
    activeTab === "all" ? applications : applications.filter((app) => app.status === activeTab.toLowerCase())

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles = {
      applied: "bg-blue-100 text-blue-700",
      interview: "bg-orange-100 text-orange-700",
      offer: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    }

    const style = statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-700"

    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${style}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="offer">Offer</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplications.map((app) => (
          <Card key={app.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{app.position}</h3>
                  <p className="text-sm text-gray-500">{app.company}</p>
                </div>
                <Badge variant="outline" className="bg-gray-100">
                  {app.badge}
                </Badge>
              </div>

              <StatusBadge status={app.status} />

              <p className="text-sm text-gray-500 mt-4">Applied on: {app.date}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-3">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
