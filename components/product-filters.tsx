"use client"

import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

export interface FilterState {
  category: string | null
  sizes: string[]
  colors: string[]
  priceRange: [number, number]
}

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  minPrice?: number
  maxPrice?: number
}

const SIZES = ["XS", "S", "M", "L", "XL"]

const COLORS = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Beige", hex: "#D4C5B5" },
  { name: "Navy", hex: "#1E3A5F" },
  { name: "Olive", hex: "#606B4A" },
]

export function ProductFilters({
  filters,
  onFiltersChange,
  minPrice = 0,
  maxPrice = 500,
}: ProductFiltersProps) {
  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? null : category,
    })
  }

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    onFiltersChange({ ...filters, sizes: newSizes })
  }

  const handleColorToggle = (colorName: string) => {
    const newColors = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName]
    onFiltersChange({ ...filters, colors: newColors })
  }

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: null,
      sizes: [],
      colors: [],
      priceRange: [minPrice, maxPrice],
    })
  }

  const hasActiveFilters =
    filters.category !== null ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] !== minPrice ||
    filters.priceRange[1] !== maxPrice

  return (
    <aside className="w-[260px] flex-shrink-0">
      <div className="sticky top-24">
        <h2 className="text-[11px] font-sans tracking-[0.2em] text-foreground uppercase mb-8">
          Filters
        </h2>

        {/* Category Filter */}
        <div className="pb-6 border-b border-border">
          <h3 className="text-[11px] font-sans tracking-[0.15em] text-muted-foreground uppercase mb-4">
            Category
          </h3>
          <div className="space-y-3">
            {["Mens", "Womens"].map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span
                  className={cn(
                    "w-4 h-4 rounded-full border border-border flex items-center justify-center transition-colors",
                    filters.category === category && "border-foreground"
                  )}
                >
                  {filters.category === category && (
                    <span className="w-2 h-2 rounded-full bg-foreground" />
                  )}
                </span>
                <span className="text-sm font-sans text-foreground group-hover:text-muted-foreground transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="py-6 border-b border-border">
          <h3 className="text-[11px] font-sans tracking-[0.15em] text-muted-foreground uppercase mb-4">
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={cn(
                  "px-3 py-1.5 text-xs font-sans tracking-wide border transition-colors",
                  filters.sizes.includes(size)
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="py-6 border-b border-border">
          <h3 className="text-[11px] font-sans tracking-[0.15em] text-muted-foreground uppercase mb-4">
            Color
          </h3>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={cn(
                  "w-7 h-7 rounded-full transition-all",
                  color.hex === "#FFFFFF" && "border border-border",
                  filters.colors.includes(color.name)
                    ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    : "hover:scale-110"
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Filter by ${color.name}`}
              />
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="py-6 border-b border-border">
          <h3 className="text-[11px] font-sans tracking-[0.15em] text-muted-foreground uppercase mb-4">
            Price Range
          </h3>
          <div className="px-1">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              min={minPrice}
              max={maxPrice}
              step={10}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm font-sans text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="mt-6 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  )
}

/* Active Filter Chips */
interface ActiveFiltersProps {
  filters: FilterState
  onRemoveFilter: (type: "category" | "size" | "color", value: string) => void
}

export function ActiveFilters({ filters, onRemoveFilter }: ActiveFiltersProps) {
  const activeFilters: { type: "category" | "size" | "color"; value: string }[] = []

  if (filters.category) {
    activeFilters.push({ type: "category", value: filters.category })
  }
  filters.sizes.forEach((size) => {
    activeFilters.push({ type: "size", value: size })
  })
  filters.colors.forEach((color) => {
    activeFilters.push({ type: "color", value: color })
  })

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {activeFilters.map((filter) => (
        <button
          key={`${filter.type}-${filter.value}`}
          onClick={() => onRemoveFilter(filter.type, filter.value)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans tracking-wide bg-muted text-foreground border border-border hover:bg-border transition-colors"
        >
          <span>
            {filter.type === "size" ? `Size: ${filter.value}` : filter.value}
          </span>
          <X className="w-3 h-3" />
        </button>
      ))}
    </div>
  )
}
