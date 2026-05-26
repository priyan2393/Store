'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductFilters } from '@/components/product-filters'
import { ProductSection } from '@/components/product-section'
import { ProductPagination } from '@/components/product-pagination'

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar activeLink="/shop?category=Mens" />
      <div className="flex-1">
        {/* Header */}
        <section className="bg-background border-b border-border">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">Shop All</h1>
            <p className="text-muted-foreground font-sans text-sm">Browse our complete collection of curated pieces.</p>
          </div>
        </section>

        {/* Shop Layout */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Left Sidebar */}
            <aside className="lg:col-span-1">
              <ProductFilters />
            </aside>

            {/* Products - Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-muted-foreground font-sans">
                  Showing {(currentPage - 1) * itemsPerPage + 1} - {currentPage * itemsPerPage} of 48 products
                </p>
                <select className="text-sm font-sans bg-background border border-border px-3 py-2 rounded hover:border-foreground transition-colors">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Sellers</option>
                </select>
              </div>

              <ProductSection />

              {/* Pagination */}
              <ProductPagination 
                currentPage={currentPage} 
                totalPages={4}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
