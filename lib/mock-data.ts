// Mock data layer for the barbershop booking MVP.
// Structured to be swapped for Supabase queries later without touching the UI.

export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled"

export interface Service {
  id: string
  name: string
  description: string
  duration: number // minutes
  price: number
  active: boolean
}

export interface Barber {
  id: string
  name: string
  specialty: string
  photo: string
  services: string[] // service ids
  active: boolean
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  visits: number
  lastVisit: string // ISO date
}

export interface Appointment {
  id: string
  customerId: string
  customerName: string
  serviceId: string
  serviceName: string
  barberId: string
  barberName: string
  date: string // ISO date (yyyy-mm-dd)
  start: string // "HH:mm"
  end: string // "HH:mm"
  duration: number
  price: number
  status: AppointmentStatus
}

export const BUSINESS = {
  name: "Fade & Co.",
  tagline: "Barbería & Grooming",
  description:
    "Cortes clásicos y modernos, arreglo de barba y un ritual de cuidado pensado para vos. Reservá tu turno en segundos.",
  phone: "+54 11 5555-1234",
  email: "hola@fadeandco.com",
  address: "Av. Corrientes 1234, Buenos Aires",
  hours: "Lun a Sáb · 09:00 – 20:00",
  slotInterval: 30,
  cancellationPolicy: 24,
}

export const services: Service[] = [
  {
    id: "s1",
    name: "Corte de cabello",
    description: "Corte clásico o moderno a tijera y máquina con acabado prolijo.",
    duration: 30,
    price: 8000,
    active: true,
  },
  {
    id: "s2",
    name: "Corte + Barba",
    description: "Combo completo: corte de cabello más perfilado y arreglo de barba.",
    duration: 60,
    price: 13000,
    active: true,
  },
  {
    id: "s3",
    name: "Arreglo de barba",
    description: "Perfilado, recorte y toalla caliente con aceites esenciales.",
    duration: 30,
    price: 6500,
    active: true,
  },
  {
    id: "s4",
    name: "Afeitado clásico",
    description: "Afeitado a navaja con espuma caliente y ritual completo.",
    duration: 45,
    price: 9000,
    active: true,
  },
  {
    id: "s5",
    name: "Corte niños",
    description: "Corte pensado para los más chicos, con paciencia y buena onda.",
    duration: 30,
    price: 6000,
    active: false,
  },
]

export const barbers: Barber[] = [
  {
    id: "b1",
    name: "Marco Ruiz",
    specialty: "Fades & degradados",
    photo: "/barbers/barber-1.png",
    services: ["s1", "s2", "s3", "s4"],
    active: true,
  },
  {
    id: "b2",
    name: "Diego Fernández",
    specialty: "Barba & afeitado clásico",
    photo: "/barbers/barber-2.png",
    services: ["s1", "s2", "s3", "s4"],
    active: true,
  },
  {
    id: "b3",
    name: "Lucas Herrera",
    specialty: "Cortes modernos",
    photo: "/barbers/barber-3.png",
    services: ["s1", "s2", "s5"],
    active: true,
  },
  {
    id: "b4",
    name: "Tomás Vega",
    specialty: "Estilo clásico",
    photo: "/barbers/barber-4.png",
    services: ["s1", "s3", "s4"],
    active: false,
  },
]

export const customers: Customer[] = [
  { id: "c1", firstName: "Juan", lastName: "Pérez", phone: "+54 11 4444-1111", email: "juan.perez@mail.com", visits: 12, lastVisit: "2026-07-08" },
  { id: "c2", firstName: "Martín", lastName: "Gómez", phone: "+54 11 4444-2222", email: "martin.gomez@mail.com", visits: 5, lastVisit: "2026-07-01" },
  { id: "c3", firstName: "Nicolás", lastName: "López", phone: "+54 11 4444-3333", visits: 8, lastVisit: "2026-06-24" },
  { id: "c4", firstName: "Federico", lastName: "Díaz", phone: "+54 11 4444-4444", email: "fede.diaz@mail.com", visits: 2, lastVisit: "2026-05-30" },
  { id: "c5", firstName: "Santiago", lastName: "Romero", phone: "+54 11 4444-5555", visits: 21, lastVisit: "2026-07-10" },
  { id: "c6", firstName: "Emiliano", lastName: "Torres", phone: "+54 11 4444-6666", email: "emi.torres@mail.com", visits: 3, lastVisit: "2026-06-15" },
  { id: "c7", firstName: "Bruno", lastName: "Silva", phone: "+54 11 4444-7777", visits: 1, lastVisit: "2026-07-11" },
]

