"use client"

import { usePathname } from "next/navigation"

export function DebugRoute() {
  const pathname = usePathname()

  // Check if the current route is an auth route
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/(auth)") ||
    pathname.includes("/login") ||
    pathname.includes("/signup") ||
    pathname.includes("/forgot-password")

  if (process.env.NODE_ENV !== "production") {
    return (
      <div className="fixed bottom-2 right-2 bg-black/80 text-white text-xs p-2 rounded z-50">
        <div>Path: {pathname}</div>
        <div>Auth Route: {isAuthRoute ? "Yes" : "No"}</div>
      </div>
    )
  }

  return null
}
