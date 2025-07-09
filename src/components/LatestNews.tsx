
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllBlogPosts, type BlogPost } from '@/services/blogService'

// Created a simple helper function to estimate reading time
const estimateReadingTime = (content: string = ''): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function LatestNews() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const posts = await getAllBlogPosts();
        // Get the latest 3 articles
        setArticles(posts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);
  return (
    <section id="articles" className="py-24 bg-muted">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            The Latest <span className="gradient-text">News</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fresh perspectives on biology from the next generation of scientists
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading latest articles...</div>
          </div>
        ) : articles.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No articles available yet.</p>
          </div>
        ) : (
          articles.map((article, index) => (
            <Link key={article.id} to={`/blog/${article.slug}`}>
              <Card 
                className={`group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in cursor-pointer bg-card border-border ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={article.cover_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 left-4 bg-secondary text-secondary-foreground"
                  >
                    {article.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-card-foreground group-hover:scale-105 transition-transform duration-300">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {article.preview || article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{estimateReadingTime(article.content)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button size="lg" className="bg-primary hover:bg-primary/90 transition-all duration-300 text-lg px-8 py-6 text-primary-foreground rounded-xl">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
