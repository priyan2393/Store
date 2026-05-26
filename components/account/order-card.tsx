"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type OrderStatus = "delivered" | "pending" | "cancelled" | "processing"

export interface OrderItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  items: OrderItem[]
  total: number
}

interface OrderCardProps {
  order: Order
  onReorder?: (orderId: string) => void
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  delivered: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  processing: {
    label: "Processing",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
}

export function OrderCard({ order, onReorder }: OrderCardProps) {
  const status = statusConfig[order.status]
  
  // Format date
  const formattedDate = new Date(order.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="border border-border p-5">
      {/* Header: Order ID + Date | Status */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-sans text-foreground">
            Order #{order.id}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Placed on {formattedDate}
          </p>
        </div>
        <span
          className={cn(
            "px-3 py-1 text-xs font-sans border rounded-sm",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Product Thumbnails */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        {order.items.slice(0, 4).map((item, index) => (
          <div
            key={item.id}
            className="relative w-12 h-12 bg-muted flex-shrink-0"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
            {index === 3 && order.items.length > 4 && (
              <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                <span className="text-xs text-white font-sans">
                  +{order.items.length - 4}
                </span>
              </div>
            )}
          </div>
        ))}
        <div className="ml-auto text-right">
          <p className="text-xs text-muted-foreground">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </p>
          <p className="text-sm font-sans text-foreground mt-0.5">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 h-9 text-xs font-sans rounded-none border-border hover:bg-muted"
        >
          <Link href={`/account/orders/${order.id}`}>
            View Details
          </Link>
        </Button>
        {order.status === "delivered" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReorder?.(order.id)}
            className="flex-1 h-9 text-xs font-sans rounded-none hover:bg-muted"
          >
            Reorder
          </Button>
        )}
      </div>
    </div>
  )
}
