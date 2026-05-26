"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, Check, ShoppingBag } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items?: CartItem[]
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemoveItem?: (id: string) => void
}

// Demo cart items
const demoItems: CartItem[] = [
  {
    id: "1",
    name: "Linen Blend Relaxed Shirt",
    price: 3490,
    quantity: 1,
    size: "M",
    color: "Off White",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Cotton Wide Leg Trousers",
    price: 4290,
    quantity: 2,
    size: "S",
    color: "Black",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop",
  },
]

export function CartDrawer({
  open,
  onOpenChange,
  items = demoItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponDiscount, setCouponDiscount] = useState(0)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedCoupon ? subtotal * (couponDiscount / 100) : 0
  const total = subtotal - discount

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SUMMER20") {
      setAppliedCoupon("SUMMER20")
      setCouponDiscount(20)
      setCouponCode("")
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponDiscount(0)
  }

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta)
      onUpdateQuantity?.(id, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`
  }

  const isEmpty = items.length === 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 bg-background flex flex-col [&>button]:hidden"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-sans text-sm tracking-[0.15em] uppercase font-normal">
              Your Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </SheetTitle>
            <SheetClose asChild>
              <button
                className="text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        {isEmpty ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" strokeWidth={1} />
            </div>
            <p className="font-serif text-xl text-foreground mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mb-8 text-center">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <SheetClose asChild>
              <Link href="/shop">
                <Button
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-sans text-xs tracking-[0.15em] uppercase"
                >
                  Shop Now
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <div className="py-4">
                {items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4 py-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="font-sans text-sm font-medium text-foreground truncate pr-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Size: {item.size} / Color: {item.color}
                          </p>
                          <p className="text-sm text-foreground mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" strokeWidth={1.5} />
                            </button>
                            <span className="w-8 h-7 flex items-center justify-center text-xs font-sans border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" strokeWidth={1.5} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => onRemoveItem?.(item.id)}
                            className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && <Separator className="bg-border" />}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer Section */}
            <div className="flex-shrink-0 border-t border-border">
              {/* Coupon Section */}
              <div className="px-6 py-4 border-b border-border">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                      <span className="text-sm text-foreground">
                        {appliedCoupon} applied — {couponDiscount}% off
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="h-10 flex-1 rounded-none border-border text-sm font-sans placeholder:text-muted-foreground focus-visible:ring-accent"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      className="h-10 px-4 rounded-none border-border text-xs tracking-[0.1em] uppercase hover:bg-muted"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="px-6 py-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-accent">Discount ({couponDiscount}%)</span>
                    <span className="text-accent">-{formatPrice(discount)}</span>
                  </div>
                )}
                <Separator className="my-2 bg-border" />
                <div className="flex justify-between">
                  <span className="font-sans text-base font-medium text-foreground">Total</span>
                  <span className="font-sans text-lg font-medium text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="px-6 pb-6">
                <Button
                  className="w-full h-[52px] bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-sans text-xs tracking-[0.15em] uppercase"
                >
                  Checkout
                </Button>
                <SheetClose asChild>
                  <button className="w-full mt-3 text-center text-sm text-muted-foreground hover:text-foreground underline transition-colors">
                    Continue Shopping
                  </button>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

// Demo component to showcase both states
export function CartDrawerDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [showEmpty, setShowEmpty] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>(demoItems)

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className="p-8 space-y-4">
      <h2 className="font-serif text-2xl text-foreground mb-6">Cart Drawer Demo</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            setShowEmpty(false)
            setCartItems(demoItems)
            setIsOpen(true)
          }}
          className="rounded-none bg-primary text-primary-foreground"
        >
          Open Cart (With Items)
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setShowEmpty(true)
            setIsOpen(true)
          }}
          className="rounded-none border-border"
        >
          Open Empty Cart
        </Button>
      </div>

      <CartDrawer
        open={isOpen}
        onOpenChange={setIsOpen}
        items={showEmpty ? [] : cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}
