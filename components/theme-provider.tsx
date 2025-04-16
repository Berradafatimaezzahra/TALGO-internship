"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeContext = {
  theme?: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
})

function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme
    }

    const storedTheme = window.localStorage.getItem("theme") as Theme | null
    return storedTheme || defaultTheme
  })

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const root = window.document.documentElement

    function updateTheme(theme: Theme) {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.setAttribute(attribute, systemTheme)
        return
      }
      root.setAttribute(attribute, theme)
    }

    updateTheme(theme)
  }, [theme, attribute])

  React.useEffect(() => {
    window.localStorage.setItem("theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

function useTheme() {
  return React.useContext(ThemeContext)
}

export { ThemeProvider, useTheme }
