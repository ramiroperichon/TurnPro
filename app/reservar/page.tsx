import { BookingHeader } from "@/components/booking/booking-header"
import { BookingFlow } from "@/components/booking/booking-flow"

export default function ReservarPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <BookingHeader />
      <main className="flex-1">
        <BookingFlow />
      </main>
    </div>
  )
}
