'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductGallery } from '@/components/product-gallery'
import { ProductInfo } from '@/components/product-info'

export default function ProductPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar activeLink="/shop" />
      <div className="flex-1">
        {/* Product Detail */}
        <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <ProductGallery />
            
            {/* Product Info */}
            <ProductInfo />
          </div>
        </section>

        {/* Related Products Section */}
        <section className="bg-background/50 border-t border-border">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16">
            <h2 className="font-serif text-3xl mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="bg-muted aspect-square rounded" />
                  <div>
                    <h3 className="font-sans font-medium text-foreground">Product Name</h3>
                    <p className="text-sm text-muted-foreground">$120.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
