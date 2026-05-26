"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductColor {
  name: string
  value: string
}

interface ProductInfoProps {
  breadcrumb: {
    category: string
    subcategory: string
    categoryHref: string
    subcategoryHref: string
  }
  name: string
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  description: string
  colors: ProductColor[]
  sizes: string[]
  stockCount?: number
}

export function ProductInfo({
  breadcrumb,
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
  description,
  colors,
  sizes,
  stockCount,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) return
    setIsAddingToCart(true)
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
          <li>
            <Link 
              href={breadcrumb.categoryHref} 
              className="hover:text-foreground transition-colors"
            >
              {breadcrumb.category}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link 
              href={breadcrumb.subcategoryHref}
              className="hover:text-foreground transition-colors"
            >
              {breadcrumb.subcategory}
            </Link>
          </li>
        </ol>
      </nav>

      {/* Product Name */}
      <h1 className="font-serif text-4xl leading-tight text-foreground">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < rating 
                  ? "fill-accent text-accent" 
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>
        <Link 
          href="#reviews" 
          className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors"
        >
          ({reviewCount} reviews)
        </Link>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        {originalPrice ? (
          <>
            <span className="font-sans text-xl text-destructive">
              ${price.toFixed(2)}
            </span>
            <span className="font-sans text-lg text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="font-sans text-xl text-foreground">
            ${price.toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="border-t border-border" />

      {/* Color Selector */}
      <div className="space-y-3">
        <label className="text-xs font-sans tracking-[0.1em] uppercase text-foreground">
          Color — {selectedColor.name}
        </label>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "w-7 h-7 rounded-full transition-all",
                selectedColor.name === color.name
                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                  : "hover:ring-1 hover:ring-border hover:ring-offset-1"
              )}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
              aria-pressed={selectedColor.name === color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="space-y-3">
        <label className="text-xs font-sans tracking-[0.1em] uppercase text-foreground">
          Size
        </label>
        <div className="flex items-center gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "min-w-[44px] h-[44px] px-3 font-sans text-sm transition-all",
                selectedSize === size
                  ? "bg-foreground text-background"
                  : "border border-border text-foreground hover:border-foreground"
              )}
              aria-label={`Select size ${size}`}
              aria-pressed={selectedSize === size}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Indicator */}
      {stockCount && stockCount <= 5 && (
        <p className="font-sans text-sm text-accent">
          Only {stockCount} left
        </p>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || isAddingToCart}
        className={cn(
          "w-full h-12 bg-foreground text-background font-sans text-sm tracking-[0.1em] uppercase transition-all",
          "hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed",
          isAddingToCart && "animate-pulse"
        )}
      >
        {isAddingToCart ? "Adding..." : selectedSize ? "Add to Cart" : "Select a Size"}
      </button>

      {/* Wishlist Link */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="flex items-center justify-center gap-2 w-full py-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Heart
          className={cn(
            "w-4 h-4",
            isWishlisted ? "fill-accent text-accent" : ""
          )}
        />
        <span>{isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}</span>
      </button>

      <div className="border-t border-border" />

      {/* Accordion Tabs */}
      <Accordion type="single" collapsible defaultValue="description" className="w-full">
        <AccordionItem value="description" className="border-border">
          <AccordionTrigger className="text-sm font-sans tracking-[0.05em] uppercase hover:no-underline">
            Description
          </AccordionTrigger>
          <AccordionContent className="text-sm font-sans text-muted-foreground leading-relaxed">
            <p className="mb-4">
              Crafted from the finest silk, this elegant blouse embodies timeless sophistication. 
              The relaxed silhouette drapes beautifully, while subtle details like mother-of-pearl 
              buttons and French seams speak to the exceptional craftsmanship.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>100% Mulberry Silk</li>
              <li>Relaxed fit</li>
              <li>Mother-of-pearl buttons</li>
              <li>French seam construction</li>
              <li>Made in Portugal</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size-guide" className="border-border">
          <AccordionTrigger className="text-sm font-sans tracking-[0.05em] uppercase hover:no-underline">
            Size Guide
          </AccordionTrigger>
          <AccordionContent className="text-sm font-sans text-muted-foreground">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-medium text-foreground">Size</th>
                    <th className="py-2 pr-4 font-medium text-foreground">Bust</th>
                    <th className="py-2 pr-4 font-medium text-foreground">Waist</th>
                    <th className="py-2 font-medium text-foreground">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">XS</td>
                    <td className="py-2 pr-4">32&quot;</td>
                    <td className="py-2 pr-4">24&quot;</td>
                    <td className="py-2">34&quot;</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">S</td>
                    <td className="py-2 pr-4">34&quot;</td>
                    <td className="py-2 pr-4">26&quot;</td>
                    <td className="py-2">36&quot;</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">M</td>
                    <td className="py-2 pr-4">36&quot;</td>
                    <td className="py-2 pr-4">28&quot;</td>
                    <td className="py-2">38&quot;</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">L</td>
                    <td className="py-2 pr-4">38&quot;</td>
                    <td className="py-2 pr-4">30&quot;</td>
                    <td className="py-2">40&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">XL</td>
                    <td className="py-2 pr-4">40&quot;</td>
                    <td className="py-2 pr-4">32&quot;</td>
                    <td className="py-2">42&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="care" className="border-border">
          <AccordionTrigger className="text-sm font-sans tracking-[0.05em] uppercase hover:no-underline">
            Care Instructions
          </AccordionTrigger>
          <AccordionContent className="text-sm font-sans text-muted-foreground">
            <ul className="space-y-2">
              <li>Dry clean recommended</li>
              <li>If hand washing, use cold water and mild detergent</li>
              <li>Do not bleach</li>
              <li>Iron on low heat, inside out</li>
              <li>Store on padded hanger to maintain shape</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
