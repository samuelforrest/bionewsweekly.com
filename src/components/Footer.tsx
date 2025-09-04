
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-card via-background to-muted/30 border-t border-border/50">
      <div className="container px-6 mx-auto py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-green-500 p-2.5 shadow-lg">
                  <img 
                    src="/favicon.png" 
                    alt="BioNewsWeekly Logo" 
                    className="h-full w-full rounded-lg"
                  />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-2xl bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent">
                  BioNewsWeekly.com
                </h3>
                <p className="text-sm text-muted-foreground">Biology by students, for students</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Biology news by students, for students. The latest biology news - what isn't in your textbook!
            </p>
            
          </div>

          
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Latest Articles", href: "/blog" },
                { name: "Roadmap", href: "/roadmap" },
                { name: "Our Team", href: "#team" },
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-foreground">Resources</h4>
            <ul className="space-y-3">
              {[
                { name: "Newsletter", href: "/#newsletter" },
                { name: "Contact", href: "mailto:sam@samuelforrest.me" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © 2025 Bio News Weekly. Website developed by <a href="https://www.samuelforrest.me?utm_source=bionewsweekly&utm_medium=footer&utm_campaign=website_credit" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">Samuel Forrest</a>
            </p>
            <p className="text-xs text-muted-foreground/80 text-center md:text-left">
              GDPR: We store email addresses, names, and likes. Anonymous likes are stored without personal identifiers. Data is processed lawfully and securely.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
