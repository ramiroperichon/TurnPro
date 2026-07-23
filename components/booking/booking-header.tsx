import Link from "next/link"
import { Scissors, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS } from "@/lib/mock-data"

export function BookingHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Scissors className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">{BUSINESS.name}</span>
        </Link>
        <Button variant="ghost" size="sm" render={<Link href="/" />}>
          <ArrowLeft data-icon="inline-start" />
          Volver
        </Button>
      </div>
    </header>
  )
}
