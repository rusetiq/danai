"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Trophy, AlertTriangle, Leaf, Activity, School, TrendingUp, Zap, Recycle, Droplets } from "lucide-react"

type CertificationType = "platinum" | "gold" | "silver" | "bronze" | "none"

interface SchoolMetrics {
  wasteManagement: number
  energyEfficiency: number
  sustainabilityProjects: number
  waterConservation: number
}

interface SchoolData {
  id: number
  name: string
  emissions: number
  score: number
  rank: number
  alerts: string[]
  certification: CertificationType
  metrics: SchoolMetrics
  improvements: string[]
}

export const mockSchools: SchoolData[] = [
  { id: 1, name: "Dunes International School", emissions: 14, score: 92, rank: 1, alerts: ["Excellent performance this week!"], certification: "platinum", metrics: { wasteManagement: 95, energyEfficiency: 90, sustainabilityProjects: 92, waterConservation: 88 }, improvements: ["Consider expanding solar panel coverage", "Implement rainwater harvesting system"] },
  { id: 2, name: "Abu Dhabi Indian School", emissions: 19, score: 84, rank: 2, alerts: ["Slight increase in emissions."], certification: "gold", metrics: { wasteManagement: 88, energyEfficiency: 82, sustainabilityProjects: 85, waterConservation: 80 }, improvements: ["Reduce energy consumption during peak hours", "Introduce more recycling bins", "Start composting program"] },
  { id: 3, name: "Sunrise English Private School", emissions: 24, score: 76, rank: 3, alerts: ["Great improvement in recycling."], certification: "silver", metrics: { wasteManagement: 78, energyEfficiency: 75, sustainabilityProjects: 72, waterConservation: 78 }, improvements: ["Install LED lighting throughout campus", "Create student-led sustainability committee", "Reduce single-use plastics in cafeteria"] },
  { id: 4, name: "Repton School Abu Dhabi", emissions: 37, score: 61, rank: 4, alerts: ["Energy usage is too high."], certification: "bronze", metrics: { wasteManagement: 65, energyEfficiency: 58, sustainabilityProjects: 60, waterConservation: 62 }, improvements: ["Upgrade HVAC systems for efficiency", "Implement stricter waste segregation", "Launch tree planting initiative", "Reduce paper usage"] },
  { id: 5, name: "The British International School", emissions: 45, score: 52, rank: 5, alerts: ["Immediate action required on waste reduction."], certification: "none", metrics: { wasteManagement: 48, energyEfficiency: 52, sustainabilityProjects: 55, waterConservation: 50 }, improvements: ["Establish baseline sustainability goals", "Train staff on energy conservation", "Install motion-sensor lighting", "Create waste audit system", "Partner with local recycling facilities"] },
]

const scoreColors = {
  high: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-red-500/20 text-red-400 border-red-500/30",
}

