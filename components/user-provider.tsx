"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createSupabaseClient } from "@/utils/supabase-client"

type User = {
  id: string
  email: string | null
  role: string
  username?: string
}

type UserContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    // Try to get user from localStorage first for immediate UI update
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("talgo-user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error("Error parsing stored user:", e)
        }
      }
    }

    // Then check with Supabase for the current session
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const { id, email, user_metadata } = session.user
          const userData = {
            id,
            email,
            role: user_metadata?.role || "student",
            username: user_metadata?.username,
          }

          setUser(userData)

          // Update localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("talgo-user", JSON.stringify(userData))
          }
        } else {
          setUser(null)
          // Clear localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("talgo-user")
          }
        }
      } catch (error) {
        console.error("Error checking user session:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { id, email, user_metadata } = session.user
        const userData = {
          id,
          email,
          role: user_metadata?.role || "student",
          username: user_metadata?.username,
        }

        setUser(userData)

        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("talgo-user", JSON.stringify(userData))
        }
      } else {
        setUser(null)
        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("talgo-user")
        }
      }

      setLoading(false)
    })

    checkUser()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("talgo-user")
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <UserContext.Provider value={{ user, loading, signOut }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
