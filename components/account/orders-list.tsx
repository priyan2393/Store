"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { OrderCard, Order, OrderStatus } from "@/components/account/order-card"

const filterTabs: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
]

// Demo orders data
const DEMO_ORDERS: Order[] = [
  {
    id: "ORD-2024-1847",
    date: "2024-01-15",
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Linen Blend Relaxed Shirt",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
        price: 3490,
        quantity: 1,
      },
      {
        id: "2",
        name: "Cotton Wide Leg Trousers",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop",
        price: 4290,
        quantity: 1,
      },
    ],
    total: 7780,
  },
  {
    id: "ORD-2024-1902",
    date: "2024-01-22",
    status: "pending",
    items: [
      {
        id: "3",
        name: "Silk Blend Midi Dress",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
        price: 6990,
        quantity: 1,
      },
    ],
    total: 6990,
  },
  {
    id: "ORD-2024-1756",
    date: "2024-01-08",
    status: "delivered",
    items: [
      {
        id: "4",
        name: "Merino Wool Cardigan",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop",
        price: 5490,
        quantity: 1,
      },
      {
        id: "5",
        name: "Cotton Knit Sweater",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop",
        price: 3990,
        quantity: 1,
      },
      {
        id: "6",
        name: "Linen Summer Top",
        image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=200&h=200&fit=crop",
        price: 2490,
        quantity: 1,
      },
    ],
    total: 11970,
  },
  {
    id: "ORD-2024-1634",
    date: "2023-12-28",
    status: "cancelled",
    items: [
      {
        id: "7",
        name: "Tailored Wool Blazer",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop",
        price: 8990,
        quantity: 1,
      },
    ],
    total: 8990,
  },
  {
    id: "ORD-2024-1589",
    date: "2023-12-20",
    status: "delivered",
    items: [
      {
        id: "8",
        name: "Cashmere Blend Scarf",
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200&h=200&fit=crop",
        price: 2990,
        quantity: 2,
      },
      {
        id: "9",
        name: "Leather Belt",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
        price: 1990,
        quantity: 1,
      },
      {
        id: "10",
        name: "Cotton Pocket Square",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop",
        price: 790,
        quantity: 3,
      },
      {
        id: "11",
        name: "Silk Tie",
        image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=200&h=200&fit=crop",
        price: 1490,
        quantity: 1,
      },
      {
        id: "12",
        name: "Cufflinks Set",
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&h=200&fit=crop",
        price: 2490,
        quantity: 1,
      },
    ],
    total: 14330,
  },
]

export function OrdersList() {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all")

  const filteredOrders = DEMO_ORDERS.filter((order) => {
    if (activeFilter === "all") return true
    return order.status === activeFilter
  })

  const handleReorder = (orderId: string) => {
    console.log("Reorder:", orderId)
    // In real app, add items to cart
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-border">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={cn(
              "px-5 py-3 text-sm font-sans transition-colors relative",
              activeFilter === tab.value
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeFilter === tab.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onReorder={handleReorder}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground font-sans">
            No orders found in this category.
          </p>
        </div>
      )}
    </div>
  )
}
