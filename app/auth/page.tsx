"use client"
import { useState } from "react"
import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ChevronLeft, UserCircle, UserPlus, Mail, Lock, User, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { TEMP_ADMIN } from "@/data/temp-admin"
import { volunteerOpportunities, type Opportunity } from "@/data/volunteer-opportunities"

interface CharityUser {
  id: number
  name: string
  email: string
  password: string
  userType: "school" | "ngo" | "admin" | "student" | "volunteer"
  schoolName?: string
}

const schoolOptions = ["Dunes International School", "ADIS", "SEPS", "Repton", "The British International School"]

function CustomSelect(props: {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  const { options, value, onChange, placeholder } = props
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-10 flex items-center justify-between px-3 border rounded-md bg-muted/50"
      >
        <span className={`${value ? "text-foreground" : "text-muted-foreground"}`}>
          {value || placeholder || "Select"}
        </span>
        <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <ul className="absolute z-40 mt-1 w-full bg-background border rounded-md max-h-52 overflow-auto">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className="w-full text-left px-3 py-2 hover:bg-muted/30"
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn")
  const [userType, setUserType] = useState<"school" | "ngo" | "student" | "volunteer">("volunteer")
  const [formData, setFormData] = useState({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [showPostSignup, setShowPostSignup] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [onboardingAnswers, setOnboardingAnswers] = useState({ category: "", emirate: "", skill: "" })
  const [suggestions, setSuggestions] = useState<Opportunity[]>([])

  const normalizedOpportunities: Opportunity[] = volunteerOpportunities.map((o: any) => ({
    ...o,
    volunteers: o.volunteers ?? o.numberOfVolunteers ?? undefined,
    commitment: o.commitment ?? o.time ?? undefined,
  })) as Opportunity[]

  const categories = Array.from(new Set(normalizedOpportunities.map((o) => o.category).filter((v): v is string => !!v)))
  const emirates = Array.from(new Set(normalizedOpportunities.map((o) => o.emirate).filter((v): v is string => !!v)))
  const skills = Array.from(
    new Set(normalizedOpportunities.flatMap((o) => o.skills || []).filter((v): v is string => !!v)),
  )

  const runDecisionTree = (answers: typeof onboardingAnswers) => {
    const { category, emirate, skill } = answers
    if (!category && !emirate && !skill) return []
    const scoreMap = new Map<number, number>()
    normalizedOpportunities.forEach((o) => {
      let score = 0
      if (category && o.category && o.category.toLowerCase() === category.toLowerCase()) score += 2
      if (skill && o.skills && o.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())) score += 2
      if (emirate) {
        if (emirate.toLowerCase() === "remote" && o.remote) score += 2
        else if (o.emirate && o.emirate.toLowerCase() === emirate.toLowerCase()) score += 1
      }
      if (score > 0) scoreMap.set(o.id, score)
    })
    const matches = [...scoreMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => normalizedOpportunities.find((o) => o.id === id)!)
      .slice(0, 6)
    return matches
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setError("")
    if (!formData.email || !formData.password || (mode === "signUp" && !formData.name)) {
      setError("All required fields must be filled!")
      setIsSubmitting(false)
      return
    }
    if (mode === "signIn" && formData.email === TEMP_ADMIN.email && formData.password === TEMP_ADMIN.password) {
      const storedUsersData = localStorage.getItem("charityUsers")
      const existingUsers: CharityUser[] = storedUsersData ? JSON.parse(storedUsersData) : []
      let tempUser = existingUsers.find((u) => u.email === TEMP_ADMIN.email)
      if (!tempUser) {
        tempUser = {
          id: Date.now(),
          name: TEMP_ADMIN.name,
          email: TEMP_ADMIN.email,
          password: TEMP_ADMIN.password,
          userType: "admin",
        }
        localStorage.setItem("charityUsers", JSON.stringify([...existingUsers, tempUser]))
      }
      localStorage.setItem("currentUser", TEMP_ADMIN.email)
      setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
      setIsSubmitting(false)
      router.push("/")
      return
    }
    const storedUsersData = localStorage.getItem("charityUsers")
    const existingUsers: CharityUser[] = storedUsersData ? JSON.parse(storedUsersData) : []
    if (mode === "signUp") {
      if (existingUsers.some((u) => u.email === formData.email)) {
        setError("Email already registered!")
        setIsSubmitting(false)
        return
      }
      const newUser: CharityUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType,
        schoolName: userType === "school" || userType === "student" ? formData.schoolName : undefined,
      }
      localStorage.setItem("charityUsers", JSON.stringify([...existingUsers, newUser]))
      localStorage.setItem("currentUser", newUser.email)
      setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
      setIsSubmitting(false)
      setShowPostSignup(true)
      return
    }
    const user = existingUsers.find((u) => u.email === formData.email && u.password === formData.password)
    if (!user) {
      setError("Invalid email or password!")
      setIsSubmitting(false)
      return
    }
    localStorage.setItem("currentUser", user.email)
    setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
    setIsSubmitting(false)
    router.push("/")
  }

  const finishOnboarding = () => {
    const currentUser = localStorage.getItem("currentUser")
    const matched = runDecisionTree(onboardingAnswers)
    setSuggestions(matched)
    if (currentUser) localStorage.setItem(`suggestions:${currentUser}`, JSON.stringify(matched))
    setShowOnboarding(false)
    setShowSuggestions(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Navigation />
      <Card
        className={cn(
          "max-w-md w-full transition-all duration-500 ease-out border-none shadow-2xl",
          "bg-background/95 backdrop-blur-xl",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 hover:bg-muted/50 transition-all"
          onClick={() => router.push("/")}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <CardHeader className="space-y-4 pb-8 pt-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            {mode === "signIn" ? (
              <UserCircle className="w-8 h-8 text-primary" />
            ) : (
              <UserPlus className="w-8 h-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            {mode === "signIn" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "signIn" ? "Sign in to continue your journey" : "Join us to make a difference"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="text-destructive text-sm text-center p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              {error}
            </div>
          )}

          {showPostSignup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-md bg-background rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Account created</h3>
                <p className="text-sm text-muted-foreground mb-4">Welcome! Click Okay to set up your preferences.</p>
                <div className="mt-4 flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPostSignup(false)
                      router.push("/")
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowPostSignup(false)
                      setShowOnboarding(true)
                    }}
                  >
                    Okay
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showOnboarding && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-lg bg-background rounded-xl p-6 shadow-lg max-h-[90vh] overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Quick Onboarding</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Answer 3 quick questions to get tailored volunteer suggestions.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <CustomSelect
                    options={[""].concat(categories)}
                    value={onboardingAnswers.category}
                    onChange={(v) => setOnboardingAnswers((prev) => ({ ...prev, category: v }))}
                    placeholder="Any category"
                  />
                  <CustomSelect
                    options={["Remote"].concat(emirates)}
                    value={onboardingAnswers.emirate}
                    onChange={(v) => setOnboardingAnswers((prev) => ({ ...prev, emirate: v }))}
                    placeholder="Any emirate"
                  />
                  <CustomSelect
                    options={[""].concat(skills)}
                    value={onboardingAnswers.skill}
                    onChange={(v) => setOnboardingAnswers((prev) => ({ ...prev, skill: v }))}
                    placeholder="Any skill"
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowOnboarding(false)
                      router.push("/")
                    }}
                  >
                    Close
                  </Button>
                  <Button onClick={finishOnboarding}>Show suggestions</Button>
                </div>
              </div>
            </div>
          )}

          {showSuggestions && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-lg bg-background rounded-xl p-6 shadow-lg max-h-[90vh] overflow-auto relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setShowSuggestions(false)
                    router.push("/")
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
                <h3 className="text-lg font-semibold mb-2">Your Personalized Suggestions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your preferences, here are volunteer opportunities we think you'll love!
                </p>
                {suggestions.length > 0 ? (
                  <div className="space-y-3">
                    {suggestions.map((s) => (
                      <div key={s.id} className="p-3 rounded-lg border bg-muted/20">
                        <div className="font-semibold">{s.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {s.organization} • {s.emirate}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{(s.skills || []).join(", ")}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No specific matches found, but explore all opportunities on the platform!
                  </p>
                )}
              </div>
            </div>
          )}

          {mode === "signUp" && (
            <div className="flex justify-center gap-2 mb-2 flex-wrap">
              <Button
                size="sm"
                variant={userType === "volunteer" ? "default" : "outline"}
                onClick={() => setUserType("volunteer")}
              >
                Volunteer
              </Button>
              <Button
                size="sm"
                variant={userType === "student" ? "default" : "outline"}
                onClick={() => setUserType("student")}
              >
                Student
              </Button>
              <Button
                size="sm"
                variant={userType === "school" ? "default" : "outline"}
                onClick={() => setUserType("school")}
              >
                School
              </Button>
              <Button size="sm" variant={userType === "ngo" ? "default" : "outline"} onClick={() => setUserType("ngo")}>
                NGO
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signUp" && (
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="pl-11 h-12 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                  disabled={isSubmitting}
                />
              </div>
            )}

            {mode === "signUp" && (userType === "school" || userType === "student") && (
              <select
                className="w-full h-12 bg-muted/50 border-none pl-3 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                value={formData.schoolName}
                onChange={(e) => setFormData((prev) => ({ ...prev, schoolName: e.target.value }))}
                disabled={isSubmitting}
              >
                {schoolOptions.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            )}

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="pl-11 h-12 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                disabled={isSubmitting}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                required
                className="pl-11 h-12 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : mode === "signIn" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-transparent text-violet-300">
                {mode === "signIn" ? "New to danai?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="w-full h-12 font-medium hover:bg-muted/50"
            onClick={() => {
              setMode((prev) => (prev === "signIn" ? "signUp" : "signIn"))
              setUserType("volunteer")
              setFormData({ name: "", email: "", password: "", schoolName: schoolOptions[0] || "" })
              setError("")
              setIsSubmitting(false)
            }}
          >
            {mode === "signIn" ? "Create an account" : "Sign in instead"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
