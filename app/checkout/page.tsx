'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CheckoutSteps } from '@/components/checkout/checkout-steps'
import { AddressForm } from '@/components/checkout/address-form'
import { OrderSummary } from '@/components/checkout/order-summary'

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar activeLink="/checkout" cartItemCount={3} />
      <div className="flex-1">
        <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-12">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="mb-12">
            <CheckoutSteps currentStep={currentStep} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form - Left */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                    <AddressForm />
                  </div>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-foreground text-background font-sans text-sm tracking-wide py-3 hover:opacity-90 transition-opacity mt-6"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-border rounded cursor-pointer hover:bg-background/50">
                        <input type="radio" name="payment" defaultChecked className="mr-3" />
                        <span className="font-sans text-sm">Credit Card</span>
                      </label>
                      <label className="flex items-center p-4 border border-border rounded cursor-pointer hover:bg-background/50">
                        <input type="radio" name="payment" className="mr-3" />
                        <span className="font-sans text-sm">Debit Card</span>
                      </label>
                      <label className="flex items-center p-4 border border-border rounded cursor-pointer hover:bg-background/50">
                        <input type="radio" name="payment" className="mr-3" />
                        <span className="font-sans text-sm">PayPal</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border border-foreground text-foreground font-sans text-sm tracking-wide py-3 hover:bg-foreground/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-foreground text-background font-sans text-sm tracking-wide py-3 hover:opacity-90 transition-opacity"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl mb-6">Order Review</h2>
                    <div className="border border-border rounded p-6">
                      <p className="font-sans text-sm text-muted-foreground mb-4">
                        Please review your order details before placing your order.
                      </p>
                      <div className="space-y-3">
                        <p className="font-sans text-sm"><strong>Shipping:</strong> 123 Main St, City, ST 12345</p>
                        <p className="font-sans text-sm"><strong>Payment:</strong> Credit Card ending in 4242</p>
                        <p className="font-sans text-sm"><strong>Items:</strong> 3 items (Subtotal: $360.00)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 border border-foreground text-foreground font-sans text-sm tracking-wide py-3 hover:bg-foreground/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      className="flex-1 bg-foreground text-background font-sans text-sm tracking-wide py-3 hover:opacity-90 transition-opacity"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary - Right */}
            <div className="h-fit">
              <OrderSummary />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
