"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Clock, Users, Heart, Calendar, Star, GraduationCap, Stethoscope, Briefcase, Hammer, Leaf } from "lucide-react"
import { volunteerOpportunities, Opportunity } from "@/data/volunteer-opportunities"

const categoryIcons: Record<string, any> = {
  "Humanitarian Aid": Heart,
  Education: GraduationCap,
  Environment: Leaf,
  Healthcare: Stethoscope,
  "Social Welfare": Users,
  "Disability Support": Heart,
  "International Aid": Briefcase,
  "Community Development": Hammer,
  Sustainability: Leaf,
}

const urgencyColors: Record<string, string> = {
  low: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  high: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function VolunteerOpportunities() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterUrgency, setFilterUrgency] = useState("all")
  const [filterRemote, setFilterRemote] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const filteredOpportunities = volunteerOpportunities
    .filter((opp) => {
      const matchSearch =
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (opp.skills || []).some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.emirate.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCategory = filterCategory === "all" || opp.category === filterCategory
      const matchUrgency = filterUrgency === "all" || opp.urgency === filterUrgency
      const matchRemote =
        filterRemote === "all" ||
        (filterRemote === "remote" && opp.remote) ||
        (filterRemote === "onsite" && !opp.remote)
      return matchSearch && matchCategory && matchUrgency && matchRemote
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating": return (b.rating || 0) - (a.rating || 0)
        case "urgency": const order = { high: 3, medium: 2, low: 1 }; return order[b.urgency || "low"] - order[a.urgency || "low"]
        case "volunteers": return (a.numberOfVolunteers || 0) - (b.numberOfVolunteers || 0)
        default: return new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
      }
    })

  const categories = Array.from(new Set(volunteerOpportunities.map((o) => o.category)))

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-gradient-to-r from-cyan-400 to-green-500 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Volunteer Opportunities Across the UAE</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Discover meaningful ways to give back — explore projects across emirates that match your interests, availability, and passion.</p>
        </div>
        <div className="glass rounded-3xl p-8 shadow-lg mb-12">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input placeholder="Search by title, organization, or skills..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 h-11 text-sm rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Category", value: filterCategory, setValue: setFilterCategory, options: ["all", ...categories] },
              { label: "Urgency", value: filterUrgency, setValue: setFilterUrgency, options: ["all", "high", "medium", "low"] },
              { label: "Location", value: filterRemote, setValue: setFilterRemote, options: ["all", "remote", "onsite"] },
            ].map(({ label, value, setValue, options }) => (
              <div key={label}>
                <label className="text-sm font-medium mb-2 block">{label}</label>
                <select value={value} onChange={(e) => setValue(e.target.value)} className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border">
                  {options.map((opt) => <option key={opt} value={opt}>{opt === "all" ? `All ${label === "Location" ? "Locations" : label + "s"}` : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredOpportunities.length > 0 ? filteredOpportunities.map((opp) => {
            const Icon = categoryIcons[opp.category || ""] || Heart
            return (
              <Card key={opp.id} className="glass border border-border/50 rounded-2xl transition-all hover:shadow-2xl hover:-translate-y-1">
                <CardHeader className="pb-4 flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold">{opp.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{opp.organization}</p>
                    <p className="text-xs text-muted-foreground mt-1">{opp.emirate} Emirate</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={urgencyColors[opp.urgency || "medium"]}>{opp.urgency}</Badge>
                    {opp.remote && <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">Remote</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{opp.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> {opp.location}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> {opp.time}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /> {opp.duration}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-muted-foreground" /> {opp.numberOfVolunteers} volunteers</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> <span className="text-sm font-medium">{opp.rating}</span></div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground"><Heart className="w-4 h-4" /> {opp.impact}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">{(opp.skills || []).map((skill) => <Badge key={skill} variant="secondary" className="text-xs rounded-full px-2.5 py-0.5">{skill}</Badge>)}</div>
                  <div className="flex gap-2 pt-3">
                    <Button className="flex-1 rounded-xl bg-primary hover:bg-primary/90">Apply Now</Button>
                    <Button variant="outline" className="rounded-xl glass-hover bg-transparent">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            )
          }) : (
            <div className="col-span-full text-center py-20">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-muted-foreground" /></div>
              <h3 className="text-xl font-semibold mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or filters</p>
              <Button onClick={() => { setSearchTerm(""); setFilterCategory("all"); setFilterUrgency("all"); setFilterRemote("all") }} variant="outline" className="rounded-xl glass-hover bg-transparent">Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
