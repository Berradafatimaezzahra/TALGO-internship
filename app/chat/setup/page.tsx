"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertTriangle } from "lucide-react"

export default function ChatSetupPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Chat Configuration</CardTitle>
            <CardDescription>TalGo Chat Assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Using Fallback System</AlertTitle>
              <AlertDescription>
                The chat is currently operating in fallback mode with rule-based responses. This ensures basic
                functionality while we resolve API integration issues.
              </AlertDescription>
            </Alert>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">About the TalGo Assistant:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Provides information about TalGo's internship programs</li>
                <li>Answers questions about application processes</li>
                <li>Helps with platform navigation and features</li>
                <li>Offers guidance on program selection</li>
              </ul>
            </div>

            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Limited Capabilities</AlertTitle>
              <AlertDescription>
                In fallback mode, the assistant can answer basic questions about programs, application processes, and
                platform features, but may have limited responses for complex queries.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/chat")} className="w-full">
              Go to Chat
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
