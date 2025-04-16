"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AuthHeader } from "@/components/auth-header"
import { useLanguage } from "@/components/language-provider"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createSupabaseClient } from "@/utils/supabase-client"

type LoginFormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createSupabaseClient()

      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (loginError) {
        console.error("Login error:", loginError)
        setError(loginError.message)
        return
      }

      if (!data.user) {
        setError("Invalid email or password")
        return
      }

      toast({
        title: "Login successful",
        description: "Welcome back to TalGo!",
      })

      // Store user info in localStorage for client-side access
      const userData = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata?.role || "student",
        username: data.user.user_metadata?.username,
      }

      localStorage.setItem("talgo-user", JSON.stringify(userData))

      router.push("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <AuthHeader />

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder={t("email")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder={t("password")}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : t("login")}
            </Button>

            <div className="flex flex-col items-center gap-4 text-sm">
              <Link href="/forgot-password" className="text-gray-600 hover:text-blue-900">
                {t("forgotPassword")}
              </Link>
              <Link href="/signup" className="text-gray-600 hover:text-blue-900 flex items-center">
                {t("dontHaveAccount")} <span className="ml-2">→</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
