"use server"

import { supabase } from "@/utils/supabase-client"
import { cookies } from "next/headers"

export type LoginFormData = {
  email: string
  password: string
}

export async function loginUser(formData: LoginFormData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message }
    }

    // Store session in cookies
    const cookieStore = cookies()
    const { session } = data

    if (session) {
      cookieStore.set("supabase-auth-token", session.access_token, {
        path: "/",
        maxAge: session.expires_in,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    }

    return {
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        role: data.user?.user_metadata?.role || "student",
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An unexpected error occurred during login" }
  }
}
