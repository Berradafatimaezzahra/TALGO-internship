"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { usePathname } from "next/navigation"
import { LanguageProvider } from "@/components/language-provider"
import { SettingsProvider } from "@/components/settings-provider"

const inter = Inter({ subsets: ["latin"] })

// This is a client component wrapper to use usePathname
export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if the current route is an auth route
  // This handles both direct routes and routes within the (auth) group
  const authRoutes = ["/login", "/signup", "/forgot-password"]
  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.endsWith(route))

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <LanguageProvider>
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
      </LanguageProvider>
    </ThemeProvider>
  )
}
