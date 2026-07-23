"use client"

import { Clock, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, type Service } from "@/lib/mock-data"

interface ServiceCardProps {
  service: Service
  selectable?: boolean
  selected?: boolean
  onSelect?: (service: Service) => void
}

export function ServiceCard({ service, selectable, selected, onSelect }: ServiceCardProps) {
  const interactive = selectable && !!onSelect

  return (
    <Card
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? () => onSelect?.(service) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSelect?.(service)
              }
            }
          : undefined
      }
      className={cn(
        "relative h-full transition-all",
        interactive &&
          "cursor-pointer hover:border-primary/40 hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        selected && "border-primary ring-2 ring-primary/20",
      )}
    >
      <CardContent className="flex h-full flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-tight">{service.name}</h3>
          {selected && (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3.5" />
            </span>
          )}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" />
            {service.duration} min
          </span>
          <span className="text-lg font-semibold text-primary">{formatCurrency(service.price)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
