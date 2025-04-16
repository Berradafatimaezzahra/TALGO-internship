"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  LineChart,
  MoreHorizontal,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    // In a real app, this would clear auth tokens/cookies
    router.push("/login")
  }

  // Sample data for the dashboard
  const categories = [
    { name: "Software development", progress: 75 },
    { name: "AI and DATA Science", progress: 90 },
    { name: "Cybersecurity", progress: 60 },
    { name: "Cloud Computing & DevOps", progress: 45 },
  ]

  const stats = [
    { title: "Applied Internships", value: "12", icon: FileText, change: "+2", trend: "up" },
    { title: "Active Applications", value: "5", icon: Clock, change: "+1", trend: "up" },
    { title: "Completed Tasks", value: "28", icon: CheckCircle, change: "+5", trend: "up" },
    { title: "Success Rate", value: "75%", icon: TrendingUp, change: "+2%", trend: "up" },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Applied to Frontend Developer position",
      company: "Tech Solutions Inc.",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      title: "Completed weekly assessment",
      company: "AI Bootcamp",
      time: "Yesterday",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Scheduled interview",
      company: "Creative Designs",
      time: "2 days ago",
      icon: Calendar,
    },
    {
      id: 4,
      title: "Received feedback",
      company: "Web Innovations",
      time: "3 days ago",
      icon: Users,
    },
  ]

  // Generate calendar days
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem>Print Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Customize View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="bg-blue-900 dark:bg-blue-950 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">
          TalGo - Where Internships Turn into Opportunities, and Skills into Success!
        </h2>
        <p className="mb-4">
          Join our platform to discover internship opportunities that match your skills and career goals.
        </p>
        <Button variant="secondary" className="mt-2" asChild>
          <Link href="/available-programs">Join Now</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <stat.icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <span
                  className={
                    stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">since last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{category.progress}%</span>
                      </div>
                      <Progress value={category.progress} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Link href="/available-programs" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    See more →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <activity.icon className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>{activity.company}</span>
                          <span className="mx-1">•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Application Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center items-center h-[200px]">
                  <div className="flex flex-col items-center">
                    <BarChart className="h-16 w-16 text-blue-700 dark:text-blue-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Application statistics visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progress Trends</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center items-center h-[200px]">
                  <div className="flex flex-col items-center">
                    <LineChart className="h-16 w-16 text-blue-700 dark:text-blue-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Progress trends visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Skills Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center items-center h-[200px]">
                  <div className="flex flex-col items-center">
                    <PieChart className="h-16 w-16 text-blue-700 dark:text-blue-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Skills distribution visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">March 2025</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <div
                    key={day}
                    className={`h-10 flex items-center justify-center rounded-md text-sm cursor-pointer ${
                      day === 11
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/50 rounded-md">
                    <div className="w-1 h-6 bg-blue-700 dark:bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Technical Interview</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">11 Mar, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-md">
                    <div className="w-1 h-6 bg-green-700 dark:bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Project Submission</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">15 Mar, 11:59 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
