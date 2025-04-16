"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const pathname = usePathname()

  // Get sidebar state from localStorage if available
  const [open, setOpen] = React.useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-state")
      return savedState ? savedState === "true" : true
    }
    return true
  })

  // Save sidebar state to localStorage when it changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-state", String(open))
    }
  }, [open])

  // Close mobile sidebar when route changes
  React.useEffect(() => {
    setOpenMobile(false)
  }, [pathname])

  // Helper to toggle the sidebar
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Add keyboard shortcut to toggle sidebar (Ctrl+B)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  )

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}
