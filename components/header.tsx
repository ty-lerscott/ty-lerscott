"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg pulse-glow flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
            <h1 className="text-xl font-mono font-bold text-foreground">Tyler Scott</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#metaphysics" className="text-muted-foreground hover:text-primary transition-colors">
              Metaphysics
            </a>
            <a href="#psychology" className="text-muted-foreground hover:text-primary transition-colors">
              Psychology
            </a>
            <a href="#spirituality" className="text-muted-foreground hover:text-primary transition-colors">
              Spirituality
            </a>
            <a href="#cosmos" className="text-muted-foreground hover:text-primary transition-colors">
              Cosmos
            </a>
            <a href="#coding" className="text-muted-foreground hover:text-primary transition-colors">
              Coding
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#metaphysics" className="text-muted-foreground hover:text-primary transition-colors">
                Metaphysics
              </a>
              <a href="#psychology" className="text-muted-foreground hover:text-primary transition-colors">
                Psychology
              </a>
              <a href="#spirituality" className="text-muted-foreground hover:text-primary transition-colors">
                Spirituality
              </a>
              <a href="#cosmos" className="text-muted-foreground hover:text-primary transition-colors">
                Cosmos
              </a>
              <a href="#coding" className="text-muted-foreground hover:text-primary transition-colors">
                Coding
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
