"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Loader2, RefreshCw, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

// Define the message type
type Message = {
  id: string
  sender: "user" | "bot"
  content: string
  timestamp: string
  isError?: boolean
  isApiLimited?: boolean
}

export default function Chat() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      content:
        "👋 Hi! I'm your TalGo Assistant. I can help you with information about our internship programs, application process, and platform features.\n\nFeel free to ask me about:\n\n• Our internship programs (Software Development, AI & ML, Cloud Architecture, etc.)\n• Program details, curriculum, and pricing\n• Application process and requirements\n• Mentor consulting options\n• Platform navigation and features\n• Or anything else about TalGo!",
      timestamp: new Date().toISOString(),
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isApiLimited, setIsApiLimited] = useState(false)

  const [displayedContent, setDisplayedContent] = useState<{ [key: string]: string }>({})
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({})
  const [typingSpeed, setTypingSpeed] = useState(10) // Characters per frame (higher = faster)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle typing animation for bot messages
  useEffect(() => {
    const typingTimeouts: NodeJS.Timeout[] = []

    messages.forEach((message) => {
      if (message.sender === "bot" && !displayedContent[message.id]) {
        setIsTyping((prev) => ({ ...prev, [message.id]: true }))
        setDisplayedContent((prev) => ({ ...prev, [message.id]: "" }))

        let currentIndex = 0
        const content = message.content

        const typeNextBatch = () => {
          if (currentIndex < content.length) {
            const endIndex = Math.min(currentIndex + typingSpeed, content.length)
            const nextChunk = content.substring(currentIndex, endIndex)

            setDisplayedContent((prev) => ({
              ...prev,
              [message.id]: prev[message.id] + nextChunk,
            }))

            currentIndex = endIndex

            const timeout = setTimeout(typeNextBatch, 30) // Adjust timing here (lower = faster)
            typingTimeouts.push(timeout)
          } else {
            setIsTyping((prev) => ({ ...prev, [message.id]: false }))
          }
        }

        typeNextBatch()
      }
    })

    return () => {
      typingTimeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [messages, typingSpeed])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return

    // Clear any previous errors
    setError(null)

    // Generate a unique ID for the message
    const messageId = crypto.randomUUID()

    // Add user message
    const userMessage: Message = {
      id: messageId,
      sender: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Prepare headers
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      // Send the message to the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          messages: [userMessage], // Only send the latest message to simplify
        }),
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error(`Server error: ${response.status}`, errorText)
        throw new Error(`Server responded with ${response.status}: ${errorText}`)
      }

      const botResponse = await response.json()

      // Check if the response indicates API limitations
      const isLimitedResponse = botResponse.isApiLimited || botResponse.content.includes("fallback mode")

      if (isLimitedResponse && !isApiLimited) {
        setIsApiLimited(true)
        toast({
          title: "Limited AI Functionality",
          description: "The chatbot is operating in fallback mode with limited capabilities.",
          variant: "warning",
        })
      }

      // Add bot response with a unique ID
      setMessages((prev) => [
        ...prev,
        {
          ...botResponse,
          id: crypto.randomUUID(),
        },
      ])
    } catch (error: any) {
      console.error("Error sending message:", error)
      setError(error.message || "Failed to get response. Please try again.")

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          content: "Sorry, I encountered an error. Please try again later.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleRetry = () => {
    setError(null)
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-3rem)] overflow-hidden">
      {isApiLimited && (
        <CardHeader className="py-3 px-4 bg-amber-50 dark:bg-amber-950/30 border-b">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Limited AI Functionality</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                The chatbot is operating in fallback mode with limited capabilities.
              </p>
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="TalGo Assistant" />
                  <AvatarFallback className="bg-blue-700 text-white">T</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : message.isError
                      ? "bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                      : message.isApiLimited
                        ? "bg-amber-50 text-gray-800 dark:bg-amber-950/30 dark:text-gray-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {message.sender === "bot" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm max-w-none dark:prose-invert"
                    skipHtml={true}
                    components={{
                      strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
                      h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-2" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-md font-bold my-1" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                      li: ({ node, ...props }) => <li className="my-1" {...props} />,
                      p: ({ node, ...props }) => <p className="my-2" {...props} />,
                      a: ({ node, ...props }) => (
                        <a className="text-blue-600 dark:text-blue-400 underline" {...props} />
                      ),
                    }}
                  >
                    {displayedContent[message.id] || ""}
                  </ReactMarkdown>
                ) : (
                  <div className="whitespace-pre-line">{message.content}</div>
                )}
                {isTyping[message.id] && <span className="inline-block ml-1 animate-pulse">▋</span>}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-blue-700 text-white">T</AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <Alert variant="destructive" className="mx-4 my-2">
            <div className="flex justify-between items-center">
              <AlertDescription>{error}</AlertDescription>
              <Button variant="outline" size="sm" onClick={handleRetry} className="ml-2">
                <RefreshCw className="h-4 w-4 mr-1" /> Retry
              </Button>
            </div>
          </Alert>
        )}

        <div className="border-t p-4 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-gray-500">Typing Speed:</span>
            <div className="flex-1">
              <Slider
                value={[typingSpeed]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setTypingSpeed(value[0])}
              />
            </div>
            <span className="text-xs text-gray-500">{typingSpeed}x</span>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} size="icon" disabled={inputMessage.trim() === "" || isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
