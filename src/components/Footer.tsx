
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container px-4 mx-auto py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-bio-blue-500 to-bio-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BN</span>
              </div>
              <span className="font-bold text-xl gradient-text">BioNewsWeekly.com</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Biology news by students, for students. Making science accessible and exciting for the next generation.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Spacer columns for alignment */}
          <div className="hidden lg:block"></div>
          <div className="hidden lg:block"></div>

          {/* Content */}
          <div className="space-y-4 md:text-right lg:text-right">
            <h4 className="text-sm font-semibold">Content</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Latest Articles</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Podcast</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Bio News Weekly. All rights reserved. Made by <a href="https://www.samuelforrest.me">Samuel Forrest</a>
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
