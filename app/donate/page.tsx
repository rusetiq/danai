"use client"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Users, Globe, Sparkles, CreditCard, Building2, Smartphone } from "lucide-react"

export default function DonatePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-24 space-y-16">
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance">Support Our Mission</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Your donation helps us connect volunteers with meaningful opportunities across the UAE, building stronger
            communities and creating lasting impact.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card className="glass border-border/50 p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Connect Communities</h3>
            <p className="text-muted-foreground text-sm">
              Help us bring together volunteers and organizations to create meaningful change
            </p>
          </Card>

          <Card className="glass border-border/50 p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Expand Reach</h3>
            <p className="text-muted-foreground text-sm">
              Support our efforts to reach more communities across all seven emirates
            </p>
          </Card>

          <Card className="glass border-border/50 p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Empower Change</h3>
            <p className="text-muted-foreground text-sm">
              Enable us to provide better tools and resources for volunteers and organizations
            </p>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Choose Your Donation Amount</h2>
            <p className="text-muted-foreground">Every contribution makes a difference</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { amount: 50, impact: "Supports 5 volunteer registrations" },
              { amount: 100, impact: "Funds platform maintenance for a week" },
              { amount: 250, impact: "Enables new community features" },
              { amount: 500, impact: "Sponsors a major charity event" },
            ].map((tier) => (
              <Card
                key={tier.amount}
                className="glass border-border/50 p-6 space-y-4 hover:border-primary/50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">AED {tier.amount}</div>
                  <p className="text-sm text-muted-foreground mt-2 py-1.5">{tier.impact}</p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl">Donate Now</Button>
              </Card>
            ))}
          </div>

          <Card className="glass border-border/50 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-center">Custom Amount</h3>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="number"
                placeholder="Enter amount (AED)"
                className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 rounded-xl px-8">Donate</Button>
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Payment Methods</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Card className="glass border-border/50 p-6 flex flex-col items-center space-y-3">
              <CreditCard className="w-8 h-8 text-primary" />
              <span className="font-medium">Credit/Debit Card</span>
            </Card>
            <Card className="glass border-border/50 p-6 flex flex-col items-center space-y-3">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="font-medium">Bank Transfer</span>
            </Card>
            <Card className="glass border-border/50 p-6 flex flex-col items-center space-y-3">
              <Smartphone className="w-8 h-8 text-primary" />
              <span className="font-medium">Mobile Wallet</span>
            </Card>
          </div>
        </section>

        <section className="glass border-border/50 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Your Impact</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">143</div>
              <div className="text-sm text-muted-foreground">Volunteers Connected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{"5+"}</div>
              <div className="text-sm text-muted-foreground">Organizations Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">127+</div>
              <div className="text-sm text-muted-foreground">Hours Volunteered</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
