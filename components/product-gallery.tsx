"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: {
    src: string
    alt: string
  }[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          fill
          className={cn(
            "object-cover transition-opacity duration-300",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedIndex(index)
              setIsImageLoaded(false)
            }}
            className={cn(
              "relative aspect-square bg-muted overflow-hidden transition-all",
              selectedIndex === index
                ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "hover:opacity-80"
            )}
            aria-label={`View image ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
