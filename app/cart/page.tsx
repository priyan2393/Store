'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'

export default function CartPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar activeLink="/cart" cartItemCount={3} />
      <div className="flex-1">
        <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-12">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left */}
            <div className="lg:col-span-2">
              <CartDrawer isOpen={true} />
            </div>

            {/* Order Summary - Right */}
            <div className="h-fit">
              <div className="bg-background border border-border p-8 rounded">
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">$360.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">$10.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-medium">$29.60</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-serif mb-6">
                  <span>Total</span>
                  <span>$399.60</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-foreground text-background font-sans text-sm tracking-wide py-3 mb-3 hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/shop"
                  className="block w-full text-center border border-foreground text-foreground font-sans text-sm tracking-wide py-3 hover:bg-foreground/5 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
