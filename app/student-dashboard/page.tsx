"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, TrendingUp, Heart, Clock, Trophy, Sparkles, Target, BookOpen } from "lucide-react"
import { SharedDataStore } from "@/lib/shared-data-store"
import { volunteerOpportunities } from "@/data/volunteer-opportunities"
import { mockSchools } from "@/components/location-service"

export default function StudentDashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [userName, setUserName] = useState("")
  const [userSchool, setUserSchool] = useState("")
  const [userCredits, setUserCredits] = useState(0)
  const [joinedOpportunities, setJoinedOpportunities] = useState<number[]>([])
  const [volunteerHours, setVolunteerHours] = useState(0)

  useEffect(() => {
    const email = localStorage.getItem("currentUser")
    if (!email) {
      router.push("/auth")
      return
    }
    setCurrentUser(email)

    const usersData = localStorage.getItem("charityUsers")
    if (usersData) {
      const users = JSON.parse(usersData)
      const user = users.find((u: any) => u.email === email)
      if (user) {
        setUserName(user.name)
        setUserSchool(user.schoolName || "")
      }
    }

    const creditsData = localStorage.getItem(`credits:${email}`)
    setUserCredits(creditsData ? Number.parseInt(creditsData) : 150)

    const joins = SharedDataStore.getUserJoins(email)
    setJoinedOpportunities(joins.opportunities)

    const activitiesData = localStorage.getItem(`activities:${email}`)
    if (activitiesData) {
      const activities = JSON.parse(activitiesData)
      const totalHours = activities.reduce((sum: number, act: any) => sum + (act.hours || 0), 0)
      setVolunteerHours(totalHours)
    }
  }, [router])

  const schoolData = mockSchools.find((s) => s.name === userSchool)
  const joinedOppsList = volunteerOpportunities.filter((opp) => joinedOpportunities.includes(opp.id))

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome back, {userName}!
          </h1>
          <p className="text-muted-foreground">{userSchool && `${userSchool} • `}Student Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Credits Earned</p>
                  <p className="text-3xl font-bold text-primary">{userCredits}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Volunteer Hours</p>
                  <p className="text-3xl font-bold text-primary">{volunteerHours}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
                  <p className="text-3xl font-bold text-primary">{joinedOpportunities.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">School Rank</p>
                  <p className="text-3xl font-bold text-primary">#{schoolData?.rank || "N/A"}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {schoolData && (
          <Card className="glass border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Your School's Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{schoolData.name}</h3>
                    <Badge className="bg-primary/20 text-primary">Rank #{schoolData.rank}</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sustainability Score</span>
                      <span className="font-bold text-primary">{schoolData.score} pts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Weekly Emissions</span>
                      <span className="font-bold">{schoolData.emissions} tons CO₂</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Certification</span>
                      <Badge variant="outline" className="text-xs">
                        {schoolData.certification}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold mb-2">Key Metrics</h4>
                  {[
                    { label: "Waste Management", value: schoolData.metrics.wasteManagement, color: "bg-green-500" },
                    { label: "Energy Efficiency", value: schoolData.metrics.energyEfficiency, color: "bg-yellow-500" },
                    {
                      label: "Sustainability Projects",
                      value: schoolData.metrics.sustainabilityProjects,
                      color: "bg-blue-500",
                    },
                    { label: "Water Conservation", value: schoolData.metrics.waterConservation, color: "bg-cyan-500" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="font-semibold">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div
                          className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="glass border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              My Active Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {joinedOppsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {joinedOppsList.map((opp) => (
                  <div key={opp.id} className="glass rounded-lg p-4 border border-border/50">
                    <h4 className="font-semibold mb-1">{opp.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{opp.organization}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Badge variant="outline" className="text-xs">
                        {opp.category}
                      </Badge>
                      <span>•</span>
                      <span>{opp.emirate}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => router.push("/opportunities")}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">You haven't joined any opportunities yet</p>
                <Button onClick={() => router.push("/opportunities")}>Explore Opportunities</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => router.push("/opportunities")}
              >
                <Heart className="w-4 h-4 mr-2" />
                Find New Opportunities
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => router.push("/rewards")}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Redeem Rewards
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => router.push("/community")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Join Community
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => router.push("/location")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                View School Leaderboard
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Impact Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Impact</p>
                  <p className="text-2xl font-bold text-primary">{volunteerHours * 2} people helped</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on your volunteer hours</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Next Milestone</p>
                  <p className="text-lg font-bold">50 hours</p>
                  <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((volunteerHours / 50) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{Math.max(0, 50 - volunteerHours)} hours to go</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