const certificationConfig: Record<CertificationType, { label: string; color: string; icon: string; description: string }> = {
  platinum: { label: "Platinum Green School", color: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/40", icon: "🏆", description: "Exceptional sustainability leadership" },
  gold: { label: "Gold Green School", color: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/40", icon: "🥇", description: "Outstanding environmental performance" },
  silver: { label: "Silver Green School", color: "bg-gradient-to-r from-gray-400/20 to-gray-500/20 text-gray-300 border-gray-400/40", icon: "🥈", description: "Strong commitment to sustainability" },
  bronze: { label: "Bronze Green School", color: "bg-gradient-to-r from-orange-600/20 to-orange-700/20 text-orange-300 border-orange-600/40", icon: "🥉", description: "Good sustainability practices" },
  none: { label: "Not Certified", color: "bg-muted/20 text-muted-foreground border-muted/40", icon: "📋", description: "Working towards certification" }
}

export function LocationService() {
  const [schools, setSchools] = useState<SchoolData[]>(mockSchools)
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null)
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    contactPerson: "",
    email: "",
    phone: "",
    emissions: "",
    score: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("approvedSchools")
    if (stored) {
      try {
        const approved = JSON.parse(stored)
        setSchools([...mockSchools, ...approved])
      } catch {
        setSchools(mockSchools)
      }
    } else {
      setSchools(mockSchools)
    }
  }, [])

  const getScoreCategory = (score: number) => {
    if (score >= 85) return "high"
    if (score >= 60) return "medium"
    return "low"
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    for (const key in newSchool) {
      if (!newSchool[key as keyof typeof newSchool]) {
        setError("All fields are required!")
        return
      }
    }
    setError("Could not update database")
  }

  return (
    <div className="space-y-6">
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span>School Sustainability Challenge</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1">{schools.length}</div>
              <div className="text-xs text-foreground">Schools Competing</div>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {schools.filter((s) => s.certification && s.certification !== "none").length}
              </div>
              <div className="text-xs text-foreground">Certified Green Schools</div>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-1">
                {schools.filter((s) => s.score < 60).length}
              </div>
              <div className="text-xs text-foreground">Needs Improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Leaderboard</span>
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">{schools.length} schools</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schools.map((school) => (
              <div key={school.id} onClick={() => setSelectedSchool(school)} className="glass rounded-lg p-4 glass-hover cursor-pointer transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-sm">{school.rank}. {school.name}</h4>
                      {school.rank === 1 && <Trophy className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <p className="text-xs mb-2 text-foreground">{school.emissions} tons CO₂ / week</p>
                    <Badge variant="outline" className={`${certificationConfig[school.certification].color} text-xs`}>{certificationConfig[school.certification].icon} {certificationConfig[school.certification].label}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={scoreColors[getScoreCategory(school.score)]}>{school.score} pts</Badge>
                    {school.score < 60 && <AlertTriangle className="w-4 h-4 text-destructive" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
  <CardHeader>
    <CardTitle className="flex items-center space-x-2">
      <Activity className="w-5 h-5 text-primary" />
      <span>Green Certification Criteria</span>
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <p className="text-sm mb-4 text-slate-300 text-slate-300">Schools are evaluated across four key sustainability metrics and awarded certification based on their overall performance:</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="glass rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <Recycle className="w-4 h-4 text-green-400" />
          <span className="text-sm font-semibold">Waste Management</span>
        </div>
        <p className="text-xs text-slate-300">Recycling rates, waste reduction initiatives</p>
      </div>

      <div className="glass rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold">Energy Efficiency</span>
        </div>
        <p className="text-xs text-slate-300">Renewable energy use, conservation efforts</p>
      </div>

      <div className="glass rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold">Sustainability Projects</span>
        </div>
        <p className="text-xs text-slate-300">Student initiatives, green programs</p>
      </div>

      <div className="glass rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <Droplets className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold">Water Conservation</span>
        </div>
        <p className="text-xs text-slate-300">Usage reduction, harvesting systems</p>
      </div>
    </div>
  </CardContent>
</Card>

      {selectedSchool && (
        <Dialog open={!!selectedSchool} onOpenChange={() => setSelectedSchool(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <School className="w-5 h-5" />
                <span>{selectedSchool.name}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="text-center p-6 glass rounded-lg">
                <div className="text-6xl mb-3">{certificationConfig[selectedSchool.certification].icon}</div>
                <Badge variant="outline" className={`${certificationConfig[selectedSchool.certification].color} text-lg px-4 py-1`}>{certificationConfig[selectedSchool.certification].label}</Badge>
                <p className="text-sm text-muted-foreground mt-2">{certificationConfig[selectedSchool.certification].description}</p>
                <div className="mt-4 text-3xl font-bold text-primary">{selectedSchool.score} Points</div>
                <p className="text-xs text-muted-foreground">Rank #{selectedSchool.rank} of {schools.length}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Performance Metrics</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Recycle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">Waste Management</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.wasteManagement}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${selectedSchool.metrics.wasteManagement}%` }} />
                    </div>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">Energy Efficiency</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.energyEfficiency}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full transition-all duration-500" style={{ width: `${selectedSchool.metrics.energyEfficiency}%` }} />
                    </div>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">Sustainability Projects</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.sustainabilityProjects}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${selectedSchool.metrics.sustainabilityProjects}%` }} />
                    </div>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium">Water Conservation</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.waterConservation}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full transition-all duration-500" style={{ width: `${selectedSchool.metrics.waterConservation}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Recommended Improvements</span>
                </h3>
                <div className="space-y-2">
                  {selectedSchool.improvements.map((improvement, i) => (
                    <div key={i} className="glass p-3 rounded-lg text-sm flex items-start space-x-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-muted-foreground">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedSchool.alerts && selectedSchool.alerts.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Recent Alerts</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedSchool.alerts.map((alert, i) => (
                      <div key={i} className="glass p-3 rounded-lg text-sm text-muted-foreground border-l-2 border-primary">{alert}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Weekly Carbon Emissions</p>
                <p className="text-2xl font-bold text-primary">{selectedSchool.emissions} tons CO₂</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
        <Dialog open={!!selectedSchool} onOpenChange={() => setSelectedSchool(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <School className="w-5 h-5" />
                <span>{selectedSchool.name}</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Certification Badge */}
              <div className="text-center p-6 glass rounded-lg">
                <div className="text-6xl mb-3">{certificationConfig[selectedSchool.certification].icon}</div>
                <Badge variant="outline" className={`${certificationConfig[selectedSchool.certification].color} text-lg px-4 py-1`}>
                  {certificationConfig[selectedSchool.certification].label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {certificationConfig[selectedSchool.certification].description}
                </p>
                <div className="mt-4 text-3xl font-bold text-primary">{selectedSchool.score} Points</div>
                <p className="text-xs text-muted-foreground">Rank #{selectedSchool.rank} of {schools.length}</p>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Performance Metrics</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Recycle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">Waste Management</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.wasteManagement}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${selectedSchool.metrics.wasteManagement}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">Energy Efficiency</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.energyEfficiency}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${selectedSchool.metrics.energyEfficiency}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">Sustainability Projects</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.sustainabilityProjects}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${selectedSchool.metrics.sustainabilityProjects}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium">Water Conservation</span>
                      </div>
                      <span className="text-sm font-bold">{selectedSchool.metrics.waterConservation}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-cyan-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${selectedSchool.metrics.waterConservation}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Areas for Improvement */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Recommended Improvements</span>
                </h3>
                <div className="space-y-2">
                  {selectedSchool.improvements.map((improvement, i) => (
                    <div key={i} className="glass p-3 rounded-lg text-sm flex items-start space-x-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-muted-foreground">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              {selectedSchool.alerts && selectedSchool.alerts.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Recent Alerts</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedSchool.alerts.map((alert, i) => (
                      <div key={i} className="glass p-3 rounded-lg text-sm text-muted-foreground border-l-2 border-primary">
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emissions Info */}
              <div className="glass rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Weekly Carbon Emissions</p>
                <p className="text-2xl font-bold text-primary">{selectedSchool.emissions} tons CO₂</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
