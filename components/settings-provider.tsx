"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage, type Language } from "@/components/language-provider"

// Define the settings type
export interface UserSettings {
  name: string
  email: string
  emailNotifications: boolean
  pushNotifications: boolean
  marketingEmails: boolean
  twoFactorAuth: boolean
  fontSize: "small" | "medium" | "large"
  language: string
  darkMode: boolean
}

// Default settings
const defaultSettings: UserSettings = {
  name: "John Doe",
  email: "john@example.com",
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  twoFactorAuth: false,
  fontSize: "medium",
  language: "en",
  darkMode: false,
}

interface SettingsContextType {
  settings: UserSettings
  updateSettings: (newSettings: Partial<UserSettings>) => void
  saveSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [settings, setSettings] = useState<UserSettings>({
    ...defaultSettings,
    darkMode: theme === "dark",
    language,
  })
  const [isInitialized, setIsInitialized] = useState(false)

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("talgo-user-settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings) as UserSettings
        setSettings(parsedSettings)

        // Apply theme from settings
        setTheme(parsedSettings.darkMode ? "dark" : "light")

        // Apply font size
        applyFontSize(parsedSettings.fontSize)

        // Apply language
        if (parsedSettings.language && parsedSettings.language !== language) {
          setLanguage(parsedSettings.language as Language)
        }
      } catch (error) {
        console.error("Error parsing settings:", error)
      }
    }
    setIsInitialized(true)
  }, [setTheme, language, setLanguage])

  // Update settings when theme changes
  useEffect(() => {
    if (isInitialized) {
      setSettings((prev) => ({
        ...prev,
        darkMode: theme === "dark",
      }))
    }
  }, [theme, isInitialized])

  // Update settings when language changes
  useEffect(() => {
    if (isInitialized) {
      setSettings((prev) => ({
        ...prev,
        language,
      }))
    }
  }, [language, isInitialized])

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }

      // Apply theme if it changed
      if (newSettings.darkMode !== undefined && newSettings.darkMode !== prev.darkMode) {
        setTheme(newSettings.darkMode ? "dark" : "light")
      }

      // Apply font size if it changed
      if (newSettings.fontSize !== undefined && newSettings.fontSize !== prev.fontSize) {
        applyFontSize(newSettings.fontSize)
      }

      // Apply language if it changed
      if (newSettings.language !== undefined && newSettings.language !== prev.language) {
        setLanguage(newSettings.language as Language)

        // Force refresh to apply language changes
        window.dispatchEvent(new Event("languagechange", { bubbles: true }))
      }

      return updated
    })
  }

  const saveSettings = () => {
    localStorage.setItem("talgo-user-settings", JSON.stringify(settings))
  }

  const applyFontSize = (fontSize: string) => {
    const html = document.documentElement

    // Remove any existing font size classes
    html.classList.remove("text-sm", "text-base", "text-lg")

    // Add the appropriate class based on the font size setting
    switch (fontSize) {
      case "small":
        html.classList.add("text-sm")
        break
      case "medium":
        html.classList.add("text-base")
        break
      case "large":
        html.classList.add("text-lg")
        break
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings }}>{children}</SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
