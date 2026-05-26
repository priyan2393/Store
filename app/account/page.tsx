'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AccountSidebar } from '@/components/account/account-sidebar'
import { OrdersList } from '@/components/account/orders-list'
import { LogOut } from 'lucide-react'

export default function AccountPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar activeLink="/account" cartItemCount={3} />
      <div className="flex-1">
        <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-12">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <AccountSidebar />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-background border border-border rounded p-8">
                {/* Account Header */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h2 className="font-serif text-2xl mb-2">Welcome back, Sarah!</h2>
                  <p className="text-sm text-muted-foreground font-sans">Member since March 2024</p>
                </div>

                {/* Account Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="font-sans font-medium text-sm tracking-wide mb-4 text-foreground">Contact Information</h3>
                    <p className="font-sans text-sm text-muted-foreground mb-2">sarah.anderson@email.com</p>
                    <p className="font-sans text-sm text-muted-foreground">(555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-sm tracking-wide mb-4 text-foreground">Default Address</h3>
                    <p className="font-sans text-sm text-muted-foreground mb-1">123 Main Street</p>
                    <p className="font-sans text-sm text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>

                {/* Orders Section */}
                <div>
                  <h3 className="font-serif text-xl mb-6">Recent Orders</h3>
                  <OrdersList />
                </div>

                {/* Logout Button */}
                <div className="mt-12 pt-8 border-t border-border">
                  <button className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
