
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-bio-blue-500 to-bio-teal-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">BN</span>
          </div>
          <span className="font-bold text-xl gradient-text">BioNewsWeekly.com</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ml-auto">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Articles
          </a>
          <a href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
            Admin
          </a>
          <a href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center ml-auto md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container py-4 flex flex-col space-y-4">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Articles
            </a>
            <a href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </a>
            <a href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}