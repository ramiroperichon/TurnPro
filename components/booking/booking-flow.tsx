"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Clock,
  Scissors,
  UserCheck,
  CalendarDays,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { ServiceCard } from "@/components/cards/service-card"
import { EmployeeCard } from "@/components/cards/employee-card"
import { BookingStepper } from "@/components/booking/booking-stepper"
import { TimeSlot } from "@/components/booking/time-slot"
import { DateSelector } from "@/components/booking/date-selector"
import {
  services,
  barbers,
  generateTimeSlots,
  bookedSlots,
  formatCurrency,
  type Service,
  type Barber,
} from "@/lib/mock-data"

const STEPS = ["Servicio", "Barbero", "Fecha", "Horario", "Tus datos"]

export function BookingFlow() {
  const [step, setStep] = useState(0)
  const [service, setService] = useState<Service | null>(null)
  const [barber, setBarber] = useState<Barber | null>(null)
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState<string | null>(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "" })
  const [confirmed, setConfirmed] = useState(false)

  const availableBarbers = useMemo(
    () => barbers.filter((b) => b.active && (!service || b.services.includes(service.id))),
    [service],
  )

  const slots = useMemo(() => generateTimeSlots("09:00", "20:00", 30), [])
  const taken = bookedSlots.default

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return !!service
      case 1:
        return !!barber
      case 2:
        return !!date
      case 3:
        return !!time
      case 4:
        return form.firstName.trim() && form.lastName.trim() && form.phone.trim()
      default:
        return false
    }
  }, [step, service, barber, date, time, form])

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1)
    else setConfirmed(true)
  }
  function back() {
    if (step > 0) setStep((s) => s - 1)
  }

  if (confirmed) {
    return <SuccessScreen service={service} barber={barber} date={date} time={time} name={form.firstName} />
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <BookingStepper steps={STEPS} current={step} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <StepShell title="Elegí tu servicio" subtitle="¿Qué te vas a hacer hoy?">
              <div className="grid gap-4 sm:grid-cols-2">
                {services
                  .filter((s) => s.active)
                  .map((s) => (
                    <ServiceCard
                      key={s.id}
                      service={s}
                      selectable
                      selected={service?.id === s.id}
                      onSelect={(sel) => {
                        setService(sel)
                        if (barber && !barber.services.includes(sel.id)) setBarber(null)
                      }}
                    />
                  ))}
              </div>
            </StepShell>
          )}

          {step === 1 && (
            <StepShell title="Elegí tu barbero" subtitle="Reservá con quien más confianza te da.">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {availableBarbers.map((b) => (
                  <EmployeeCard
                    key={b.id}
                    barber={b}
                    selectable
                    selected={barber?.id === b.id}
                    onSelect={setBarber}
                  />
                ))}
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell title="Elegí la fecha" subtitle="Los domingos permanecemos cerrados.">
              <DateSelector selected={date} onSelect={setDate} />
            </StepShell>
          )}

          {step === 3 && (
            <StepShell
              title="Elegí el horario"
              subtitle={
                date ? `Disponibilidad para el ${format(date, "EEEE d 'de' MMMM", { locale: es })}` : undefined
              }
            >
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
                {slots.map((t) => (
                  <TimeSlot
                    key={t}
                    time={t}
                    disabled={taken.includes(t)}
                    selected={time === t}
                    onSelect={setTime}
                  />
                ))}
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-block size-3 rounded-full bg-muted ring-1 ring-border" />
                Los horarios tachados ya están ocupados.
              </p>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell title="Tus datos" subtitle="Completá tus datos para confirmar el turno.">
              <div className="grid gap-6 md:grid-cols-[1fr_280px]">
                <FieldGroup>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                      <Input
                        id="firstName"
                        placeholder="Juan"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                      <Input
                        id="lastName"
                        placeholder="Pérez"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+54 11 5555-1234"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email (opcional)</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@mail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <FieldDescription>Te enviaremos el recordatorio del turno.</FieldDescription>
                  </Field>
                </FieldGroup>

                <BookingSummary service={service} barber={barber} date={date} time={time} />
              </div>
            </StepShell>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button variant="outline" size="lg" className="h-11 px-5" onClick={back}>
            <ArrowLeft data-icon="inline-start" />
            Atrás
          </Button>
        ) : (
          <Button variant="ghost" size="lg" className="h-11 px-5" render={<Link href="/" />}>
            Cancelar
          </Button>
        )}
        <Button size="lg" className="h-11 px-6" disabled={!canContinue} onClick={next}>
          {step === STEPS.length - 1 ? (
            <>
              <CalendarCheck data-icon="inline-start" />
              Confirmar turno
            </>
          ) : (
            <>
              Continuar
              <ArrowRight data-icon="inline-end" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function BookingSummary({
  service,
  barber,
  date,
  time,
}: {
  service: Service | null
  barber: Barber | null
  date?: Date
  time: string | null
}) {
  return (
    <div className="h-fit rounded-2xl border border-border bg-muted/40 p-5">
      <h3 className="text-sm font-semibold">Resumen del turno</h3>
      <dl className="mt-4 flex flex-col gap-3 text-sm">
        <SummaryRow icon={Scissors} label="Servicio" value={service?.name} />
        <SummaryRow icon={UserCheck} label="Barbero" value={barber?.name} />
        <SummaryRow
          icon={CalendarDays}
          label="Fecha"
          value={date ? format(date, "d 'de' MMMM", { locale: es }) : undefined}
        />
        <SummaryRow icon={Clock} label="Horario" value={time ?? undefined} />
      </dl>
      {service && (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-lg font-semibold text-primary">{formatCurrency(service.price)}</span>
        </div>
      )}
    </div>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Scissors
  label: string
  value?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </span>
      <span className="text-right font-medium">{value ?? "—"}</span>
    </div>
  )
}

function SuccessScreen({
  service,
  barber,
  date,
  time,
  name,
}: {
  service: Service | null
  barber: Barber | null
  date?: Date
  time: string | null
  name: string
}) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-24">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <CheckCircle2 className="size-9" />
      </motion.div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        ¡Turno confirmado{name ? `, ${name}` : ""}!
      </h1>
      <p className="mt-2 text-pretty text-muted-foreground">
        Te esperamos. Te enviamos los detalles y un recordatorio antes de tu turno.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-card p-5 text-left">
        <dl className="flex flex-col gap-3 text-sm">
          <SummaryRow icon={Scissors} label="Servicio" value={service?.name} />
          <SummaryRow icon={UserCheck} label="Barbero" value={barber?.name} />
          <SummaryRow
            icon={CalendarDays}
            label="Fecha"
            value={date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : undefined}
          />
          <SummaryRow icon={Clock} label="Horario" value={time ?? undefined} />
        </dl>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" className="h-11 px-6" render={<Link href="/" />}>
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}
