import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TalGo - Authentication",
  description: "Where Internships Turn into Opportunities, and Skills into Success!",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen">{children}</div>
}
