"use client"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Award, Users, Shield, Zap, Heart, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WhyDanaiPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-24 space-y-16">
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Zap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance">Why Choose Danai?</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover what makes Danai the leading volunteer platform in the UAE and how we're revolutionizing community
            engagement.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: MapPin,
                title: "UAE-Wide Coverage",
                description:
                  "Access opportunities across all seven emirates with our comprehensive network of verified organizations and events.",
                highlight: "7 Emirates",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description:
                  "Find opportunities that fit your schedule, from one-time events to ongoing commitments, weekdays to weekends.",
                highlight: "24/7 access",
              },
              {
                icon: Award,
                title: "Rewards & Recognition",
                description:
                  "Earn credits for your volunteer work and redeem them for exclusive rewards from sustainability-focused UAE brands.",
                highlight: "Earn while helping",
              },
              {
                icon: Users,
                title: "Community Building",
                description:
                  "Connect with like-minded volunteers, share experiences, and build lasting relationships through our social features.",
                highlight: "143+ members",
              },
              {
                icon: Shield,
                title: "Verified Opportunities",
                description:
                  "Every organization and opportunity is thoroughly vetted by our team to ensure safety, legitimacy, and impact.",
                highlight: "100% verified",
              },
              {
                icon: TrendingUp,
                title: "Track Your Impact",
                description:
                  "Monitor your volunteer hours, see the difference you're making, and showcase your contributions with detailed analytics.",
                highlight: "Real-time tracking",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="glass border-border/50 p-8 space-y-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="glass border-border/50 rounded-2xl p-8 md:p-12 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">The Danai Difference</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're not just a platform – we're a movement to transform volunteerism in the UAE
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary">3x</div>
              <div className="text-sm text-muted-foreground">Faster volunteer matching than traditional methods</div>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">
                User satisfaction rate from volunteers and organizations
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Hours of community service facilitated annually</div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">For Every Type of Volunteer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: "Students", benefit: "Build your CV and gain real-world experience" },
              { type: "Professionals", benefit: "Give back while developing leadership skills" },
              { type: "Families", benefit: "Create memories while teaching values" },
              { type: "Retirees", benefit: "Share your wisdom and stay active" },
            ].map((segment, index) => (
              <Card key={index} className="glass border-border/50 p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">{segment.type}</h3>
                <p className="text-sm text-muted-foreground">{segment.benefit}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="glass border-border/50 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of volunteers across the UAE who are creating positive change in their communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-xl px-8"
              onClick={() => router.push("/auth")}
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-hover rounded-xl px-8 bg-transparent"
              onClick={() => router.push("/opportunities")}
            >
              Browse Opportunities
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
