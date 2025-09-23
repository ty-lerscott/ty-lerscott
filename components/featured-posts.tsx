import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"

const featuredPosts = [
  {
    title: "The Quantum Nature of Consciousness",
    excerpt:
      "Exploring how quantum mechanics might explain the hard problem of consciousness and its implications for our understanding of reality.",
    category: "Metaphysics",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    featured: true,
  },
  {
    title: "Ubuntu Philosophy in Modern Psychology",
    excerpt:
      'How the African philosophy of Ubuntu - "I am because we are" - offers profound insights into collective consciousness and mental health.',
    category: "Psychology",
    readTime: "6 min read",
    date: "Dec 12, 2024",
    featured: false,
  },
  {
    title: "Coding as Spiritual Practice",
    excerpt:
      "The meditative aspects of programming and how writing code can become a form of digital prayer and consciousness expansion.",
    category: "Coding",
    readTime: "5 min read",
    date: "Dec 10, 2024",
    featured: false,
  },
  {
    title: "Ancient Astronomy and Cosmic Consciousness",
    excerpt:
      "How ancient African civilizations understood the cosmos and what their wisdom teaches us about our place in the universe.",
    category: "Cosmos",
    readTime: "10 min read",
    date: "Dec 8, 2024",
    featured: false,
  },
]

export function FeaturedPosts() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Recent explorations into the nature of reality, consciousness, and technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          <Card className="lg:row-span-2 group hover:bg-card/80 transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  {featuredPosts[0].category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredPosts[0].readTime}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors text-balance">
                {featuredPosts[0].title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">{featuredPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{featuredPosts[0].date}</span>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          {/* Other Posts */}
          <div className="space-y-6">
            {featuredPosts.slice(1).map((post, index) => (
              <Card
                key={index}
                className="group hover:bg-card/80 transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-balance">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
