"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function NewsletterBanner() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="bg-foreground py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-3xl text-primary-foreground mb-3">
            Stay in the Loop
          </h2>
          <p className="font-sans text-sm text-primary-foreground/70 mb-8">
            Subscribe for exclusive access to new collections, special offers, and style inspiration.
          </p>

          {isSubmitted ? (
            <p className="font-sans text-sm text-accent">
              Thank you for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 max-w-sm bg-transparent border border-primary-foreground/30 text-primary-foreground text-sm font-sans tracking-wide px-4 py-3 placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "inline-flex items-center justify-center gap-2 bg-primary-foreground text-foreground text-[13px] font-sans tracking-[0.1em] px-6 py-3 hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
                )}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
