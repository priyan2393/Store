"use client"

import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: "mens",
    label: "MENS",
    image: "/images/mens-category.jpg",
    href: "/mens",
  },
  {
    id: "womens",
    label: "WOMENS",
    image: "/images/womens-category.jpg",
    href: "/womens",
  },
]

export function CategoryBanners() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative h-[400px] md:h-[500px] overflow-hidden"
          >
            {/* Background Image */}
            <Image
              src={category.image}
              alt={category.label}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors duration-300" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 lg:p-10">
              <p className="text-[11px] font-sans tracking-[0.25em] text-white/80 mb-2">
                EXPLORE
              </p>
              <h2 className="font-sans text-2xl lg:text-3xl tracking-[0.15em] text-white mb-4">
                {category.label}
              </h2>
              <span className="inline-block text-[13px] font-sans tracking-[0.1em] text-white relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white group-hover:after:w-full after:transition-all after:duration-300">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
