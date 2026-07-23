import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { BUSINESS } from "@/lib/mock-data"

const schedule = [
  { day: "Lunes a Viernes", hours: "09:00 – 20:00" },
  { day: "Sábado", hours: "09:00 – 18:00" },
  { day: "Domingo", hours: "Cerrado" },
]

export function HoursLocation() {
  return (
    <section id="horarios" className="py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Horarios</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Estamos abiertos para vos
          </h2>
          <div className="mt-8 flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
            {schedule.map((row) => (
              <div key={row.day} className="flex items-center justify-between px-5 py-4">
                <span className="flex items-center gap-2.5 font-medium">
                  <Clock className="size-4 text-primary" />
                  {row.day}
                </span>
                <span className="text-muted-foreground">{row.hours}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-6 h-11 px-6" render={<Link href="/reservar" />}>
            Reservar turno
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Ubicación</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Cómo encontrarnos
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            <InfoRow icon={MapPin} label="Dirección" value={BUSINESS.address} />
            <InfoRow icon={Phone} label="Teléfono" value={BUSINESS.phone} />
            <InfoRow icon={Mail} label="Email" value={BUSINESS.email} />
          </div>
          <div className="mt-6 flex aspect-[16/10] items-center justify-center rounded-2xl border border-border bg-muted">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              Mapa de ubicación
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
