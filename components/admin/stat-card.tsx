"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  trend?: {
    value: number
    isPositive: boolean
  }
  prefix?: string
}

export function StatCard({ label, value, trend, prefix }: StatCardProps) {
  return (
    <div className="bg-background border border-border p-6">
      <p className="text-[13px] font-sans text-muted-foreground mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="font-serif text-4xl text-foreground">
          {prefix}
          {value}
        </p>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-sans",
              trend.isPositive ? "text-green-600" : "text-destructive"
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  )
}
