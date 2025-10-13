import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-chart-2/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 text-sm mb-8">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Join thousands serving the UAE community</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to serve your UAE community?</h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Connect with local UAE charities, discover meaningful volunteer opportunities across all emirates, and
              track your impact. Your journey to making a difference in the UAE starts here.
            </p>

        

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              
              <div>
                
                
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Human Focused </div>
                <div className="text-muted-foreground">{"Human-centric approach"} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
