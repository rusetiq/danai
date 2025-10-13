"use client"
import { Navigation } from "@/components/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { volunteerOpportunities } from "@/data/volunteer-opportunities"

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
  category?: string
  urgency?: string
  remote?: boolean
  rating?: number
  impact?: string
  skills?: string[]
  date?: string
}

export default function NGODashboard() {
  const [opp, setOpp] = useState<Opportunity>({
    id: Date.now(),
    title: "",
    organization: "",
    emirate: "",
    description: "",
    location: "",
    time: "",
    duration: "",
    numberOfVolunteers: 0,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof Opportunity, value: any) => {
    setOpp((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    volunteerOpportunities.push({ ...opp, category: "Environment", urgency: "medium", remote: false, rating: 0, impact: "", skills: [], date: new Date().toISOString() })
    localStorage.setItem("volunteerOpportunities", JSON.stringify(volunteerOpportunities))
    setSubmitted(true)
    setOpp({
      id: Date.now(),
      title: "",
      organization: "",
      emirate: "",
      description: "",
      location: "",
      time: "",
      duration: "",
      numberOfVolunteers: 0,
    })
  }

  return (
    <div className="max-w-3xl mx-auto py-24 space-y-8">
    <Navigation />
      <h1 className="text-4xl font-bold text-center">NGO Dashboard</h1>
      <p className="text-center text-muted-foreground">Create new volunteer opportunities for your NGO.</p>

      <div className="grid grid-cols-1 gap-4">
        {(["title", "organization", "emirate", "location", "time", "duration", "description"] as (keyof Opportunity)[]).map((field) => (
          <Input
            key={field}
            type={field === "description" ? "text" : "text"}
            value={(opp as any)[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className={`rounded-xl ${field === "description" ? "h-24" : ""}`}
          />
        ))}
        <Input
          type="number"
          value={opp.numberOfVolunteers}
          onChange={(e) => handleChange("numberOfVolunteers", parseInt(e.target.value))}
          placeholder="Number of Volunteers"
          className="rounded-xl"
        />
      </div>

      <div className="text-center">
        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 rounded-xl px-6 py-2">
          Submit Opportunity
        </Button>
        {submitted && <p className="mt-4 text-green-500">Opportunity submitted successfully!</p>}
      </div>
    </div>
  )
}
