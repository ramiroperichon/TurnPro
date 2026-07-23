"use client"

import Image from "next/image"
import { Check, Pencil, Trash2, Scissors } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Barber } from "@/lib/mock-data"

interface EmployeeCardProps {
  barber: Barber
  selectable?: boolean
  selected?: boolean
  onSelect?: (barber: Barber) => void
  admin?: boolean
  onEdit?: (barber: Barber) => void
  onDelete?: (barber: Barber) => void
}

export function EmployeeCard({
  barber,
  selectable,
  selected,
  onSelect,
  admin,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
  const interactive = selectable && !!onSelect

  return (
    <Card
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? () => onSelect?.(barber) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSelect?.(barber)
              }
            }
          : undefined
      }
      className={cn(
        "h-full overflow-hidden pt-0 transition-all",
        interactive &&
          "cursor-pointer hover:border-primary/40 hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        selected && "border-primary ring-2 ring-primary/20",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={barber.photo || "/placeholder.svg"}
          alt={`Retrato de ${barber.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {selected && (
          <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
            <Check className="size-4" />
          </span>
        )}
        {admin && (
          <span className="absolute left-3 top-3">
            <Badge variant={barber.active ? "default" : "secondary"}>
              {barber.active ? "Activo" : "Inactivo"}
            </Badge>
          </span>
        )}
      </div>
      <CardContent className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold leading-tight">{barber.name}</h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Scissors className="size-3.5 text-primary" />
            {barber.specialty}
          </p>
        </div>
        {admin && (
          <>
            <p className="text-xs text-muted-foreground">{barber.services.length} servicios asignados</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.(barber)
                }}
              >
                <Pencil data-icon="inline-start" />
                Editar
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Eliminar ${barber.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.(barber)
                }}
              >
                <Trash2 />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
