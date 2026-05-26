import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

const shopLinks = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Mens", href: "/mens" },
  { label: "Womens", href: "/womens" },
  { label: "Sale", href: "/sale" },
  { label: "Gift Cards", href: "/gift-cards" },
]

const helpLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "FAQs", href: "/faqs" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Track Order", href: "/track-order" },
]

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link 
              href="/" 
              className="font-serif text-xl tracking-[0.2em] text-foreground inline-block mb-4"
            >
              STORENAME
            </Link>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">
              Timeless pieces for the modern wardrobe. Crafted with care, designed to last.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-[11px] font-sans tracking-[0.2em] text-foreground mb-4">
              SHOP
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-[11px] font-sans tracking-[0.2em] text-foreground mb-4">
              HELP
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-[11px] font-sans tracking-[0.2em] text-foreground mb-4">
              FOLLOW US
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-sans tracking-[0.1em] text-muted-foreground">
              © 2024 STORENAME. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-[11px] font-sans tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[11px] font-sans tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
