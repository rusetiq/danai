"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Building2, MapPin, Briefcase, Save, Camera } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  bio: string
  location: string
  organization: string
  skills: string
  interests: string
  avatar: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    bio: "",
    location: "",
    organization: "",
    skills: "",
    interests: "",
    avatar: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/auth")
      return
    }
    setCurrentUser(user)

    const usersData = localStorage.getItem("charityUsers")
    const users = usersData ? JSON.parse(usersData) : []
    const userData = users.find((u: any) => u.email === user)

    const profileData = localStorage.getItem(`profile:${user}`)
    if (profileData) {
      setProfile(JSON.parse(profileData))
    } else if (userData) {
      setProfile({
        name: userData.name || "",
        email: userData.email || "",
        bio: "",
        location: "",
        organization: userData.schoolName || "",
        skills: "",
        interests: "",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.email)}`,
      })
    }
  }, [router])

  const handleSave = () => {
    if (!currentUser) return
    setIsSaving(true)
    localStorage.setItem(`profile:${currentUser}`, JSON.stringify(profile))
    setSaveMessage("Profile saved successfully!")
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage("")
    }, 2000)
  }

  const generateNewAvatar = () => {
    const seed = Math.random().toString(36).substring(7)
    setProfile({ ...profile, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}` })
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-24">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
            <p className="text-muted-foreground">Customize your profile information</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-primary/20"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={generateNewAvatar}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={generateNewAvatar}>
                Generate New Avatar
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <Input value={profile.email} disabled className="bg-muted/50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Organization
                </label>
                <Input
                  value={profile.organization}
                  onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                  placeholder="School or NGO name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Dubai, UAE"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Skills
                </label>
                <Input
                  value={profile.skills}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                  placeholder="Teaching, Event Planning, Arabic"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interests</label>
                <Input
                  value={profile.interests}
                  onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                  placeholder="Education, Environment, Healthcare"
                />
              </div>
            </div>

            {saveMessage && (
              <div className="text-center text-sm text-primary bg-primary/10 p-3 rounded-xl">{saveMessage}</div>
            )}

            <Button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
