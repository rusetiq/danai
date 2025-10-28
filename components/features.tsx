import { Quote } from "lucide-react"
import { gradientClasses, componentClasses } from "@/lib/gradients"

const testimonials = [
  {
    name: "Fatima Al Mansouri",
    role: "Student Volunteer",
    location: "Dubai",
    quote: "This platform connected me with amazing beach cleanup opportunities in Jumeirah. I've met so many like-minded people and made a real difference in my community!",
    bgGradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Ahmed Hassan",
    role: "Community Organizer",
    location: "Abu Dhabi",
    quote: "The School Sustainability Challenge has transformed our campus. We've reduced waste by 40% and students are more engaged than ever in environmental initiatives.",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Sara Ibrahim",
    role: "Parent & Volunteer",
    location: "Sharjah",
    quote: "Finding volunteer opportunities that fit my schedule used to be impossible. Now I can see what's nearby and join activities that match my interests. It's been life-changing!",
    bgGradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Khalid Al Zaabi",
    role: "University Student",
    location: "Fujairah",
    quote: "Living in Fujairah, I thought there wouldn't be many opportunities. This platform proved me wrong - there's so much happening across all emirates!",
    bgGradient: "from-orange-500/20 to-red-500/20",
  },
]

export function Features() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className={`absolute inset-0 ${gradientClasses.sectionBackground}`}/>
      <div className={componentClasses.orbsContainer}>
        <div className={`absolute top-20 left-10 w-72 h-72 ${gradientClasses.orbPurple} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 ${gradientClasses.orbBlue} rounded-full blur-3xl animate-pulse delay-1000`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${gradientClasses.orbGreen} rounded-full blur-3xl animate-pulse delay-2000`} />
        <div className={`absolute top-40 right-1/4 w-60 h-60 ${gradientClasses.orbOrange} rounded-full blur-3xl animate-pulse delay-500`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Loved by volunteers across the{" "}
            <span className="relative inline-block group cursor-default">
              <span className={`relative z-10 text-white transition-all duration-300 ${gradientClasses.textGlowPrimary} group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_30px_rgba(147,51,234,0.7)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]`}>
                UAE
              </span>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Hear from community members who are making a difference through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`glass rounded-2xl p-8 glass-hover group ${gradientClasses.borders.primary} ${gradientClasses.glassPrimary} hover:scale-105 transition-all duration-300`}>
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${testimonial.bgGradient} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold text-white ${gradientClasses.textGlowPrimary}`}>{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
