import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth routes - redirect to dashboard if already logged in
  if (
    (req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/signup" ||
      req.nextUrl.pathname === "/forgot-password") &&
    session
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Protected routes - redirect to login if not logged in
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/chat",
    "/my-applications",
    "/available-programs",
    "/payment-methods",
    "/settings",
  ]

  const isProtectedRoute = protectedRoutes.some(
    (route) => req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(`${route}/`),
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
}
