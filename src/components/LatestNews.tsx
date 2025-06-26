
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: "CRISPR Gene Editing: The Future of Medicine is Here",
    excerpt: "Exploring how CRISPR technology is revolutionizing treatment for genetic diseases and what it means for the future of healthcare.",
    category: "Genetics",
    readTime: "5 min read",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "The Secret Life of Mycorrhizal Networks",
    excerpt: "Discovering how fungi create underground internet networks that help forests communicate and share resources.",
    category: "Ecology",
    readTime: "4 min read",
    date: "Dec 18, 2024",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Biodiversity Crisis: What A-Level Students Need to Know",
    excerpt: "Understanding the current mass extinction event and what young scientists can do to make a difference.",
    category: "Conservation",
    readTime: "6 min read",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop"
  }
]

const categoryColors = {
  Genetics: "bg-bio-blue-100 text-bio-blue-800 dark:bg-bio-blue-900 dark:text-bio-blue-200",
  Ecology: "bg-bio-green-100 text-bio-green-800 dark:bg-bio-green-900 dark:text-bio-green-200",
  Conservation: "bg-bio-teal-100 text-bio-teal-800 dark:bg-bio-teal-900 dark:text-bio-teal-200"
}

export function LatestNews() {
  return (
    <section id="articles" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest from Our <span className="gradient-text">Newsroom</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fresh perspectives on biology from the next generation of scientists
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Card 
              key={article.id} 
              className={`group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in ${
                article.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge 
                  variant="secondary" 
                  className={`absolute top-4 left-4 ${categoryColors[article.category as keyof typeof categoryColors]}`}
                >
                  {article.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full justify-start p-0 h-auto font-medium text-primary hover:text-primary/80">
                  Read full article →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
