"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Sparkles, Award, Lock, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Reward {
  id: number
  title: string
  brand: string
  description: string
  credits: number
  image: string
  category: string
  available: boolean
}

const rewards: Reward[] = [
  {
    id: 1,
    title: "Eco-Friendly Water Bottle",
    brand: "Masdar Sustainability",
    description: "Premium stainless steel water bottle made from recycled materials",
    credits: 50,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop&q=80",
    category: "Sustainability",
    available: true,
  },
  {
    id: 2,
    title: "Solar Power Bank",
    brand: "Emirates Green Tech",
    description: "10,000mAh solar-powered portable charger for sustainable energy on-the-go",
    credits: 100,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop&q=80",
    category: "Sustainability",
    available: true,
  },
  {
    id: 3,
    title: "Organic Cotton Tote Bag",
    brand: "Dubai Eco Store",
    description: "Handmade organic cotton tote with sustainability message",
    credits: 30,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=600&fit=crop&q=80",
    category: "Sustainability",
    available: true,
  },
  {
    id: 4,
    title: "Bamboo Cutlery Set",
    brand: "Green Living UAE",
    description: "Complete reusable bamboo cutlery set with carrying case",
    credits: 40,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=600&fit=crop&q=80",
    category: "Sustainability",
    available: true,
  },
  {
    id: 5,
    title: "Recycled Notebook Set",
    brand: "Eco Stationery UAE",
    description: "Set of 3 notebooks made from 100% recycled paper",
    credits: 25,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=600&fit=crop&q=80",
    category: "Sustainability",
    available: true,
  }
]

export default function RewardsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [userCredits, setUserCredits] = useState(0)
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([])
  const [showReveal, setShowReveal] = useState(false)
  const [revealReward, setRevealReward] = useState<Reward | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/auth")
      return
    }
    setCurrentUser(user)

    const creditsData = localStorage.getItem(`credits:${user}`)
    setUserCredits(creditsData ? Number.parseInt(creditsData) : 20)

    const redeemedData = localStorage.getItem(`redeemed:${user}`)
    setRedeemedRewards(redeemedData ? JSON.parse(redeemedData) : [])
  }, [router])

  const handleRedeem = (reward: Reward) => {
    if (!currentUser || userCredits < reward.credits || redeemedRewards.includes(reward.id)) return

    const newCredits = userCredits - reward.credits
    const newRedeemed = [...redeemedRewards, reward.id]

    setUserCredits(newCredits)
    setRedeemedRewards(newRedeemed)

    localStorage.setItem(`credits:${currentUser}`, newCredits.toString())
    localStorage.setItem(`redeemed:${currentUser}`, JSON.stringify(newRedeemed))

    setRevealReward(reward)
    setShowReveal(true)

    setTimeout(() => {
      setShowReveal(false)
      setRevealReward(null)
    }, 5000)
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Rewards Store
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg px-4">
            Redeem your volunteer credits for sustainable rewards
          </p>
        </div>

        <Card className="glass border-border/50 mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Credits</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{userCredits}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => router.push("/opportunities")} className="w-full sm:w-auto">
                Earn More Credits
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rewards.map((reward) => {
            const isRedeemed = redeemedRewards.includes(reward.id)
            const canAfford = userCredits >= reward.credits

            return (
              <Card
                key={reward.id}
                className={cn(
                  "glass border-border/50 overflow-hidden transition-all hover:scale-105",
                  isRedeemed && "opacity-60",
                )}
              >
                <div className="relative h-[50vh] overflow-hidden p-4">
                  <img
                    src={reward.image || "/placeholder.svg"}
                    alt={reward.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none m-4 rounded-lg" />
                  {isRedeemed && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center m-4 rounded-lg">
                      <div className="text-center">
                        <Check className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-2" />
                        <p className="text-white font-semibold text-sm sm:text-base">Redeemed</p>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg truncate">{reward.title}</CardTitle>
                      <p className="text-xs sm:text-sm text-primary font-medium truncate">{reward.brand}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-bold text-primary">{reward.credits}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">{reward.description}</p>
                  <Button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford || isRedeemed}
                    className="w-full text-sm"
                    variant={canAfford && !isRedeemed ? "default" : "outline"}
                  >
                    {isRedeemed ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Redeemed
                      </>
                    ) : !canAfford ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        <span className="truncate">Need {reward.credits - userCredits} more</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4 mr-2" />
                        Redeem Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {showReveal && revealReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-300">
          <div className="relative max-w-sm sm:max-w-md w-full max-h-[50vh]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 blur-3xl animate-pulse" />
            <Card className="relative glass border-primary/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4 relative overflow-y-auto max-h-[50vh]">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Congratulations!
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">You've redeemed</p>
                </div>
                <div className="p-2 sm:p-3 bg-background/50 rounded-xl">
                  <img
                    src={revealReward.image || "/placeholder.svg"}
                    alt={revealReward.title}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-2 sm:mb-3"
                  />
                  <h3 className="text-base sm:text-lg font-bold">{revealReward.title}</h3>
                  <p className="text-xs sm:text-sm text-primary font-medium">{revealReward.brand}</p>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground px-2">
                  Check your email for redemption instructions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
