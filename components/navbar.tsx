"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/shop?category=Mens", label: "MENS" },
  { href: "/shop?category=Womens", label: "WOMENS" },
  { href: "/shop?sale=true", label: "SALE" },
  { href: "/shop", label: "NEW ARRIVALS" },
]

interface NavbarProps {
  cartItemCount?: number
  activeLink?: string
}

export function Navbar({ cartItemCount = 3, activeLink = "/womens" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden lg:block h-16 bg-background border-b border-border">
        <nav className="h-full max-w-[1440px] mx-auto px-8 flex items-center justify-between">
          {/* Logo - Left */}
          <Link 
            href="/" 
            className="font-serif text-xl tracking-[0.2em] text-foreground hover:opacity-70 transition-opacity"
          >
            STORENAME
          </Link>

          {/* Navigation Links - Center */}
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-[13px] font-sans tracking-[0.15em] text-foreground transition-all duration-200 hover:text-muted-foreground pb-1",
                    activeLink === link.href && "border-b-[1.5px] border-accent"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons - Right */}
          <div className="flex items-center gap-6">
            <button 
              aria-label="Search"
              className="text-foreground hover:text-muted-foreground transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link 
              href="/wishlist" 
              aria-label="Wishlist"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link 
              href="/cart" 
              aria-label="Cart"
              className="relative text-foreground hover:text-muted-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-sans flex items-center justify-center rounded-full">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
            <Link 
              href="/account" 
              aria-label="Account"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Navbar */}
      <header className="lg:hidden h-16 bg-background border-b border-border">
        <nav className="h-full px-4 flex items-center justify-between">
          {/* Hamburger - Left */}
          <button 
            aria-label="Open menu"
            className="text-foreground hover:text-muted-foreground transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Logo - Center */}
          <Link 
            href="/" 
            className="font-serif text-lg tracking-[0.2em] text-foreground absolute left-1/2 -translate-x-1/2"
          >
            STORENAME
          </Link>

          {/* Icons - Right */}
          <div className="flex items-center gap-4">
            <button 
              aria-label="Search"
              className="text-foreground hover:text-muted-foreground transition-colors p-1"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link 
              href="/cart" 
              aria-label="Cart"
              className="relative text-foreground hover:text-muted-foreground transition-colors p-1"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-sans flex items-center justify-center rounded-full">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 z-40 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-background z-50 lg:hidden transition-transform duration-300 ease-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <span className="font-serif text-lg tracking-[0.2em]">MENU</span>
          <button 
            aria-label="Close menu"
            className="text-foreground hover:text-muted-foreground transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block text-[13px] font-sans tracking-[0.15em] text-foreground py-2 transition-colors hover:text-muted-foreground",
                    activeLink === link.href && "text-accent"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-border space-y-4">
            <Link 
              href="/wishlist" 
              className="flex items-center gap-3 text-[13px] font-sans tracking-[0.15em] text-foreground py-2 hover:text-muted-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
              WISHLIST
            </Link>
            <Link 
              href="/account" 
              className="flex items-center gap-3 text-[13px] font-sans tracking-[0.15em] text-foreground py-2 hover:text-muted-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
              ACCOUNT
            </Link>
          </div>
        </nav>
      </div>

      {/* Search Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 z-40 transition-opacity duration-300",
          isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Modal */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 bg-background z-50 transition-transform duration-300 ease-out border-b border-border",
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <form onSubmit={handleSearchSubmit} className="max-w-[1440px] mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 bg-transparent text-foreground text-sm font-sans tracking-wide placeholder:text-muted-foreground focus:outline-none"
            />
            <button 
              type="button"
              aria-label="Close search"
              className="text-foreground hover:text-muted-foreground transition-colors p-1"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
