
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-bio-blue-500 to-bio-teal-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">BN</span>
          </div>
          <span className="font-bold text-xl gradient-text">BioNewsWeekly</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="#articles" className="text-sm font-medium hover:text-primary transition-colors">
            Articles
          </a>
          <a href="#team" className="text-sm font-medium hover:text-primary transition-colors">
            Team
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button className="hidden md:inline-flex bg-gradient-to-r from-bio-blue-500 to-bio-teal-500 text-white hover:from-bio-blue-600 hover:to-bio-teal-600 transition-all duration-300">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container py-4 flex flex-col space-y-4">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="#articles" className="text-sm font-medium hover:text-primary transition-colors">
              Articles
            </a>
            <a href="#team" className="text-sm font-medium hover:text-primary transition-colors">
              Team
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <Button className="w-full bg-gradient-to-r from-bio-blue-500 to-bio-teal-500 text-white">
              Subscribe
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
