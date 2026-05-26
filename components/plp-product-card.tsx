"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProductColor {
  name: string
  hex: string
}

interface PLPProductCardProps {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  colors: ProductColor[]
  href: string
}

export function PLPProductCard({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  hoverImage,
  colors,
  href,
}: PLPProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <article className="group">
      <Link 
        href={href} 
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-muted overflow-hidden mb-4">
          {/* Primary Image */}
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              isHovered && hoverImage ? "opacity-0" : "opacity-100"
            )}
          />
          
          {/* Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${name} - alternate view`}
              fill
              className={cn(
                "object-cover transition-opacity duration-500 absolute inset-0",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 p-2 transition-all duration-300 bg-background/80 backdrop-blur-sm",
              "opacity-0 group-hover:opacity-100",
              isWishlisted && "opacity-100"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isWishlisted 
                  ? "fill-accent text-accent" 
                  : "text-foreground hover:text-accent"
              )}
              strokeWidth={1.5}
            />
          </button>

          {/* Sale Badge */}
          {originalPrice && (
            <span className="absolute top-3 left-3 text-[10px] font-sans tracking-[0.1em] text-white bg-foreground px-2 py-1">
              SALE
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-[11px] font-sans tracking-[0.15em] text-muted-foreground uppercase">
            {category}
          </p>
          <h3 className="font-sans text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-sans text-sm text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="font-sans text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Color Dots */}
          {colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {colors.map((color) => (
                <span
                  key={color.name}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
