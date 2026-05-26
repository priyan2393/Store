"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Ticket,
  FolderTree,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/coupons", label: "Coupons", icon: Ticket },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

interface AdminSidebarProps {
  adminName?: string
  adminEmail?: string
}

export function AdminSidebar({
  adminName = "Admin User",
  adminEmail = "admin@aurelia.com",
}: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 bg-foreground flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-white/10">
        <Link href="/admin" className="font-serif text-xl text-white tracking-wide">
          AURELIA
        </Link>
        <span className="ml-2 text-[10px] font-sans uppercase tracking-widest text-white/50">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-sans transition-colors rounded-sm",
                    active
                      ? "bg-white text-foreground"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Admin Profile */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-sm font-medium text-foreground">
            {adminName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans text-white truncate">{adminName}</p>
            <p className="text-xs font-sans text-white/50 truncate">{adminEmail}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-sans text-white/60 hover:text-destructive hover:bg-white/5 rounded-sm transition-colors">
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Logout
        </button>
      </div>
    </aside>
  )
}
