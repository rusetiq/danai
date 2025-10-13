import { Button } from "@/components/ui/button"
import { MapPin, Heart } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Heart,
    title: "School Sustainability Challenge",
    description:
      "Track initiatives taken by schools to increase their sustainability and protect the environment, while connecting the school community together in this challenge.",
    color: "text-green-500",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    glowColors: "drop-shadow-[0_0_15px_rgba(34,197,94,0.4)] drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]",
    href: "/location",
  },
  {
    icon: MapPin,
    title: "Emirates-Wide Community Map",
    description:
      "Discover opportunities from Dubai Marina to Fujairah mountains, with real GPS locations and distance-based matching across all emirates.",
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    glowColors: "drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]",
    href: "/#map",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Everything you need to serve the{" "}
            <span className="relative inline-block group cursor-default">
              <span className="relative z-10 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] drop-shadow-[0_0_15px_rgba(22,163,74,0.4)] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] drop-shadow-[0_0_35px_rgba(220,38,38,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(22,163,74,0.7)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]">
                UAE
              </span>
            </span>{" "}
            community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Powerful tools and features designed to connect you with meaningful volunteer opportunities and charity work
            across the United Arab Emirates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <div className="glass rounded-2xl p-8 glass-hover group border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.bgGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color} ${feature.glowColors}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
