import { VolunteerOpportunities } from "@/components/volunteer-opportunities"
import { Navigation } from "@/components/navigation"

export default function OpportunitiesPage() {
  return (
    <main className="min-h-screen bg-background">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl animate-pulse delay-1500" />
      </div>
      <Navigation />
      <div className="pt-16">
        <VolunteerOpportunities />
      </div>
    </main>
  )
}
