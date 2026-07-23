"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookingStepperProps {
  steps: string[]
  current: number // 0-indexed
}

export function BookingStepper({ steps, current }: BookingStepperProps) {
  return (
    <nav aria-label="Progreso de la reserva">
      <ol className="flex items-center">
        {steps.map((label, i) => {
          const completed = i < current
          const active = i === current
          return (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                    completed && "border-primary bg-primary text-primary-foreground",
                    active && "border-primary bg-primary/10 text-primary",
                    !completed && !active && "border-border bg-background text-muted-foreground",
                  )}
                >
                  {completed ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden max-w-24 text-center text-xs font-medium leading-tight sm:block",
                    active || completed ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "mx-2 h-0.5 flex-1 rounded-full transition-colors sm:mb-6",
                    completed ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
