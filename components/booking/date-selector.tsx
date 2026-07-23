"use client"

import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"

interface DateSelectorProps {
  selected?: Date
  onSelect: (date?: Date) => void
}

export function DateSelector({ selected, onSelect }: DateSelectorProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="flex justify-center rounded-2xl border border-border bg-card p-3 sm:p-5">
      <Calendar
        mode="single"
        locale={es}
        selected={selected}
        onSelect={onSelect}
        disabled={(date) => {
          const d = new Date(date)
          d.setHours(0, 0, 0, 0)
          // Disable past dates and Sundays (shop closed).
          return d < today || date.getDay() === 0
        }}
        className="[--cell-size:--spacing(11)]"
      />
    </div>
  )
}
