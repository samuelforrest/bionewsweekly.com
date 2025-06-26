
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 mx-auto py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-bio-blue-500 to-bio-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BN</span>
              </div>
              <span className="font-bold text-xl gradient-text">BioNewsWeekly</span>
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

          {/* Content */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Content</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Latest Articles</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Biology Facts</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Study Guides</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Podcast</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Genetics</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ecology</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Conservation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Biochemistry</a></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mission</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 BioNewsWeekly. All rights reserved. Made with ❤️ by A-Level students.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
