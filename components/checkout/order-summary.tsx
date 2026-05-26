"use client"

import Image from "next/image"

export interface OrderItem {
  id: string
  name: string
  variant: string
  price: number
  quantity: number
  image: string
}

interface OrderSummaryProps {
  items: OrderItem[]
  subtotal: number
  discount: number
  delivery: number
}

function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`
}

export function OrderSummary({
  items,
  subtotal,
  discount,
  delivery,
}: OrderSummaryProps) {
  const total = subtotal - discount + delivery

  return (
    <aside className="bg-muted p-6 lg:p-8 h-fit lg:sticky lg:top-24">
      {/* Heading */}
      <h2 className="font-serif text-xl text-foreground mb-6 tracking-wide">
        Order Summary
      </h2>

      {/* Items */}
      <ul className="space-y-5 mb-6 border-b border-border pb-6">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-4">
            {/* Image */}
            <div className="relative w-16 h-20 shrink-0 bg-background overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              {/* Quantity badge */}
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-primary-foreground text-[10px] font-sans flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-foreground leading-snug truncate">
                {item.name}
              </p>
              <p className="font-sans text-[12px] text-muted-foreground mt-1">
                {item.variant}
              </p>
            </div>

            {/* Price */}
            <p className="font-sans text-sm text-foreground shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      {/* Coupon */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Coupon code"
          className="flex-1 h-11 border border-border bg-background px-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
        />
        <button className="h-11 px-4 border border-foreground text-[12px] font-sans tracking-[0.12em] text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors">
          APPLY
        </button>
      </div>

      {/* Price Rows */}
      <div className="space-y-3 border-t border-border pt-5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-sm text-muted-foreground">Subtotal</span>
          <span className="font-sans text-sm text-foreground">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-muted-foreground">Discount</span>
            <span className="font-sans text-sm text-destructive">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="font-sans text-sm text-muted-foreground">Delivery</span>
          <span className="font-sans text-sm text-foreground">
            {delivery === 0 ? (
              <span className="text-accent">Free</span>
            ) : (
              formatPrice(delivery)
            )}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="font-sans text-[13px] font-medium tracking-wide text-foreground">
            Total
          </span>
          <span className="font-serif text-lg text-foreground">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Policies note */}
      <p className="font-sans text-[11px] text-muted-foreground mt-6 leading-relaxed">
        Taxes included. Delivery estimated 3–5 business days.
      </p>
    </aside>
  )
}
