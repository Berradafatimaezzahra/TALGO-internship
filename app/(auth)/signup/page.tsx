"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthHeader } from "@/components/auth-header"
import { useLanguage } from "@/components/language-provider"
import type { SignupFormData } from "@/app/actions/auth"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createSupabaseClient } from "@/utils/supabase-client"

export default function SignupPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    role: "student",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Use client-side Supabase for signup
      const supabase = createSupabaseClient()

      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            role: formData.role,
            created_at: new Date().toISOString(),
          },
        },
      })

      if (signupError) {
        console.error("Signup error:", signupError)
        setError(signupError.message)
        return
      }

      if (!data.user) {
        setError("Failed to create account. Please try again.")
        return
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully. Please check your email for verification.",
      })

      router.push("/login")
    } catch (err) {
      console.error("Signup error:", err)
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

      {/* Right side with signup form */}
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
                  type="text"
                  placeholder={t("username")}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
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
              <div>
                <Input
                  type="password"
                  placeholder={t("confirmPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t("role")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : t("createAccount")}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">{t("alreadyHaveAccount")}</span>{" "}
              <Link href="/login" className="text-blue-900 hover:underline">
                {t("login")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
