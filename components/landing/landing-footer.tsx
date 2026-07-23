import Link from "next/link"
import { Scissors, Phone, Mail, MapPin } from "lucide-react"
import { BUSINESS } from "@/lib/mock-data"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Scissors className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">{BUSINESS.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {BUSINESS.description}
            </p>
            <div className="mt-5 flex gap-2">
              <SocialLink icon={Phone} label="Teléfono" />
              <SocialLink icon={Mail} label="Email" />
              <SocialLink icon={MapPin} label="Ubicación" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Navegación</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li><a href="#servicios" className="transition-colors hover:text-foreground">Servicios</a></li>
              <li><a href="#barberos" className="transition-colors hover:text-foreground">Barberos</a></li>
              <li><a href="#como-funciona" className="transition-colors hover:text-foreground">Cómo funciona</a></li>
              <li><a href="#horarios" className="transition-colors hover:text-foreground">Horarios</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contacto</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li>{BUSINESS.address}</li>
              <li>{BUSINESS.phone}</li>
              <li>{BUSINESS.email}</li>
            </ul>
            <Link
              href="/login"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Acceso administradores
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.</p>
          <p>Reservá tu turno online, 24/7.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ icon: Icon, label }: { icon: typeof Phone; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      <Icon className="size-4" />
    </a>
  )
}
