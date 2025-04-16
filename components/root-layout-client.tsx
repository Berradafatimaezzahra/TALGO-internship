"use client"

import type React from "react"
import { useEffect } from "react"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/sidebar-provider"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { SettingsProvider } from "@/components/settings-provider"
import { UserProvider } from "@/components/user-provider"

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if the current route is an auth route
  // This handles both direct routes and routes within the (auth) group
  const authRoutes = ["/login", "/signup", "/forgot-password"]
  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.endsWith(route))

  useEffect(() => {
    const handleLanguageChange = () => {
      // Force re-render when language changes
      // This is intentionally empty to trigger re-renders
    }

    window.addEventListener("languagechange", handleLanguageChange)
    return () => window.removeEventListener("languagechange", handleLanguageChange)
  }, [])

  return (
    <UserProvider>
      <SettingsProvider>
        {isAuthRoute ? (
          // For auth routes, just render the children without sidebar
          <main className="h-screen">{children}</main>
        ) : (
          // For protected routes, render with sidebar
          <SidebarProvider>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
              <EnhancedSidebar />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </SidebarProvider>
        )}
      </SettingsProvider>
    </UserProvider>
  )
}
