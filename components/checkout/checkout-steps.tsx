"use client"

import { cn } from "@/lib/utils"

interface Step {
  number: number
  label: string
}

const STEPS: Step[] = [
  { number: 1, label: "Address" },
  { number: 2, label: "Payment" },
  { number: 3, label: "Review" },
]

interface CheckoutStepsProps {
  currentStep: number
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <nav aria-label="Checkout steps" className="flex items-center gap-0 mb-10">
      {STEPS.map((step, index) => {
        const isActive = step.number === currentStep
        const isCompleted = step.number < currentStep

        return (
          <div key={step.number} className="flex items-center">
            {/* Step */}
            <div className="flex items-center gap-2.5">
              {/* Number circle */}
              <span
                className={cn(
                  "w-6 h-6 flex items-center justify-center text-[11px] font-sans tracking-wide border transition-colors",
                  isActive
                    ? "bg-foreground text-primary-foreground border-foreground"
                    : isCompleted
                    ? "bg-foreground text-primary-foreground border-foreground"
                    : "bg-transparent text-muted-foreground border-border"
                )}
              >
                {step.number}
              </span>
              {/* Label */}
              <span
                className={cn(
                  "text-[12px] font-sans tracking-[0.12em] uppercase transition-colors",
                  isActive
                    ? "text-foreground"
                    : isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Separator */}
            {index < STEPS.length - 1 && (
              <span className="mx-4 w-8 h-px bg-border shrink-0" aria-hidden="true" />
            )}
          </div>
        )
      })}
    </nav>
  )
}
