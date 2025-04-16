"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { AuthHeader } from "@/components/auth-header"
import { useLanguage } from "@/components/language-provider"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send a password reset email
    setIsSubmitted(true)
    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions.",
    })
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side with curved shape */}
      <div className="hidden lg:block lg:w-1/2 bg-blue-900 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M800 0H0V800C0 800 200 600 400 600C600 600 800 800 800 800V0Z' fill='white'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* Right side with forgot password form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <AuthHeader />

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <p className="text-gray-600 text-center mb-4">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
                <Input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg">
                Send Reset Link
              </Button>

              <div className="text-center">
                <Link href="/login" className="text-blue-900 hover:underline text-sm">
                  {t("login")}
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                We've sent password reset instructions to your email address. Please check your inbox.
              </p>
              <Button variant="outline" onClick={() => router.push("/login")} className="mt-4">
                {t("login")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
