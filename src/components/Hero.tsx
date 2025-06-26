import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
export function Hero() {
  return <section id="home" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bio-blue-200/20 dark:bg-bio-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bio-teal-200/20 dark:bg-bio-teal-900/20 rounded-full blur-3xl animate-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="px-4 py-1 text-sm font-medium animate-fade-in bg-lime-600">
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
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
              The latest biology news, through the eyes of three A Level biology students.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4" style={{
        }}>
            <Link to="/blog">
              <Button size="lg" className="bg-lime-600 hover:bg-lime-400 transition-all duration-300 text-lg px-8 py-6">
                Read Articles
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 transition-all duration-300 text-slate-50 bg-black/0 hover:bg-gray-900">
              Our Podcast
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12" style={{
        }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">10+</div>
              <div className="text-sm text-white">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">3</div>
              <div className="text-sm text-white">Student Writers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
              <div className="text-sm text-white">Weekly Readers</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}