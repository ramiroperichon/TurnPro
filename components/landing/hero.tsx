"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { CalendarCheck, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS } from "@/lib/mock-data"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Star className="size-3.5 text-primary" />
            {BUSINESS.tagline}
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Tu mejor versión empieza en la silla de {BUSINESS.name}
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {BUSINESS.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-11 px-6 text-base" render={<Link href="/reservar" />}>
              <CalendarCheck data-icon="inline-start" />
              Reservar turno
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-6 text-base"
              render={<a href="#servicios" />}
            >
              Ver servicios
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              {BUSINESS.hours}
            </span>
            <span className="hidden items-center gap-2 sm:flex">
              <Star className="size-4 text-primary" />
              4.9 · 320 reseñas
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/hero-barbershop.png"
              alt="Interior de la barbería Fade & Co. con un barbero atendiendo a un cliente"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
            <p className="text-2xl font-semibold">+2.500</p>
            <p className="text-sm text-muted-foreground">turnos reservados</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
