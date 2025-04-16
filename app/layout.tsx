import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RootLayoutClient } from "@/components/root-layout-client"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TalGo - Internship Platform",
  description: "Where Internships Turn into Opportunities, and Skills into Success!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'