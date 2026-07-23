import { CalendarDays, Scissors, UserCheck, CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"

const steps = [
  {
    icon: Scissors,
    title: "Elegí tu servicio",
    description: "Corte, barba o el combo completo. Vos decidís qué necesitás.",
  },
  {
    icon: UserCheck,
    title: "Seleccioná tu barbero",
    description: "Reservá con tu barbero de confianza o probá uno nuevo.",
  },
  {
    icon: CalendarDays,
    title: "Elegí fecha y hora",
    description: "Mirá la disponibilidad en tiempo real y elegí tu turno.",
  },
  {
    icon: CheckCircle2,
    title: "Confirmá y listo",
    description: "Recibí la confirmación al instante. Sin llamados ni esperas.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t border-border/60 bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Cómo funciona</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Reservá en 4 pasos simples
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
