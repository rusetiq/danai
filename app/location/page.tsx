import { LocationService } from "@/components/location-service"
import { Navigation } from "@/components/navigation"

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance tracking-tight">
                Schools Competing for a Sustainable Tomorrow
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty tracking-tight">
                Together, schools across UAE are shaping a greener future. Compete, learn, and take action to lower emissions and build a sustainable tomorrow.
              </p>
            </div>

            <div className="glass rounded-3xl p-8 md:p-12">
              <LocationService />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
