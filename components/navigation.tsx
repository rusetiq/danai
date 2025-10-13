"use client"
import { useState, useEffect, useRef } from "react"
import { FlowerIcon, Users, Calendar, School2, Menu, X, UserCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  password: string
  userType?: "school" | "ngo" | "admin"
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    setIsAuth(false)
    setUser(null)
    setIsProfileDropdownOpen(false)
    setIsOpen(false)
  }

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem("currentUser")
    const storedUsersData = localStorage.getItem("charityUsers")
    const existingUsers: User[] = storedUsersData ? JSON.parse(storedUsersData) : []
    const currentUserEmail = storedCurrentUser
    setIsAuth(!!currentUserEmail)
    if (currentUserEmail) {
      const currentUser = existingUsers.find(u => u.email === currentUserEmail)
      setUser(currentUser || null)
    } else {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isProfileDropdownOpen])

  // Determine dashboard link
  const getDashboardLink = () => {
    if (!user?.userType) return null
    switch (user.userType) {
      case "admin":
        return "/admin"
      case "school":
        return "/school-dashboard"
      case "ngo":
        return "/ngo-dashboard"
      default:
        return null
    }
  }

  const dashboardLabel = () => {
    if (!user?.userType) return null
    switch (user.userType) {
      case "admin":
        return "Admin Page"
      case "school":
        return "School Dashboard"
      case "ngo":
        return "NGO Dashboard"
      default:
        return null
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FlowerIcon className="text-background"/>
            </div>
            <span className="text-xl font-bold">danai</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/community" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <Users className="w-4 h-4" />
              <span>Communities</span>
            </Link>
            <Link href="/opportunities" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Opportunities</span>
            </Link>
            <Link href="/location" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <School2 className="w-4 h-4" />
              <span>Schools</span>
            </Link>
          </div>

          {/* Profile / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 relative">
            {!isAuth ? (
              <>
                <Button variant="outline" size="default" className="glass-hover" onClick={() => router.push("/auth")}>
                  Sign In
                </Button>
                <Button size="default" className="bg-primary hover:bg-primary/90" onClick={() => router.push("/auth")}>
                  Get Started
                </Button>
              </>
            ) : (
              <div className="relative">
                <Button
                  variant="outline"
                  size="default"
                  className="glass-hover flex items-center space-x-2"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  aria-expanded={isProfileDropdownOpen}
                  aria-haspopup="true"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>{user?.name || "Profile"}</span>
                </Button>
                {isProfileDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-full mt-2 bg-background border rounded-xl shadow-lg overflow-hidden min-w-56 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
                  >
                    <div className="p-3 border-b bg-muted/50">
                      <p className="text-sm font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>

                    {/* Dashboard Link */}
                    {getDashboardLink() && (
                      <div
                        onClick={() => {
                          router.push(getDashboardLink()!)
                          setIsProfileDropdownOpen(false)
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent/20 rounded-lg cursor-pointer transition-colors font-medium"
                      >
                        <span>{dashboardLabel()}</span>
                      </div>
                    )}

                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors group"
                      >
                        <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}
              />
              <X
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pb-4 space-y-1">
            <Link href="/community" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-2 rounded-lg transition-all duration-200">
              <Users className="w-4 h-4" />
              <span>Communities</span>
            </Link>
            <Link href="/opportunities" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-2 rounded-lg transition-all duration-200">
              <Calendar className="w-4 h-4" />
              <span>Opportunities</span>
            </Link>
            <Link href="/location" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-2 rounded-lg transition-all duration-200">
              <School2 className="w-4 h-4" />
              <span>Schools</span>
            </Link>

            <div className="flex flex-col gap-2 pt-3">
              {!isAuth ? (
                <>
                  <Button variant="outline" size="default" className="w-full glass-hover" onClick={() => router.push("/auth")}>Sign In</Button>
                  <Button size="default" className="w-full bg-primary hover:bg-primary/90" onClick={() => router.push("/auth")}>Get Started</Button>
                </>
              ) : (
                <>
                  {getDashboardLink() && (
                    <Button
                      onClick={() => {
                        router.push(getDashboardLink()!)
                        setIsOpen(false)
                      }}
                      className="w-full bg-accent/10 rounded-xl py-2"
                    >
                      {dashboardLabel()}
                    </Button>
                  )}
                  <Button onClick={handleSignOut} className="w-full bg-destructive/10 rounded-xl py-2">
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
