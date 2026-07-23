"use client"

import { cn } from "@/lib/utils"

interface TimeSlotProps {
  time: string
  disabled?: boolean
  selected?: boolean
  onSelect?: (time: string) => void
}

export function TimeSlot({ time, disabled, selected, onSelect }: TimeSlotProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onSelect?.(time)}
      className={cn(
        "flex h-11 items-center justify-center rounded-xl border text-sm font-medium transition-all outline-none",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        disabled &&
          "cursor-not-allowed border-border bg-muted text-muted-foreground/50 line-through",
        !disabled && !selected && "border-border bg-background hover:border-primary/40 hover:bg-accent",
        selected && "border-primary bg-primary text-primary-foreground shadow-sm",
      )}
    >
      {time}
    </button>
  )
}
