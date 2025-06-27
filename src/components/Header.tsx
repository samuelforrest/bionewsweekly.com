
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
          <div className="h-8 w-8 rounded-lg flex items-center justify-center">
            <img 
              src="/favicon.png" 
              alt="BioNewsWeekly Logo" 
              className="h-8 w-8 rounded-lg"
            />
          </div>
          <span className="font-bold text-xl gradient-text">BioNewsWeekly.com</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ml-auto">
          <a href="/" className="text-sm font-medium text-white hover:text-primary">
            Home
          </a>
          <a href="/blog" className="text-sm font-medium text-white hover:text-secondary">
            Articles
          </a>
          <a href="/admin" className="text-sm font-medium text-white hover:text-primary">
            Admin
          </a>
          <a href="/auth" className="text-sm font-medium text-white hover:text-primary">
            Login
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center ml-auto md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur">
          <nav className="container py-4 flex flex-col space-y-4">
            <a href="/" className="text-sm font-medium text-white">
              Home
            </a>
            <a href="/blog" className="text-sm font-medium text-white">
              Articles
            </a>
            <a href="/admin" className="text-sm font-medium text-white">
              Admin
            </a>
            <a href="/auth" className="text-sm font-medium text-white">
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}