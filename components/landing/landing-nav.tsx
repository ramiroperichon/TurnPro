"use client"

import { useState } from "react"
import Link from "next/link"
import { Scissors, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS } from "@/lib/mock-data"

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#barberos", label: "Barberos" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#horarios", label: "Horarios" },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Scissors className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">{BUSINESS.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg" render={<Link href="/login" />}>
            Ingresar
          </Button>
          <Button size="lg" render={<Link href="/reservar" />}>
            Reservar turno
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" size="lg" render={<Link href="/login" />}>
                Ingresar
              </Button>
              <Button size="lg" render={<Link href="/reservar" />}>
                Reservar turno
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
