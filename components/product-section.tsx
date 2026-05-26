import Link from "next/link"
import { ProductCard } from "./product-card"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  href: string
}

interface ProductSectionProps {
  title: string
  viewAllHref: string
  products: Product[]
  variant?: "default" | "muted"
}

export function ProductSection({
  title,
  viewAllHref,
  products,
  variant = "default",
}: ProductSectionProps) {
  return (
    <section
      className={cn(
        "py-16 lg:py-24",
        variant === "muted" && "bg-muted"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif text-2xl lg:text-4xl text-foreground">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="text-[13px] font-sans tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
          >
            View All
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
