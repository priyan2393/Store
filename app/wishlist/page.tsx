'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Heart, ShoppingBag } from 'lucide-react'

export default function WishlistPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar activeLink="/wishlist" cartItemCount={3} />
      <div className="flex-1">
        <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-12">My Wishlist</h1>
          
          {/* Wishlist Items */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-sans">5 items in your wishlist</p>
              <button className="text-sm font-sans text-accent hover:text-accent/80 transition-colors">
                Sort by: Recently Added
              </button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="group">
                  <div className="relative mb-4 bg-muted aspect-square rounded overflow-hidden">
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-foreground/20 group-hover:text-foreground/40 transition-colors" />
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-background rounded-full shadow hover:shadow-lg transition-shadow">
                      <Heart className="w-5 h-5 text-accent fill-accent" strokeWidth={1.5} />
                    </button>
                  </div>
                  <h3 className="font-sans font-medium text-foreground text-sm mb-1">Product Name {i}</h3>
                  <p className="font-sans text-sm text-muted-foreground mb-4">$120.00</p>
                  <button className="w-full border border-foreground text-foreground font-sans text-xs tracking-wide py-2 hover:bg-foreground hover:text-background transition-colors">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <Link
                href="/shop"
                className="inline-block text-sm font-sans tracking-wide text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
