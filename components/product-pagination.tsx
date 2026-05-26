"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push("ellipsis")
      }
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis")
      }
      
      pages.push(totalPages)
    }
    
    return pages
  }

  const pages = getPageNumbers()

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-12"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 text-foreground transition-colors",
          currentPage === 1
            ? "opacity-30 cursor-not-allowed"
            : "hover:text-muted-foreground"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm font-sans text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "min-w-[40px] py-2 text-sm font-sans transition-colors",
                currentPage === page
                  ? "text-foreground border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 text-foreground transition-colors",
          currentPage === totalPages
            ? "opacity-30 cursor-not-allowed"
            : "hover:text-muted-foreground"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>
    </nav>
  )
}
