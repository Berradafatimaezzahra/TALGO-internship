"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Briefcase,
  BookOpen,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useLanguage } from "@/components/language-provider"
import { useUser } from "@/components/user-provider"
import { toast } from "@/hooks/use-toast"

export function EnhancedSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar } = useSidebar()
  const { t } = useLanguage()
  const { signOut } = useUser()

  const mainNavItems = [
    { href: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/profile", label: t("profile"), icon: User },
    { href: "/chat", label: t("chat"), icon: MessageSquare },
  ]

  const internshipsNavItems = [
    { href: "/my-applications", label: t("applications"), icon: Briefcase },
    { href: "/available-programs", label: t("programs"), icon: BookOpen },
  ]

  const accountNavItems = [
    { href: "/payment-methods", label: "Payment Methods", icon: CreditCard },
    { href: "/settings", label: t("settings"), icon: Settings },
    { href: "/contact-us", label: "Contact Us", icon: HelpCircle },
  ]

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error) {
      console.error("Error logging out:", error)
      toast({
        title: "Error",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
    const isActive = pathname === href

    if (isMobile) {
      return (
        <Link href={href} className="block">
          <div
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-md",
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
            )}
          >
            <Icon className="mr-3 h-5 w-5" />
            {label}
          </div>
        </Link>
      )
    }

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} className="block">
              <div
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
                )}
              >
                <Icon className={cn("h-5 w-5", open ? "mr-3" : "mx-auto")} />
                {open && <span>{label}</span>}
              </div>
            </Link>
          </TooltipTrigger>
          {!open && <TooltipContent side="right">{label}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    )
  }

  const NavSection = ({ title, items }: { title: string; items: any[] }) => (
    <div className="px-3 py-2">
      {open && <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{title}</h2>}
      <nav className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
    </div>
  )

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="p-0 w-[240px]">
            <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
              <div className="p-4 border-b dark:border-gray-800">
                <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">TalGo</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Interns Level Up. Companies Grow Up.</p>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <NavSection title="MAIN" items={mainNavItems} />
                <NavSection title="INTERNSHIPS" items={internshipsNavItems} />
                <NavSection title="ACCOUNT" items={accountNavItems} />
              </div>

              <div className="p-3 border-t dark:border-gray-800">
                <button
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  {t("logout")}
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "h-screen border-r bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col transition-all duration-300",
        open ? "w-[240px]" : "w-[70px]",
      )}
    >
      <div className={cn("p-4 border-b dark:border-gray-800 flex items-center", !open && "justify-center")}>
        {open ? (
          <>
            <div>
              <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">TalGo</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Interns Level Up. Companies Grow Up.</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleSidebar}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <NavSection title="MAIN" items={mainNavItems} />
        <NavSection title="INTERNSHIPS" items={internshipsNavItems} />
        <NavSection title="ACCOUNT" items={accountNavItems} />
      </div>

      <div className="p-3 border-t dark:border-gray-800">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md",
                  !open && "justify-center px-0",
                )}
                onClick={handleLogout}
              >
                <LogOut className={cn("h-5 w-5", open && "mr-3")} />
                {open && t("logout")}
              </button>
            </TooltipTrigger>
            {!open && <TooltipContent side="right">{t("logout")}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
