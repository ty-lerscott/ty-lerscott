import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedPosts } from "@/components/featured-posts"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedPosts />
      </main>
      <Footer />
    </div>
  )
}
