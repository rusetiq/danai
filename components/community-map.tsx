"use client"

import { InteractiveMap } from "@/components/interactive-map"

export function CommunityMap() {
  return (
    <section id="map" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Discover UAE charity communities</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Explore charity organizations and volunteer opportunities across all seven emirates through our interactive
            map with real locations and geolocation support.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <InteractiveMap />
        </div>
      </div>
    </section>
  )
}
