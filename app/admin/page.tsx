"use client"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface SchoolMetrics {
  recyclingRates: string
  wasteReduction: string
  renewableEnergy: string
  conservationEfforts: string
  studentInitiatives: string
  greenPrograms: string
  usageReduction: string
  harvestingSystems: string
  approved?: boolean
}

interface Opportunity {
  id: number
  title: string
  organization: string
  emirate: string
  description: string
  location: string
  time: string
  duration: string
  numberOfVolunteers: number
  approved?: boolean
}

export default function AdminPage() {
  const [schoolSubmissions, setSchoolSubmissions] = useState<SchoolMetrics[]>([])
  const [ngoOpportunities, setNgoOpportunities] = useState<Opportunity[]>([])

  useEffect(() => {
    const storedSubmissions = localStorage.getItem("schoolSubmissions")
    if (storedSubmissions) setSchoolSubmissions(JSON.parse(storedSubmissions))

    const storedOpportunities = localStorage.getItem("volunteerOpportunities")
    if (storedOpportunities) setNgoOpportunities(JSON.parse(storedOpportunities))
  }, [])

  const approveSchoolSubmission = (index: number) => {
    const updated = schoolSubmissions.map((s, i) => i === index ? { ...s, approved: true } : s)
    setSchoolSubmissions(updated)
    localStorage.setItem("schoolSubmissions", JSON.stringify(updated))
  }

  const approveOpportunity = (id: number) => {
    const updated = ngoOpportunities.map((o) => o.id === id ? { ...o, approved: true } : o)
    setNgoOpportunities(updated)
    localStorage.setItem("volunteerOpportunities", JSON.stringify(updated))
  }

  const deleteOpportunity = (id: number) => {
    const updated = ngoOpportunities.filter((o) => o.id !== id)
    setNgoOpportunities(updated)
    localStorage.setItem("volunteerOpportunities", JSON.stringify(updated))
  }

  return (
    <div className="max-w-5xl mx-auto py-24 space-y-12">
    <Navigation />
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>

      {/* School Submissions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">School Submissions</h2>
        {schoolSubmissions.length === 0 ? (
          <p className="text-muted-foreground">No school submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {schoolSubmissions.map((s, idx) => (
              <Card key={idx} className="p-4">
                <CardHeader>
                  <CardTitle>Submission #{idx + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p><strong>Recycling Rates:</strong> {s.recyclingRates}</p>
                  <p><strong>Waste Reduction:</strong> {s.wasteReduction}</p>
                  <p><strong>Renewable Energy:</strong> {s.renewableEnergy}</p>
                  <p><strong>Conservation Efforts:</strong> {s.conservationEfforts}</p>
                  <p><strong>Student Initiatives:</strong> {s.studentInitiatives}</p>
                  <p><strong>Green Programs:</strong> {s.greenPrograms}</p>
                  <p><strong>Usage Reduction:</strong> {s.usageReduction}</p>
                  <p><strong>Harvesting Systems:</strong> {s.harvestingSystems}</p>
                  <div className="mt-2 flex gap-2 items-center">
                    {!s.approved && (
                      <Button onClick={() => approveSchoolSubmission(idx)} className="bg-primary hover:bg-primary/90 rounded-xl px-4 py-2">
                        Approve
                      </Button>
                    )}
                    {s.approved && <Badge className="bg-green-500 text-white">Approved</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* NGO Volunteer Opportunities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">NGO Volunteer Opportunities</h2>
        {ngoOpportunities.length === 0 ? (
          <p className="text-muted-foreground">No NGO opportunities submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {ngoOpportunities.map((opp) => (
              <Card key={opp.id} className="p-4">
                <CardHeader>
                  <CardTitle>{opp.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p><strong>Organization:</strong> {opp.organization}</p>
                  <p><strong>Emirate:</strong> {opp.emirate}</p>
                  <p><strong>Description:</strong> {opp.description}</p>
                  <p><strong>Location:</strong> {opp.location}</p>
                  <p><strong>Time:</strong> {opp.time}</p>
                  <p><strong>Duration:</strong> {opp.duration}</p>
                  <p><strong>Volunteers Needed:</strong> {opp.numberOfVolunteers}</p>
                  <div className="mt-2 flex gap-2 items-center">
                    {!opp.approved && (
                      <Button onClick={() => approveOpportunity(opp.id)} className="bg-primary hover:bg-primary/90 rounded-xl px-4 py-2">
                        Approve
                      </Button>
                    )}
                    <Button onClick={() => deleteOpportunity(opp.id)} className="bg-destructive hover:bg-destructive/90 rounded-xl px-4 py-2">
                      Delete
                    </Button>
                    {opp.approved && <Badge className="bg-green-500 text-white">Approved</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
