import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Trophy } from "lucide-react"
import Link from "next/link"
import { gradientClasses, componentClasses } from "@/lib/gradients"

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 ${gradientClasses.sectionBackground}`}/>
             
      {/* Animated background orbs */}
      <div className={componentClasses.orbsContainer}>
        <div className={`absolute top-20 left-10 w-72 h-72 ${gradientClasses.orbPurple} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 ${gradientClasses.orbBlue} rounded-full blur-3xl animate-pulse delay-1000`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${gradientClasses.orbGreen} rounded-full blur-3xl animate-pulse delay-2000`} />
        <div className={`absolute top-40 right-1/4 w-60 h-60 ${gradientClasses.orbOrange} rounded-full blur-3xl animate-pulse delay-500`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={componentClasses.glassCard}>
          <div className="max-w-3xl mx-auto">
            <div className={`inline-flex items-center space-x-2 ${componentClasses.glassBadge} mb-8`}>
              <Heart className="w-4 h-4 text-purple-500" />
              <span className="text-foreground font-medium">Join thousands serving the UAE community</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance text-white">
              Ready to serve your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">UAE</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-sm opacity-40"></span>
                </span>{" "}
              community?
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Connect with local UAE charities, discover meaningful volunteer opportunities across all emirates, and
              track your impact. Your journey to making a difference in the UAE starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/opportunities">
                <Button size="lg" className={componentClasses.primaryButton}>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">Find Opportunities</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/location">
                <Button size="lg" variant="outline" className={componentClasses.outlineButton}>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">View Rankings</span>
                  <Trophy className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
