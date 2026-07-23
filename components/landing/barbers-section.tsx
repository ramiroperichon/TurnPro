import { EmployeeCard } from "@/components/cards/employee-card"
import { Reveal } from "@/components/motion/reveal"
import { barbers } from "@/lib/mock-data"

export function BarbersSection() {
  const active = barbers.filter((b) => b.active)

  return (
    <section id="barberos" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Nuestro equipo</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Barberos que dominan su oficio
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Profesionales con años de experiencia listos para atenderte.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((barber, i) => (
            <Reveal key={barber.id} delay={i * 0.05}>
              <EmployeeCard barber={barber} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