// A single fixed "today" so the mock agenda always has content.
export const TODAY = "2026-07-14"

export const appointments: Appointment[] = [
  { id: "a1", customerId: "c1", customerName: "Juan Pérez", serviceId: "s2", serviceName: "Corte + Barba", barberId: "b1", barberName: "Marco Ruiz", date: TODAY, start: "09:00", end: "10:00", duration: 60, price: 13000, status: "confirmed" },
  { id: "a2", customerId: "c2", customerName: "Martín Gómez", serviceId: "s1", serviceName: "Corte de cabello", barberId: "b2", barberName: "Diego Fernández", date: TODAY, start: "09:30", end: "10:00", duration: 30, price: 8000, status: "confirmed" },
  { id: "a3", customerId: "c3", customerName: "Nicolás López", serviceId: "s3", serviceName: "Arreglo de barba", barberId: "b1", barberName: "Marco Ruiz", date: TODAY, start: "10:30", end: "11:00", duration: 30, price: 6500, status: "pending" },
  { id: "a4", customerId: "c5", customerName: "Santiago Romero", serviceId: "s4", serviceName: "Afeitado clásico", barberId: "b3", barberName: "Lucas Herrera", date: TODAY, start: "11:00", end: "11:45", duration: 45, price: 9000, status: "confirmed" },
  { id: "a5", customerId: "c4", customerName: "Federico Díaz", serviceId: "s1", serviceName: "Corte de cabello", barberId: "b2", barberName: "Diego Fernández", date: TODAY, start: "12:00", end: "12:30", duration: 30, price: 8000, status: "completed" },
  { id: "a6", customerId: "c6", customerName: "Emiliano Torres", serviceId: "s2", serviceName: "Corte + Barba", barberId: "b1", barberName: "Marco Ruiz", date: TODAY, start: "14:00", end: "15:00", duration: 60, price: 13000, status: "confirmed" },
  { id: "a7", customerId: "c7", customerName: "Bruno Silva", serviceId: "s1", serviceName: "Corte de cabello", barberId: "b3", barberName: "Lucas Herrera", date: TODAY, start: "15:30", end: "16:00", duration: 30, price: 8000, status: "pending" },
  { id: "a8", customerId: "c1", customerName: "Juan Pérez", serviceId: "s3", serviceName: "Arreglo de barba", barberId: "b2", barberName: "Diego Fernández", date: TODAY, start: "16:30", end: "17:00", duration: 30, price: 6500, status: "confirmed" },
  { id: "a9", customerId: "c2", customerName: "Martín Gómez", serviceId: "s2", serviceName: "Corte + Barba", barberId: "b1", barberName: "Marco Ruiz", date: "2026-07-15", start: "10:00", end: "11:00", duration: 60, price: 13000, status: "confirmed" },
  { id: "a10", customerId: "c5", customerName: "Santiago Romero", serviceId: "s1", serviceName: "Corte de cabello", barberId: "b3", barberName: "Lucas Herrera", date: "2026-07-16", start: "13:00", end: "13:30", duration: 30, price: 8000, status: "confirmed" },
]

// Time slots for the day, in 30-min steps between opening hours.
export function generateTimeSlots(from = "09:00", to = "20:00", step = 30): string[] {
  const slots: string[] = []
  const [fh, fm] = from.split(":").map(Number)
  const [th, tm] = to.split(":").map(Number)
  let minutes = fh * 60 + fm
  const endMinutes = th * 60 + tm
  while (minutes < endMinutes) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
    minutes += step
  }
  return slots
}

// Deterministic mock of which slots are already taken (for the booking flow).
export const bookedSlots: Record<string, string[]> = {
  default: ["09:30", "11:00", "12:30", "15:00", "17:30"],
}

export function getBarberById(id: string) {
  return barbers.find((b) => b.id === id)
}

export function getServiceById(id: string) {
  return services.find((s) => s.id === id)
}

export const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}

export const statusLabels: Record<AppointmentStatus, string> = {
  confirmed: "Confirmado",
  pending: "Pendiente",
  completed: "Completado",
  cancelled: "Cancelado",
}
