"use client"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    // Validate required fields
    if (!opp.title || !opp.organization || !opp.emirate || !opp.description || !opp.location) {
      alert("Please fill in all required fields")
      return
    }

    const stored = localStorage.getItem("ngoSubmissions")
    const pending = stored ? JSON.parse(stored) : []
    const toAdd = { 
      ...opp, 
      id: Date.now(), 
      category: "Environment", 
      urgency: "medium" as const, // Fix urgency type
      remote: false, 
      rating: 4.5, 
      impact: "Community Impact", 
      skills: ["Environmental Awareness"], 
      date: new Date().toISOString(), 
      approved: false 
    }
    
    localStorage.setItem("ngoSubmissions", JSON.stringify([...pending, toAdd]))
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
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
    }, 3000)
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
        {submitted && (
          <div className="mt-4 space-y-2">
            <p className="text-green-500">Opportunity submitted for admin approval.</p>
            <div className="flex items-center justify-center gap-2">
              <Link href="/opportunities" className="text-sm underline text-primary">View Opportunities</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
