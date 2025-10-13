"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Users, Heart, Calendar, Filter, Navigation, Loader2 } from "lucide-react"

interface Organization {
  id: number
  name: string
  type: string
  volunteers: number
  lat: number
  lng: number
  impact: string
  description: string
  events: number
  urgency: "low" | "medium" | "high"
  skills: string[]
  city: string
  emirate: string
}

const organizations: Organization[] = [
  {
    id: 1,
    name: "Emirates Red Crescent",
    type: "Humanitarian Aid",
    volunteers: 1250,
    lat: 25.2048,
    lng: 55.2708,
    impact: "50k families supported",
    description:
      "Leading humanitarian organization providing aid and disaster relief across the UAE and internationally",
    events: 25,
    urgency: "high",
    skills: ["Emergency Response", "Community Outreach", "Medical Aid"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 2,
    name: "Dubai Cares",
    type: "Education",
    volunteers: 890,
    lat: 25.2285,
    lng: 55.275,
    impact: "2M children educated",
    description:
      "Improving access to quality education for children in developing countries through integrated programs",
    events: 18,
    urgency: "medium",
    skills: ["Teaching", "Program Management", "Child Development"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 3,
    name: "Al Jalila Foundation",
    type: "Healthcare",
    volunteers: 567,
    lat: 25.2697,
    lng: 55.3095,
    impact: "15k patients treated",
    description: "Advancing healthcare through medical education, research and treatment for Arab world",
    events: 12,
    urgency: "high",
    skills: ["Medical Research", "Healthcare", "Fundraising"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 4,
    name: "Beit Al Khair Society",
    type: "Social Welfare",
    volunteers: 734,
    lat: 25.2582,
    lng: 55.3047,
    impact: "25k families assisted",
    description: "Comprehensive social services including housing, healthcare, and education support",
    events: 22,
    urgency: "medium",
    skills: ["Social Work", "Community Support", "Case Management"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 5,
    name: "Emirates Environmental Group",
    type: "Environment",
    volunteers: 445,
    lat: 25.2144,
    lng: 55.2708,
    impact: "500k trees planted",
    description: "Environmental awareness and conservation initiatives across the UAE",
    events: 15,
    urgency: "medium",
    skills: ["Environmental Science", "Conservation", "Education"],
    city: "Dubai",
    emirate: "Dubai",
  },
  {
    id: 6,
    name: "Zayed Higher Organization",
    type: "Disability Support",
    volunteers: 312,
    lat: 24.4539,
    lng: 54.3773,
    impact: "8k individuals supported",
    description: "Comprehensive care and rehabilitation services for people with disabilities",
    events: 20,
    urgency: "high",
    skills: ["Special Needs Care", "Rehabilitation", "Therapy"],
    city: "Abu Dhabi",
    emirate: "Abu Dhabi",
  },
  {
    id: 7,
    name: "Sharjah Charity International",
    type: "International Aid",
    volunteers: 623,
    lat: 25.3463,
    lng: 55.4209,
    impact: "100k refugees aided",
    description: "International humanitarian aid and development programs across 50+ countries",
    events: 16,
    urgency: "high",
    skills: ["International Development", "Logistics", "Emergency Relief"],
    city: "Sharjah",
    emirate: "Sharjah",
  },
  {
    id: 8,
    name: "Ajman Bank Foundation",
    type: "Community Development",
    volunteers: 289,
    lat: 25.4052,
    lng: 55.5136,
    impact: "12k community members",
    description: "Supporting local community development through education and economic empowerment",
    events: 10,
    urgency: "low",
    skills: ["Community Development", "Financial Literacy", "Entrepreneurship"],
    city: "Ajman",
    emirate: "Ajman",
  },
]

const typeColors = {
  "Humanitarian Aid": "bg-red-500/20 text-red-400 border-red-500/30",
  Education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Environment: "bg-green-500/20 text-green-400 border-green-500/30",
  Healthcare: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Social Welfare": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Disability Support": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "International Aid": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Community Development": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

const urgencyColors = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-red-500/20 text-red-400",
}

export function InteractiveMap() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)

  const getUserLocation = () => {
    setLocationLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          setLocationLoading(false)
        },
        (error) => {
          setUserLocation({ lat: 25.2048, lng: 55.2708 })
          setLocationLoading(false)
        },
      )
    } else {
      setUserLocation({ lat: 25.2048, lng: 55.2708 })
      setLocationLoading(false)
    }
  }

  useEffect(() => {
    const initializeMap = async () => {
      if (typeof window !== "undefined" && mapRef.current && !mapInstance) {
        try {
          const L = (await import("leaflet")).default

          const map = L.map(mapRef.current).setView([25.2048, 55.2708], 8)

          L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: '© OpenStreetMap contributors © CARTO',
            subdomains: 'abcd',
            maxZoom: 20
          }).addTo(map)

          organizations.forEach((org) => {
            L.marker([org.lat, org.lng])
              .addTo(map)
              .bindPopup(`
                <div class="p-2">
                  <h3 class="font-semibold text-sm">${org.name}</h3>
                  <p class="text-xs text-gray-600 mb-2">${org.city}, ${org.emirate}</p>
                  <p class="text-xs mb-2">${org.description}</p>
                  <div class="flex items-center justify-between text-xs">
                    <span>${org.volunteers} volunteers</span>
                    <span>${org.impact}</span>
                  </div>
                </div>
              `)
          })

          setMapInstance(map)
        } catch (error) {
          console.log("Map initialization error:", error)
        }
      }
    }

    initializeMap()

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [])

  useEffect(() => {
    const addUserMarker = async () => {
      if (mapInstance && userLocation) {
        const L = await import("leaflet")
        L.default.marker([userLocation.lat, userLocation.lng]).addTo(mapInstance).bindPopup("Your Location").openPopup()
        mapInstance.setView([userLocation.lat, userLocation.lng], 12)
      }
    }
    
    addUserMarker()
  }, [mapInstance, userLocation])

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.emirate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = filterType === "all" || org.type === filterType

    return matchesSearch && matchesFilter
  })

  const uniqueTypes = Array.from(new Set(organizations.map((org) => org.type)))

  const handleOrgClick = (org: Organization) => {
    if (mapInstance) {
      mapInstance.setView([org.lat, org.lng], 15)
    }
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by organization, emirate, city, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-hover border border-purple-500/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="glass rounded-lg px-3 py-2 text-sm bg-transparent border border-purple-500/20"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {uniqueTypes.slice(0, 4).map((type) => (
              <Badge
                key={type}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  filterType === type ? typeColors[type as keyof typeof typeColors] : "glass-hover border-purple-500/20"
                }`}
                onClick={() => setFilterType(filterType === type ? "all" : type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[700px]">
          <div className="lg:col-span-3 glass rounded-2xl p-6 h-full relative overflow-hidden border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                  <span className="relative inline-block group cursor-default">
                    <span className="relative z-10 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] drop-shadow-[0_0_15px_rgba(22,163,74,0.4)] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] drop-shadow-[0_0_35px_rgba(220,38,38,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(22,163,74,0.7)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]">
                      UAE
                    </span>
                  </span>{" "}
                  Charity Map
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-hover bg-transparent border-purple-500/30"
                    onClick={getUserLocation}
                    disabled={locationLoading}
                  >
                    {locationLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4 mr-2" />
                    )}
                    My Location
                  </Button>
                </div>
              </div>

              <div
  ref={mapRef}
  className="flex-1 rounded-2xl overflow-hidden border"
  style={{ minHeight: "244px", padding: "8px" }}
/>

            </div>
          </div>

          <div className="lg:col-span-2 space-y-4 max-h-[700px] overflow-y-auto pr-2">
            {filteredOrganizations.map((org) => (
              <div
                key={org.id}
                className="glass rounded-xl p-4 cursor-pointer transition-all duration-200 border border-purple-500/20 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10"
                onClick={() => handleOrgClick(org)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]">
                      {org.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`text-xs ${typeColors[org.type as keyof typeof typeColors]}`}>
                        {org.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {org.city}, {org.emirate}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${urgencyColors[org.urgency]}`}>
                    {org.urgency} priority
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{org.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{org.volunteers} volunteers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{org.events} events</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-xs">
                    <Heart className="w-3 h-3" />
                    <span>{org.impact}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {org.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs px-2 py-0">
                        {skill}
                      </Badge>
                    ))}
                    {org.skills.length > 2 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        +{org.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredOrganizations.length === 0 && (
              <div className="glass rounded-xl p-8 text-center border border-purple-500/20">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold mb-2">No organizations found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
    </div>
  )
}
