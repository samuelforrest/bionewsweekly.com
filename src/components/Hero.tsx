import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-foreground mb-2">Biology News by</span>
              <span className="block bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                Students
              </span>
              <span className="block text-foreground text-4xl md:text-5xl lg:text-6xl">for</span>
              <span className="block bg-gradient-to-r from-emerald-500 via-green-500 to-primary bg-clip-text text-transparent">
                Students
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              The latest biology news, through the eyes of three passionate A Level biology students.
            </p>
          </div>
          <div className="pt-8">
            <Link to="/blog">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white border-0 text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Read Articles
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 w-full max-w-3xl">
            {[
              { number: "6+", label: "Articles Published", delay: "0s" },
              { number: "3", label: "Student Writers", delay: "0.1s" },
              { number: "150+", label: "Weekly Readers", delay: "0.2s" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative p-6 md:bg-card/50 md:backdrop-blur-sm md:border md:border-border/50 md:rounded-2xl md:hover:border-primary/50 transition-all duration-300 transform hover:scale-105 md:hover:shadow-lg"
                style={{ animationDelay: stat.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-green-500/5 md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
