"use client"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, Heart, MapPin, Star, Clock, TrendingUp } from "lucide-react"
import { SharedDataStore } from "@/lib/shared-data-store"
import { volunteerOpportunities } from "@/data/volunteer-opportunities"
import { useRouter } from "next/navigation"

const communities = [
  {
    id: 1,
    name: "Emirates Red Crescent",
    category: "Humanitarian Aid",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Dubai Cares",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Emirates Environmental Group",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Al Jalila Foundation",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Beit Al Khair Society",
    category: "Social Welfare",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Zayed Higher Organization",
    category: "Disability Support",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop",
  },
]

const events = [
  {
    id: 1,
    title: "Ramadan Food Distribution",
    community: "Emirates Red Crescent",
    date: "2024-03-15",
    location: "Dubai Community Center",
  },
  {
    id: 2,
    title: "Youth Mentorship Program",
    community: "Dubai Cares",
    date: "2024-03-18",
    location: "Dubai Knowledge Park",
  },
  {
    id: 3,
    title: "Beach Cleanup Initiative",
    community: "Emirates Environmental Group",
    date: "2024-03-20",
    location: "Jumeirah Beach",
  },
  {
    id: 4,
    title: "Medical Research Fundraiser",
    community: "Al Jalila Foundation",
    date: "2024-03-22",
    location: "Burj Khalifa Area",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null)
  const [userJoins, setUserJoins] = useState({
    communities: [] as number[],
    events: [] as number[],
    opportunities: [] as number[],
  })
  const [userPosts, setUserPosts] = useState<any[]>([])
  const [userActivities, setUserActivities] = useState<any[]>([])

  useEffect(() => {
    const userEmail = localStorage.getItem("currentUser")
    if (!userEmail) {
      router.push("/auth")
      return
    }

    const usersData = localStorage.getItem("charityUsers")
    if (usersData) {
      const users = JSON.parse(usersData)
      const user = users.find((u: any) => u.email === userEmail)
      if (user) {
        setCurrentUser({ email: user.email, name: user.name })
        const joins = SharedDataStore.getUserJoins(user.email)
        setUserJoins(joins)

        const allPosts = SharedDataStore.getPosts()
        const myPosts = allPosts.filter((p) => p.authorEmail === user.email)
        setUserPosts(myPosts)

        const activities = SharedDataStore.getActivities(user.email)
        setUserActivities(activities)
      }
    }
  }, [router])

  if (!currentUser) {
    return null
  }

  const joinedCommunities = communities.filter((c) => userJoins.communities.includes(c.id))
  const joinedEvents = events.filter((e) => userJoins.events.includes(e.id))
  const joinedOpportunities = volunteerOpportunities.filter((o) => userJoins.opportunities.includes(o.id))

  const totalHours = userActivities.reduce((sum, activity) => sum + activity.hours, 0)
  const completedActivities = userActivities.filter((a) => a.status === "completed").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`} />
              <AvatarFallback>
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{currentUser.name}</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{userJoins.communities.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Communities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{userJoins.events.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{userJoins.opportunities.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{userPosts.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{totalHours}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{completedActivities}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Card className="glass border-border/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <TrendingUp className="w-5 h-5" />
                My Volunteering Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userActivities.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {userActivities.map((activity) => (
                    <div key={activity.id} className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-start gap-2 mb-1">
                            <h3 className="font-semibold text-base sm:text-lg">{activity.title}</h3>
                            <Badge
                              variant={
                                activity.status === "completed"
                                  ? "default"
                                  : activity.status === "ongoing"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs shrink-0"
                            >
                              {activity.status}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">{activity.organization}</p>
                          <p className="text-xs sm:text-sm text-foreground/80 mb-2">{activity.description}</p>
                        </div>
                        <div className="flex sm:flex-col gap-2 sm:gap-1 text-xs sm:text-sm text-muted-foreground shrink-0">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.hours}h
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <Badge variant="secondary" className="text-xs">
                          {activity.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                          <TrendingUp className="w-3 h-3" />
                          {activity.impact}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No activities recorded yet</p>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="w-5 h-5" />
                My Communities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {joinedCommunities.length > 0 ? (
                <div className="space-y-3">
                  {joinedCommunities.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <img
                        src={c.image || "/placeholder.svg"}
                        alt={c.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-sm sm:text-base truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8 text-sm">No communities joined yet</p>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Calendar className="w-5 h-5" />
                My Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {joinedEvents.length > 0 ? (
                <div className="space-y-3">
                  {joinedEvents.map((e) => (
                    <div key={e.id} className="p-3 rounded-lg bg-muted/30">
                      <p className="font-semibold text-sm sm:text-base">{e.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{e.community}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(e.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {e.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8 text-sm">No events registered yet</p>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-border/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Heart className="w-5 h-5" />
                My Volunteer Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {joinedOpportunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {joinedOpportunities.map((o) => (
                    <div key={o.id} className="p-4 rounded-lg bg-muted/30">
                      <p className="font-semibold mb-1 text-sm sm:text-base">{o.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{o.organization}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {o.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {o.location}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8 text-sm">No opportunities joined yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
