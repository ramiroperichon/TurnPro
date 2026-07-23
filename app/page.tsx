import { LandingNav } from "@/components/landing/landing-nav"
import { Hero } from "@/components/landing/hero"
import { ServicesSection } from "@/components/landing/services-section"
import { BarbersSection } from "@/components/landing/barbers-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { HoursLocation } from "@/components/landing/hours-location"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <BarbersSection />
        <HowItWorks />
        <HoursLocation />
      </main>
      <LandingFooter />
    </div>
  )
}
