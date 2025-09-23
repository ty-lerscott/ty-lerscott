import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-secondary/50 rounded-full px-4 py-2 mb-8 float">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">Bridging Ancient Wisdom & Future Tech</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
            <span className="text-foreground">Exploring the</span> <span className="text-primary">Infinite</span>{" "}
            <span className="text-foreground">Through</span> <span className="text-accent">Consciousness</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            A journey through metaphysics, psychology, spirituality, cosmic mysteries, and the art of coding. Where
            African wisdom meets futuristic possibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Start Reading
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </div>

      {/* Floating geometric elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-lg rotate-45 float"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/4 w-12 h-12 border border-accent/40 rotate-12 float"
        style={{ animationDelay: "4s" }}
      ></div>
    </section>
  )
}
