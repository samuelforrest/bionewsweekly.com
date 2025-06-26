
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bio-blue-200/20 dark:bg-bio-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bio-teal-200/20 dark:bg-bio-teal-900/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="px-4 py-1 text-sm font-medium animate-fade-in">
            🧬 Weekly Biology Updates
          </Badge>

          {/* Main heading */}
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Biology News by{' '}
              <span className="gradient-text">Students</span>
              <br />
              for{' '}
              <span className="gradient-text">Students</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the latest in biology through the eyes of passionate A-Level students. 
              Weekly articles, fascinating facts, and scientific breakthroughs made accessible.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="bg-gradient-to-r from-bio-blue-500 to-bio-teal-500 text-white hover:from-bio-blue-600 hover:to-bio-teal-600 transition-all duration-300 text-lg px-8 py-6">
              Read Articles
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-accent transition-all duration-300">
              Listen to Podcast
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">5</div>
              <div className="text-sm text-muted-foreground">Student Writers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">1K+</div>
              <div className="text-sm text-muted-foreground">Weekly Readers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
