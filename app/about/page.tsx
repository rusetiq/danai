"use client"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FlowerIcon,
  Heart,
  Users,
  Target,
  Sparkles,
  Globe,
  Shield,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Zap,
  CreditCard,
  Building2,
  Smartphone,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-24 space-y-16">
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <FlowerIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance">About Danai</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Danai is the UAE's premier platform connecting passionate volunteers with meaningful opportunities to make a
            difference in their communities.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Our Story</h2>
          <div className="glass border-border/50 rounded-2xl p-8 space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Danai emerged from a simple observation: the UAE has countless individuals eager to volunteer and
              organizations in need of support, but connecting them was challenging. We set out to bridge this gap with
              technology and community-driven design.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, Danai serves as the central hub for volunteerism across all seven emirates, facilitating thousands
              of connections between volunteers and charitable organizations. Our platform has become an essential tool
              for building stronger, more connected communities throughout the UAE.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass border-border/50 p-8 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower every individual in the UAE to contribute to their community by providing seamless access to
                volunteer opportunities that match their skills, interests, and availability.
              </p>
            </Card>

            <Card className="glass border-border/50 p-8 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A UAE where every person actively participates in building stronger communities, where charitable
                organizations thrive with abundant volunteer support, and where social impact is measurable and
                celebrated.
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Community First",
                description:
                  "We prioritize the needs of volunteers and organizations, building features that truly serve our community.",
              },
              {
                icon: Shield,
                title: "Trust & Safety",
                description:
                  "We verify all organizations and opportunities to ensure a safe, reliable volunteering experience.",
              },
              {
                icon: Globe,
                title: "Inclusivity",
                description:
                  "We welcome volunteers from all backgrounds and connect them with diverse opportunities across the UAE.",
              },
              {
                icon: Heart,
                title: "Impact Driven",
                description: "We measure success by the positive change created in communities, not just by numbers.",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description:
                  "We continuously improve our platform with cutting-edge technology to enhance the volunteer experience.",
              },
              {
                icon: Target,
                title: "Transparency",
                description:
                  "We operate with complete openness about our processes, impact, and how we serve our community.",
              },
            ].map((value, index) => (
              <Card key={index} className="glass border-border/50 p-6 space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="glass border-border/50 rounded-2xl p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">Our Impact</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-primary">143+</div>
              <div className="text-sm text-muted-foreground mt-2">Active Volunteers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground mt-2">Partner Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">127+</div>
              <div className="text-sm text-muted-foreground mt-2">Volunteer Hours</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground mt-2">Emirates Covered</div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Why Choose Danai?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover what makes Danai the leading volunteer platform in the UAE
            </p>
          </div>
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

        <section className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Support Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your donation helps us connect volunteers with meaningful opportunities across the UAE, building stronger
              communities and creating lasting impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { amount: 5, impact: "Funds the platform maintenance for a week" },
              { amount: 10, impact: "Enables us to hold more events and opportunities" },
              { amount: 25, impact: "Enables us to build new community features" },
              { amount: 50, impact: "Sponsors a major charity event or helps us bring new brands and NGOs onboard" },
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
