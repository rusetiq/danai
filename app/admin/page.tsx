"use client"
import { useState, useEffect } from "react"
import { useAdminStats } from "@/data/admin-stats"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SharedDataStore } from "@/lib/shared-data-store"

interface SchoolMetrics {
  id?: number
  schoolName?: string
  recyclingRates: string
  wasteReduction: string
  renewableEnergy: string
  conservationEfforts: string
  studentInitiatives: string
  greenPrograms: string
  usageReduction: string
  harvestingSystems: string
  approved?: boolean
  submittedAt?: string
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
  category?: string
  urgency?: string
  remote?: boolean
  rating?: number
  impact?: string
  skills?: string[]
  date?: string
}

export default function AdminPage() {
  const stats = useAdminStats(4000)
  const [schoolSubmissions, setSchoolSubmissions] = useState<SchoolMetrics[]>([])
  const [ngoSubmissions, setNgoSubmissions] = useState<Opportunity[]>([])
  const [volunteerOpportunities, setVolunteerOpportunities] = useState<Opportunity[]>([])
  const [approvedCounts, setApprovedCounts] = useState({ schools: 0, opportunities: 0 })
  const [users, setUsers] = useState<Array<{ email: string; name: string; credits: number; userType: string }>>([])
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [pointsAmount, setPointsAmount] = useState<string>("")

  const refreshData = () => {
    const storedSubmissions = localStorage.getItem("schoolSubmissions")
    if (storedSubmissions) {
      const parsed = JSON.parse(storedSubmissions)
      setSchoolSubmissions(parsed)
    }

    const storedNgo = localStorage.getItem("ngoSubmissions")
    if (storedNgo) {
      const parsed = JSON.parse(storedNgo)
      setNgoSubmissions(parsed)
    }

    const approvedSchoolsRaw = localStorage.getItem("approvedSchools")
    const approvedSchools = approvedSchoolsRaw ? JSON.parse(approvedSchoolsRaw) : []
    const approvedOppsRaw = localStorage.getItem("volunteerOpportunities")
    const approvedOpps = approvedOppsRaw ? JSON.parse(approvedOppsRaw) : []
    setApprovedCounts({
      schools: approvedSchools.filter((s: any) => s.approved).length,
      opportunities: approvedOpps.filter((o: any) => o.approved).length,
    })
    setVolunteerOpportunities(approvedOpps)

    setUsers(SharedDataStore.getAllUsers())
  }

  useEffect(() => {
    refreshData()
    const interval = setInterval(refreshData, 5000)
    return () => clearInterval(interval)
  }, [])

  const parseNumber = (s: string | undefined) => {
    if (!s) return 0
    const m = String(s).match(/(\d+(\.\d+)?)/)
    return m ? Math.min(100, Math.round(Number(m[0]))) : 0
  }

  const approveSchoolSubmission = (index: number) => {
    const submission = schoolSubmissions[index]
    if (!submission) return

    const updatedPending = schoolSubmissions.filter((_, i) => i !== index)
    setSchoolSubmissions(updatedPending)
    localStorage.setItem("schoolSubmissions", JSON.stringify(updatedPending))

    const approvedSchoolsRaw = localStorage.getItem("approvedSchools")
    const approvedSchools = approvedSchoolsRaw ? JSON.parse(approvedSchoolsRaw) : []
    const mapped = {
      id: submission.id || Date.now(),
      name: submission.schoolName || `School ${Date.now()}`,
      emissions: 0,
      score: Math.floor(Math.random() * 30) + 70,
      rank: approvedSchools.length + 1,
      alerts: [],
      certification: "bronze" as const,
      approved: true,
      metrics: {
        wasteManagement: parseNumber(submission.recyclingRates),
        energyEfficiency: parseNumber(submission.renewableEnergy),
        sustainabilityProjects: parseNumber(submission.studentInitiatives),
        waterConservation: parseNumber(submission.usageReduction),
      },
      improvements: [submission.wasteReduction, submission.greenPrograms].filter(Boolean),
    }
    localStorage.setItem("approvedSchools", JSON.stringify([...approvedSchools, mapped]))
    refreshData()
  }

  const approveOpportunity = (id: number) => {
    const submission = ngoSubmissions.find((o) => o.id === id)
    if (!submission) return

    const updatedPending = ngoSubmissions.filter((o) => o.id !== id)
    setNgoSubmissions(updatedPending)
    localStorage.setItem("ngoSubmissions", JSON.stringify(updatedPending))

    const stored = localStorage.getItem("volunteerOpportunities")
    const approved = stored ? JSON.parse(stored) : []
    const updatedApproved = [...approved, { ...submission, approved: true }]
    localStorage.setItem("volunteerOpportunities", JSON.stringify(updatedApproved))
    setVolunteerOpportunities(updatedApproved)
    refreshData()
  }

  const deleteOpportunity = (id: number) => {
    const updated = ngoSubmissions.filter((o) => o.id !== id)
    setNgoSubmissions(updated)
    localStorage.setItem("ngoSubmissions", JSON.stringify(updated))
  }

  const handleAddPoints = () => {
    if (!selectedUser || !pointsAmount) return
    const amount = Number.parseInt(pointsAmount)
    if (isNaN(amount)) return

    SharedDataStore.adjustUserCredits(selectedUser, amount)
    setPointsAmount("")
    refreshData()
  }

  const handleSubtractPoints = () => {
    if (!selectedUser || !pointsAmount) return
    const amount = Number.parseInt(pointsAmount)
    if (isNaN(amount)) return

    SharedDataStore.adjustUserCredits(selectedUser, -amount)
    setPointsAmount("")
    refreshData()
  }

  return (
    <div className="max-w-5xl mx-auto py-24 space-y-12 px-4">
      <Navigation />
      <h1 className="text-3xl sm:text-4xl font-bold text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Approved Schools</div>
            <div className="text-2xl font-bold text-primary">{stats.approvedSchools}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Approved Opportunities</div>
            <div className="text-2xl font-bold text-primary">{stats.approvedOpportunities}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Pending Schools</div>
            <div className="text-2xl font-bold">{stats.pendingSchools}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Pending Opportunities</div>
            <div className="text-2xl font-bold">{stats.pendingOpportunities}</div>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Manage User Reward Points</h2>
        <Card className="glass border-border/50 p-4 sm:p-6">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select User</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Choose a user...</option>
                {users.map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.name} ({user.email}) - {user.credits} credits
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Points Amount</label>
              <Input
                type="number"
                value={pointsAmount}
                onChange={(e) => setPointsAmount(e.target.value)}
                placeholder="Enter points amount"
                className="bg-background/50 border-border/50"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddPoints}
                disabled={!selectedUser || !pointsAmount}
                className="flex-1 bg-primary hover:bg-primary/90 rounded-xl"
              >
                Add Points
              </Button>
              <Button
                onClick={handleSubtractPoints}
                disabled={!selectedUser || !pointsAmount}
                className="flex-1 bg-destructive hover:bg-destructive/90 rounded-xl"
              >
                Subtract Points
              </Button>
            </div>

            {selectedUser && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  Current balance for <strong>{users.find((u) => u.email === selectedUser)?.name}</strong>:{" "}
                  <strong className="text-primary">
                    {users.find((u) => u.email === selectedUser)?.credits || 0} credits
                  </strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/50 p-4 sm:p-6">
          <CardHeader>
            <CardTitle className="text-lg">All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.email}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-background/30 rounded-lg gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="whitespace-nowrap">
                      {user.userType}
                    </Badge>
                    <span className="font-bold text-primary whitespace-nowrap">{user.credits} credits</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">School Submissions (Pending)</h2>
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
                  <p>
                    <strong>Recycling Rates:</strong> {s.recyclingRates}
                  </p>
                  <p>
                    <strong>Waste Reduction:</strong> {s.wasteReduction}
                  </p>
                  <p>
                    <strong>Renewable Energy:</strong> {s.renewableEnergy}
                  </p>
                  <p>
                    <strong>Conservation Efforts:</strong> {s.conservationEfforts}
                  </p>
                  <p>
                    <strong>Student Initiatives:</strong> {s.studentInitiatives}
                  </p>
                  <p>
                    <strong>Green Programs:</strong> {s.greenPrograms}
                  </p>
                  <p>
                    <strong>Usage Reduction:</strong> {s.usageReduction}
                  </p>
                  <p>
                    <strong>Harvesting Systems:</strong> {s.harvestingSystems}
                  </p>
                  <div className="mt-2 flex gap-2 items-center">
                    <Button
                      onClick={() => approveSchoolSubmission(idx)}
                      className="bg-primary hover:bg-primary/90 rounded-xl px-4 py-2"
                    >
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">NGO Submissions (Pending)</h2>
        {ngoSubmissions.length === 0 ? (
          <p className="text-muted-foreground">No NGO submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {ngoSubmissions.map((opp) => (
              <Card key={opp.id} className="p-4">
                <CardHeader>
                  <CardTitle>{opp.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p>
                    <strong>Organization:</strong> {opp.organization}
                  </p>
                  <p>
                    <strong>Emirate:</strong> {opp.emirate}
                  </p>
                  <p>
                    <strong>Description:</strong> {opp.description}
                  </p>
                  <p>
                    <strong>Location:</strong> {opp.location}
                  </p>
                  <p>
                    <strong>Time:</strong> {opp.time}
                  </p>
                  <p>
                    <strong>Duration:</strong> {opp.duration}
                  </p>
                  <p>
                    <strong>Volunteers Needed:</strong> {opp.numberOfVolunteers}
                  </p>
                  <div className="mt-2 flex gap-2 items-center">
                    <Button
                      onClick={() => approveOpportunity(opp.id)}
                      className="bg-primary hover:bg-primary/90 rounded-xl px-4 py-2"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => deleteOpportunity(opp.id)}
                      className="bg-destructive hover:bg-destructive/90 rounded-xl px-4 py-2"
                    >
                      Delete
                    </Button>
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
