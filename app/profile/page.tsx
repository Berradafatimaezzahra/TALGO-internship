"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    location: "New York, USA",
    bio: "I am a computer science student passionate about web development and artificial intelligence.",
    university: "Columbia University",
    graduationYear: "2024",
  })

  const handleSaveChanges = () => {
    // In a real app, this would save to a backend
    alert("Profile changes saved!")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 bg-blue-900 text-white text-2xl">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.role}</p>
              <Button variant="outline" size="sm" className="mt-2">
                Change Photo
              </Button>
            </div>
          </div>
          <p className="mt-4">{user.bio}</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Input value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <Textarea value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} rows={4} />
            </div>

            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Education</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">University/Institution</label>
              <Input value={user.university} onChange={(e) => setUser({ ...user, university: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Graduation Year</label>
              <Input
                value={user.graduationYear}
                onChange={(e) => setUser({ ...user, graduationYear: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
