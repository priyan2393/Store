"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Lock, 
  LogOut 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AccountSidebarProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

const navItems = [
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Saved Addresses", icon: MapPin },
  { href: "/account/password", label: "Change Password", icon: Lock },
]

export function AccountSidebar({ 
  user = { 
    name: "Priya Sharma", 
    email: "priya.sharma@email.com" 
  } 
}: AccountSidebarProps) {
  const pathname = usePathname()

  // Get initials from name
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <aside className="w-60 flex-shrink-0">
      <div className="sticky top-8">
        {/* User Info */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-border">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <span className="font-serif text-lg text-foreground">
                {initials}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="font-serif text-lg text-foreground truncate">
              {user.name}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-sans transition-colors relative",
                  isActive
                    ? "text-foreground bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent" />
                )}
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="mt-8 pt-6 border-t border-border">
          <button
            className="flex items-center gap-3 px-4 py-3 text-sm font-sans text-destructive/80 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
