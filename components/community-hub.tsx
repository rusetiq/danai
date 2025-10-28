"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Users,
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Star,
  Clock,
  ArrowRight,
  Send,
  Building2,
  Leaf,
  GraduationCap,
  Stethoscope,
  HandHeart,
} from "lucide-react"
import { SharedDataStore, type Community, type Event, type Post } from "@/lib/shared-data-store"

const categoryIcons: Record<string, any> = {
  "Humanitarian Aid": HandHeart,
  Education: GraduationCap,
  Environment: Leaf,
  Healthcare: Stethoscope,
  "Social Welfare": Users,
  "Disability Support": Heart,
}

const communities: Community[] = [
  {
    id: 1,
    name: "Emirates Red Crescent",
    description:
      "Leading humanitarian organization providing aid and disaster relief across the UAE and internationally.",
    members: 1250,
    category: "Humanitarian Aid",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
    rating: 4.9,
    events: 25,
    posts: 189,
  },
  {
    id: 2,
    name: "Dubai Cares",
    description:
      "Improving access to quality education for children in developing countries through integrated programs.",
    members: 890,
    category: "Education",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
    rating: 4.8,
    events: 18,
    posts: 156,
  },
  {
    id: 3,
    name: "Emirates Environmental Group",
    description: "Environmental awareness and conservation initiatives across the UAE for a sustainable future.",
    members: 445,
    category: "Environment",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
    rating: 4.7,
    events: 15,
    posts: 203,
  },
  {
    id: 4,
    name: "Al Jalila Foundation",
    description: "Advancing healthcare through medical education, research and treatment for the Arab world.",
    members: 567,
    category: "Healthcare",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    rating: 4.9,
    events: 12,
    posts: 134,
  },
  {
    id: 5,
    name: "Beit Al Khair Society",
    description:
      "Comprehensive social services including housing, healthcare, and education support for families in need.",
    members: 734,
    category: "Social Welfare",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
    rating: 4.8,
    events: 22,
    posts: 198,
  },
  {
    id: 6,
    name: "Zayed Higher Organization",
    description: "Comprehensive care and rehabilitation services for people with disabilities across the UAE.",
    members: 312,
    category: "Disability Support",
    location: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop",
    rating: 4.9,
    events: 20,
    posts: 156,
  },
]

const events: Event[] = [
  {
    id: 1,
    title: "Ramadan Food Distribution",
    community: "Emirates Red Crescent",
    date: "2024-03-15",
    time: "8:00 AM",
    location: "Dubai Community Center",
    attendees: 85,
    maxAttendees: 100,
    description:
      "Join us in distributing food packages to families in need during Ramadan. Volunteers needed for packing and delivery.",
    category: "Humanitarian Aid",
  },
  {
    id: 2,
    title: "Youth Mentorship Program",
    community: "Dubai Cares",
    date: "2024-03-18",
    time: "3:00 PM",
    location: "Dubai Knowledge Park",
    attendees: 45,
    maxAttendees: 50,
    description:
      "Mentor students from developing countries studying in the UAE. Share your expertise and inspire future leaders.",
    category: "Education",
  },
  {
    id: 3,
    title: "Beach Cleanup Initiative",
    community: "Emirates Environmental Group",
    date: "2024-03-20",
    time: "7:00 AM",
    location: "Jumeirah Beach",
    attendees: 120,
    maxAttendees: 150,
    description: "Help keep our beaches clean. Join us for a morning beach cleanup with refreshments provided.",
    category: "Environment",
  },
  {
    id: 4,
    title: "Medical Research Fundraiser",
    community: "Al Jalila Foundation",
    date: "2024-03-22",
    time: "6:00 PM",
    location: "Burj Khalifa Area",
    attendees: 180,
    maxAttendees: 200,
    description: "Annual fundraising gala to support medical research and treatment programs across the region.",
    category: "Healthcare",
  },
]

