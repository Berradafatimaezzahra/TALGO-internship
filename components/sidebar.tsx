"use client"

import Link from "next/link"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

const Sidebar = () => {
  const pathname = usePathname()

  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/chat", label: "Chat", icon: MessageSquare },
  ]

  const internshipsNavItems = [
    { href: "/my-applications", label: "My Applications", icon: Briefcase },
    { href: "/available-programs", label: "Available Programs", icon: BookOpen },
  ]

  const accountNavItems = [
    { href: "/payment-methods", label: "Payment Methods", icon: CreditCard },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/contact-us", label: "Contact Us", icon: HelpCircle },
  ]

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
    const isActive = pathname === href

    return (
      <Link href={href} className="block">
        <div
          className={cn(
            "flex items-center px-4 py-3 text-sm font-medium rounded-md",
            isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
          )}
        >
          <Icon className="mr-3 h-5 w-5" />
          {label}
        </div>
      </Link>
    )
  }

  return (
    <div className="w-[180px] border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-700">TalGo</h1>
        <p className="text-xs text-gray-500 mt-1">Interns Level Up. Companies Grow Up.</p>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500">MAIN</h2>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500">INTERNSHIPS</h2>
          <nav className="space-y-1">
            {internshipsNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500">ACCOUNT</h2>
          <nav className="space-y-1">
            {accountNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-3 border-t">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 w-full hover:bg-gray-100 rounded-md">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
