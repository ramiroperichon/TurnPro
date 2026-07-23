import { ServiceCard } from "@/components/cards/service-card"
import { Reveal } from "@/components/motion/reveal"
import { services } from "@/lib/mock-data"

export function ServicesSection() {
  const active = services.filter((s) => s.active)

  return (
    <section id="servicios" className="border-t border-border/60 bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Servicios</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Todo lo que necesitás para verte impecable
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Elegí entre nuestros servicios y reservá en el horario que mejor te quede.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