const categoryColors = {
  "Humanitarian Aid": "bg-red-500/20 text-red-400 border-red-500/30",
  Education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Environment: "bg-green-500/20 text-green-400 border-green-500/30",
  Healthcare: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Social Welfare": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Disability Support": "bg-pink-500/20 text-pink-400 border-pink-500/30",
}

function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
}

export function CommunityHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("communities")
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostContent, setNewPostContent] = useState("")
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null)
  const [userJoins, setUserJoins] = useState({
    communities: [] as number[],
    events: [] as number[],
    opportunities: [] as number[],
  })

  useEffect(() => {
    SharedDataStore.initializeSampleData()

    const userEmail = localStorage.getItem("currentUser")
    if (userEmail) {
      const usersData = localStorage.getItem("charityUsers")
      if (usersData) {
        const users = JSON.parse(usersData)
        const user = users.find((u: any) => u.email === userEmail)
        if (user) {
          setCurrentUser({ email: user.email, name: user.name })
        }
      }
    }
    loadPosts()
    loadUserJoins()
  }, [])

  const loadPosts = () => {
    setPosts(SharedDataStore.getPosts())
  }

  const loadUserJoins = () => {
    const userEmail = localStorage.getItem("currentUser")
    if (userEmail) {
      setUserJoins(SharedDataStore.getUserJoins(userEmail))
    }
  }

  const handlePostSubmit = () => {
    if (!newPostContent.trim() || !currentUser) return

    SharedDataStore.addPost({
      author: currentUser.name,
      authorEmail: currentUser.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`,
      community: "General",
      content: newPostContent,
    })

    setNewPostContent("")
    loadPosts()
  }

  const handleToggleLike = (postId: number) => {
    if (!currentUser) return
    SharedDataStore.toggleLike(postId, currentUser.email)
    loadPosts()
  }

  const handleJoinCommunity = (communityId: number) => {
    if (!currentUser) return
    SharedDataStore.toggleJoinCommunity(currentUser.email, communityId)
    loadUserJoins()
  }

  const handleJoinEvent = (eventId: number) => {
    if (!currentUser) return
    SharedDataStore.toggleJoinEvent(currentUser.email, eventId)
    loadUserJoins()
  }

  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPosts = posts.filter(
    (p) =>
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.community.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-16 relative overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Connect with <span className="text-fuchsia-200">UAE</span> communities
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Join charity organizations, discover volunteer opportunities, and share your impact with like-minded
            individuals.
          </p>
        </div>

        <div className="rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20 bg-neutral-800/40">
          <div className="mb-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search communities, events, or posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-lg bg-neutral-900/50 border-gray-700 placeholder-gray-400 text-sm focus:ring-purple-500"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-lg bg-neutral-900/50 border border-purple-500/20 text-sm">
              <TabsTrigger
                value="communities"
                className="flex items-center justify-center gap-2 py-1 rounded-lg hover:bg-purple-700/20 transition"
              >
                <Users className="w-3 h-3" />
                <span className="hidden sm:inline">Communities</span>
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="flex items-center justify-center gap-2 py-1 rounded-lg hover:bg-purple-700/20 transition"
              >
                <Calendar className="w-3 h-3" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger
                value="feed"
                className="flex items-center justify-center gap-2 py-1 rounded-lg hover:bg-purple-700/20 transition"
              >
                <MessageCircle className="w-3 h-3" />
                <span className="hidden sm:inline">Feed</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="communities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCommunities.map((c) => {
                  const Icon = categoryIcons[c.category] || Building2
                  const isJoined = userJoins.communities.includes(c.id)
                  return (
                    <Card
                      key={c.id}
                      className="bg-neutral-800/60 border border-purple-500/20 rounded-xl overflow-hidden hover:scale-[1.01] transition-transform text-sm"
                    >
                      <div className="p-3">
                        <div className="relative rounded-lg overflow-hidden mb-3">
                          <img
                            src={c.image || "/placeholder.svg"}
                            alt={c.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge
                              variant="outline"
                              className={categoryColors[c.category as keyof typeof categoryColors]}
                            >
                              <Icon className="w-3 h-3 mr-1" />
                              {c.category}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2 bg-black/30 rounded-full px-2 py-0.5 flex items-center gap-1 text-white text-xs">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            {c.rating}
                          </div>
                        </div>

                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-white">{c.name}</span>
                          {isJoined && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Joined</Badge>
                          )}
                        </div>
                        <p className="text-gray-300 text-xs mb-2">{c.description}</p>

                        <div className="flex justify-between text-gray-400 text-xs mb-2">
                          <span>{c.members} Members</span>
                          <span>{c.events} Events</span>
                          <span>{c.posts} Posts</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                          <MapPin className="w-3 h-3" /> {c.location}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleJoinCommunity(c.id)}
                            className={`flex-1 text-xs py-1 ${isJoined ? "bg-gray-600 hover:bg-gray-500" : "bg-gradient-to-r from-purple-500 to-blue-300 hover:from-purple-700 hover:to-blue-700"}`}
                          >
                            {isJoined ? "Leave" : "Join"}
                          </Button>
                          <Button
                            variant="outline"
                            className="border border-purple-500/30 text-gray-300 py-1 bg-transparent"
                          >
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map((e) => {
                  const isRegistered = userJoins.events.includes(e.id)
                  return (
                    <Card
                      key={e.id}
                      className="bg-neutral-800/60 border border-purple-500/20 rounded-xl overflow-hidden hover:scale-[1.01] transition-transform text-sm p-3"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-white">{e.title}</span>
                        <Badge variant="outline" className={categoryColors[e.category as keyof typeof categoryColors]}>
                          {e.category}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-xs mb-1">{e.community}</p>
                      <p className="text-gray-400 text-xs mb-2">{e.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-gray-400 text-xs mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(e.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {e.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {e.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {e.attendees}/{e.maxAttendees}
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(e.attendees / e.maxAttendees) * 100}%` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleJoinEvent(e.id)}
                          className={`flex-1 text-xs py-1 ${isRegistered ? "bg-gray-700 hover:bg-gray-600" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}`}
                        >
                          {isRegistered ? "Registered" : "Register"}
                          {!isRegistered && <ArrowRight className="w-3 h-3 ml-1" />}
                        </Button>
                        <Button
                          variant="outline"
                          className="border border-purple-500/30 text-gray-300 py-1 bg-transparent"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="feed" className="mt-6">
              {currentUser && (
                <Card className="bg-neutral-800/60 border border-purple-500/20 rounded-xl p-4 mb-4">
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`} />
                      <AvatarFallback>
                        {currentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your volunteer experience..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="bg-neutral-900/50 border-gray-700 text-sm min-h-[80px] mb-2"
                      />
                      <Button
                        onClick={handlePostSubmit}
                        disabled={!newPostContent.trim()}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                {filteredPosts.map((p) => {
                  const isLiked = currentUser ? p.likedBy.includes(currentUser.email) : false
                  return (
                    <Card
                      key={p.id}
                      className="bg-neutral-800/60 border border-purple-500/20 rounded-xl overflow-hidden hover:scale-[1.01] transition-transform text-sm p-3"
                    >
                      <div className="flex items-start gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={p.avatar || "/placeholder.svg"} alt={p.author} />
                          <AvatarFallback>
                            {p.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <span className="font-semibold text-white text-xs">{p.author}</span>
                              <p className="text-gray-400 text-[10px]">
                                {p.community} • {getTimeAgo(p.timestamp)}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-xs mb-2">{p.content}</p>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleLike(p.id)}
                              className={`flex items-center gap-1 h-6 px-2 ${isLiked ? "text-red-400" : "text-gray-400"}`}
                            >
                              <Heart className={`w-3 h-3 ${isLiked ? "fill-current" : ""}`} /> {p.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 text-gray-400 h-6 px-2"
                            >
                              <MessageCircle className="w-3 h-3" /> {p.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 text-gray-400 h-6 px-2"
                            >
                              <Share2 className="w-3 h-3" /> <span className="hidden sm:inline text-xs">Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
