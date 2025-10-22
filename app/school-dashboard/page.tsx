"use client"
import { Navigation } from "@/components/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mockSchools } from "@/components/location-service"

interface SchoolMetrics {
  id?: number;
  schoolName?: string;
  recyclingRates: string;
  wasteReduction: string;
  renewableEnergy: string;
  conservationEfforts: string;
  studentInitiatives: string;
  greenPrograms: string;
  usageReduction: string;
  harvestingSystems: string;
  approved?: boolean;
  submittedAt?: string;
}

export default function SchoolDashboard() {
  const topSchool = mockSchools.find(s => s.rank === 1) || mockSchools[0]
  const preexistingMetrics: SchoolMetrics = {
    recyclingRates: topSchool ? `${topSchool.metrics.wasteManagement}%` : "N/A",
    wasteReduction: topSchool ? topSchool.improvements.slice(0,1).join(", ") : "N/A",
    renewableEnergy: topSchool ? `${topSchool.metrics.energyEfficiency}% renewable efforts` : "N/A",
    conservationEfforts: topSchool ? `${topSchool.metrics.energyEfficiency >= 80 ? "Strong conservation efforts" : "Ongoing efforts"}` : "N/A",
    studentInitiatives: topSchool ? `${topSchool.metrics.sustainabilityProjects}% engagement` : "N/A",
    greenPrograms: topSchool ? topSchool.improvements.slice(0,2).join(", ") : "N/A",
    usageReduction: topSchool ? `${topSchool.metrics.waterConservation}%` : "N/A",
    harvestingSystems: topSchool ? (topSchool.improvements.find(i => /harvest/i.test(i)) || "Pilot harvesting system") : "N/A",
  }

  const [metrics, setMetrics] = useState<SchoolMetrics>({
    schoolName: "",
    recyclingRates: "",
    wasteReduction: "",
    renewableEnergy: "",
    conservationEfforts: "",
    studentInitiatives: "",
    greenPrograms: "",
    usageReduction: "",
    harvestingSystems: "",
  })

  const [submissions, setSubmissions] = useState<SchoolMetrics[]>([])
  const [showSubmissionPreview, setShowSubmissionPreview] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("schoolSubmissions")
    if (stored) setSubmissions(JSON.parse(stored))
  }, [])

  const handleChange = (field: keyof SchoolMetrics, value: string) => {
    setMetrics(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const stored = localStorage.getItem("schoolSubmissions")
    const pending = stored ? JSON.parse(stored) : []
    const submission: SchoolMetrics = {
      ...metrics,
      id: Date.now(),
      approved: false,
      submittedAt: new Date().toISOString()
    }
    localStorage.setItem("schoolSubmissions", JSON.stringify([...pending, submission]))
    setSubmissions([...pending, submission]) // Add this line
    setSubmitted(true)
    setMetrics({
      schoolName: "",
      recyclingRates: "",
      wasteReduction: "",
      renewableEnergy: "",
      conservationEfforts: "",
      studentInitiatives: "",
      greenPrograms: "",
      usageReduction: "",
      harvestingSystems: "",
    })
    setShowSubmissionPreview(false)
  }

  const latestSubmission = submissions.length ? submissions[submissions.length - 1] : null
  const displayMetrics = showSubmissionPreview && latestSubmission ? latestSubmission : preexistingMetrics

  const parseNumber = (s: string | undefined) => {
    if (!s) return 0
    const m = String(s).match(/(\d+(\.\d+)?)/)
    return m ? Math.min(100, Math.round(Number(m[0]))) : 0
  }

  const numericMetrics = showSubmissionPreview && latestSubmission
    ? {
        waste: parseNumber(latestSubmission.recyclingRates),
        energy: parseNumber(latestSubmission.renewableEnergy),
        projects: parseNumber(latestSubmission.studentInitiatives),
        water: parseNumber(latestSubmission.usageReduction),
      }
    : {
        waste: topSchool?.metrics.wasteManagement ?? 0,
        energy: topSchool?.metrics.energyEfficiency ?? 0,
        projects: topSchool?.metrics.sustainabilityProjects ?? 0,
        water: topSchool?.metrics.waterConservation ?? 0,
      }

  const metricItems = [
    { key: "waste", label: "Waste Management", value: numericMetrics.waste, color: "bg-green-500" },
    { key: "energy", label: "Energy Efficiency", value: numericMetrics.energy, color: "bg-yellow-500" },
    { key: "projects", label: "Sustainability Projects", value: numericMetrics.projects, color: "bg-blue-500" },
    { key: "water", label: "Water Conservation", value: numericMetrics.water, color: "bg-cyan-500" },
  ]

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
    <Navigation />
    <div className="h-12" />
      <h1 className="text-3xl font-bold mb-4">School Sustainability Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Submit your sustainability metrics for admin approval.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          placeholder="School Name" 
          value={metrics.schoolName} 
          onChange={e => handleChange("schoolName", e.target.value)} 
          className="col-span-2"
        />
        <Input placeholder="Recycling Rates (%)" value={metrics.recyclingRates} onChange={e => handleChange("recyclingRates", e.target.value)} />
        <Input placeholder="Waste Reduction Initiatives" value={metrics.wasteReduction} onChange={e => handleChange("wasteReduction", e.target.value)} />
        <Input placeholder="Renewable Energy Usage" value={metrics.renewableEnergy} onChange={e => handleChange("renewableEnergy", e.target.value)} />
        <Input placeholder="Conservation Efforts" value={metrics.conservationEfforts} onChange={e => handleChange("conservationEfforts", e.target.value)} />
        <Input placeholder="Student Initiatives" value={metrics.studentInitiatives} onChange={e => handleChange("studentInitiatives", e.target.value)} />
        <Input placeholder="Green Programs" value={metrics.greenPrograms} onChange={e => handleChange("greenPrograms", e.target.value)} />
        <Input placeholder="Usage Reduction" value={metrics.usageReduction} onChange={e => handleChange("usageReduction", e.target.value)} />
        <Input placeholder="Harvesting Systems" value={metrics.harvestingSystems} onChange={e => handleChange("harvestingSystems", e.target.value)} />
      </div>

      <div className="flex space-x-2 mt-4">
        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">Submit for Approval</Button>
        <Button onClick={() => setShowSubmissionPreview(prev => !prev)} className="bg-secondary/10 hover:bg-secondary/20">
          {showSubmissionPreview ? "Show Preexisting Data" : "Preview My Submission"}
        </Button>
      </div>

      {submitted && (
        <div className="mt-3 text-sm flex items-center gap-2">
          <span className="text-green-500">Submission sent for admin approval.</span>
          <Link href="/location" className="underline text-primary">View Leaderboard</Link>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Visualized Metrics</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/20">
            <div className="grid gap-4">
              {metricItems.map((m) => (
                <div key={m.key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{m.label}</div>
                    <div className="text-sm font-bold">{m.value}%</div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-4 overflow-hidden">
                    <div
                      className={`${m.color} h-4 rounded-full transition-all duration-700`}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground">Source: {showSubmissionPreview && latestSubmission ? "Your Submission (preview)" : `Top: ${topSchool?.name}`}</p>
            </div>

            {showSubmissionPreview && !latestSubmission && (
              <p className="mt-2 text-muted-foreground">No submission available to preview.</p>
            )}
            {showSubmissionPreview && latestSubmission && (
              <p className="mt-2 font-medium text-yellow-500">This is your submitted data (pending admin approval)</p>
            )}
            {!showSubmissionPreview && (
              <p className="mt-2 font-medium text-green-500">Showing preexisting school data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
