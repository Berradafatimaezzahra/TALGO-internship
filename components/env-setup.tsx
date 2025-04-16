"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EnvSetup() {
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseKey, setSupabaseKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would securely store these values
    // For this demo, we'll just simulate storing them
    localStorage.setItem("https://tnbabmwhjzympnvyvhes.supabase.co", supabaseUrl)
    localStorage.setItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuYmFibXdoanp5bXBudnl2aGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDIwOTEsImV4cCI6MjA1NzI3ODA5MX0.1UMEnDiweB_gp7D_YBjLb7wlHU_cI5uVF26rPOikiy8", supabaseKey)

    // Redirect to users page
    setTimeout(() => {
      router.push("/users")
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Set Up Supabase Credentials</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="supabaseUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Supabase URL
          </label>
          <input
            id="supabaseUrl"
            type="text"
            value={supabaseUrl}
            onChange={(e) => setSupabaseUrl(e.target.value)}
            placeholder="https://your-project.supabase.co"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="supabaseKey" className="block text-sm font-medium text-gray-700 mb-1">
            Supabase Anon Key
          </label>
          <input
            id="supabaseKey"
            type="password"
            value={supabaseKey}
            onChange={(e) => setSupabaseKey(e.target.value)}
            placeholder="your-anon-key"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? "Setting up..." : "Continue"}
        </button>
      </form>
    </div>
  )
}
