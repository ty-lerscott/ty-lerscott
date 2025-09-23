import { Card, CardContent } from "@/components/ui/card"
import { Brain, Atom, Sparkles, Globe, Code, Zap } from "lucide-react"

const categories = [
  {
    icon: Brain,
    title: "Psychology",
    description: "Exploring the depths of human consciousness and behavior",
    color: "text-primary",
  },
  {
    icon: Sparkles,
    title: "Metaphysics",
    description: "Beyond the physical realm into fundamental reality",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Spirituality",
    description: "Ancient wisdom traditions and modern spiritual practices",
    color: "text-primary",
  },
  {
    icon: Globe,
    title: "Cosmos",
    description: "The universe, quantum mechanics, and cosmic consciousness",
    color: "text-accent",
  },
  {
    icon: Code,
    title: "Coding",
    description: "Technology as a tool for consciousness expansion",
    color: "text-primary",
  },
  {
    icon: Atom,
    title: "Quantum",
    description: "Where science meets spirituality in the quantum realm",
    color: "text-accent",
  },
]

export function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore Consciousness</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dive deep into the interconnected realms of mind, spirit, and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group hover:bg-secondary/50 transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg bg-secondary/50 ${category.color} group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
