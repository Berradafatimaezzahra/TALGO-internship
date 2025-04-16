import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Use the provided environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a client for use in components
export const createSupabaseClient = () => {
  return createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })
}

// Function to get user profile data
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase.auth.admin.getUserById(userId)

    if (error) {
      console.error("Error fetching user:", error)
      return null
    }

    return {
      id: data.user.id,
      email: data.user.email,
      username: data.user.user_metadata?.username,
      role: data.user.user_metadata?.role || "student",
      created_at: data.user.user_metadata?.created_at,
    }
  } catch (err) {
    console.error("Error fetching user profile:", err)
    return null
  }
}

// Function to update user profile
export async function updateUserProfile(userId: string, userData: any) {
  try {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: userData,
    })

    if (error) {
      console.error("Error updating user:", error)
      return { success: false, error: error.message }
    }

    return { success: true, user: data.user }
  } catch (err) {
    console.error("Error updating user profile:", err)
    return { success: false, error: "An unexpected error occurred" }
  }
}
