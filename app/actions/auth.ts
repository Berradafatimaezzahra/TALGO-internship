"use server"

import { supabase } from "@/utils/supabase-client"
import { revalidatePath } from "next/cache"

export type SignupFormData = {
  username: string
  email: string
  password: string
  role: string
}

export async function signupUser(formData: SignupFormData) {
  try {
    // 1. Create authentication user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username,
          role: formData.role,
        },
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      console.error("No user returned from auth signup")
      return { success: false, error: "Failed to create user account" }
    }

    console.log("Auth user created successfully:", authData.user.id)

    // 2. Store user data directly in the auth.users metadata instead of a separate profiles table
    // This avoids the need for a separate profiles table and simplifies the process
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        created_at: new Date().toISOString(),
      },
    })

    if (updateError) {
      console.error("Error updating user metadata:", updateError)
      return { success: false, error: updateError.message }
    }

    console.log("User metadata updated successfully")
    revalidatePath("/login")
    return { success: true, userId: authData.user.id }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, error: "An unexpected error occurred during signup" }
  }
}
