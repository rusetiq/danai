"use client"

import { useEffect, useState } from "react"

const stats = [
  { value: 88, label: "UAE residents helped", suffix: "" },
  { value: 127, label: "volunteer hours", suffix: "" },
  { value: 7, label: "emirates covered", suffix: "" },
]

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(value * easeOutQuart))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{displayValue.toLocaleString()}</span>
}

export function ImpactStats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-12 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Real Impact Across the{" "}
              <span className="relative inline-block group cursor-default">
                <span className="relative z-10 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] drop-shadow-[0_0_15px_rgba(22,163,74,0.4)] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] drop-shadow-[0_0_35px_rgba(220,38,38,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(22,163,74,0.7)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]">
                  UAE
                </span>
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              See the tangible difference our community is making across all seven emirates of the UAE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(147,51,234,0.4)] drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                  <AnimatedNumber value={stat.value} duration={2000 + index * 200} />
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground text-lg capitalize">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
