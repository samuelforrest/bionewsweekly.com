import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center px-6">
        
        <a href="/" className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105">
          <div className="relative">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-2.5 shadow-lg">
              <img 
                src="/favicon.png" 
                alt="BioNewsWeekly Logo" 
                className="h-full w-full rounded-lg"
              />
            </div>
            <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-2xl bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:via-green-500/80 group-hover:to-emerald-500/80 transition-all duration-300">
              BioNewsWeekly
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">Biology by students</p>
          </div>
        </a>

        
        <nav className="hidden md:flex items-center space-x-1 ml-auto">
          <a href="/" className="group relative px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-300">
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>
          <a href="/blog" className="group relative px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-300">
            <span className="relative z-10">Articles</span>
            <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>
          <a href="/roadmap" className="group relative px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-300">
            <span className="relative z-10">Roadmap</span>
            <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>
          <a href="/ai" className="group relative px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-300">
            <span className="relative z-10">AI Tutor</span>
            <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>
          <a href="/admin" className="group relative px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-300">
            <span className="relative z-10">Admin</span>
            <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>

        
        <div className="flex items-center ml-auto md:hidden space-x-3">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative h-10 w-10 rounded-xl hover:bg-primary/10 transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl">
          <nav className="container py-6 flex flex-col space-y-1 px-6">
            <a 
              href="/" 
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-medium">Home</span>
            </a>
            <a 
              href="/blog" 
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-medium">Articles</span>
            </a>
            <a 
              href="/roadmap" 
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-medium">Roadmap</span>
            </a>
            <a 
              href="/ai" 
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-medium">AI Tutor</span>
            </a>
            <a 
              href="/admin" 
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-medium">Admin</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
