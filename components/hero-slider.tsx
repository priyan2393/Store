"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    label: "NEW COLLECTION",
    heading: "Effortless Style, Defined.",
    subtext: "Discover timeless pieces crafted for the modern wardrobe. Clean lines, premium fabrics, understated elegance.",
    cta: "Shop Now",
    href: "/new-arrivals",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    label: "SUMMER 2024",
    heading: "The Art of Simplicity",
    subtext: "Curated essentials that transcend seasons. Minimal design, maximum impact.",
    cta: "Explore Collection",
    href: "/collections/summer",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/40" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8">
              <div className="max-w-xl">
                <p 
                  className={cn(
                    "text-[11px] font-sans tracking-[0.25em] text-accent mb-4 transition-all duration-700 delay-100",
                    index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {slide.label}
                </p>
                <h1 
                  className={cn(
                    "font-serif text-4xl md:text-5xl lg:text-[56px] text-white leading-tight mb-4 text-balance transition-all duration-700 delay-200",
                    index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {slide.heading}
                </h1>
                <p 
                  className={cn(
                    "font-sans text-sm lg:text-base text-white/80 leading-relaxed mb-8 max-w-md transition-all duration-700 delay-300",
                    index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {slide.subtext}
                </p>
                <Link
                  href={slide.href}
                  className={cn(
                    "inline-block text-[13px] font-sans tracking-[0.15em] text-white border border-white px-8 py-3 hover:bg-white hover:text-foreground transition-all duration-300 delay-400",
                    index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide()
          setIsAutoPlaying(false)
        }}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1} />
      </button>
      <button
        onClick={() => {
          nextSlide()
          setIsAutoPlaying(false)
        }}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
