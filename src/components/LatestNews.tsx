
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllBlogPosts, type BlogPost } from '@/services/blogService'

const categoryColors = {
  Genetics: "bg-bio-blue-100 text-bio-blue-800 dark:bg-bio-blue-900 dark:text-bio-blue-200",
  Ecology: "bg-bio-green-100 text-bio-green-800 dark:bg-bio-green-900 dark:text-bio-green-200",
  Conservation: "bg-bio-teal-100 text-bio-teal-800 dark:bg-bio-teal-900 dark:text-bio-teal-200",
  Biology: "bg-bio-blue-100 text-bio-blue-800 dark:bg-bio-blue-900 dark:text-bio-blue-200",
  Science: "bg-bio-green-100 text-bio-green-800 dark:bg-bio-green-900 dark:text-bio-green-200"
}

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
    <section id="articles" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Latest <span className="gradient-text">News</span>
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Fresh perspectives on biology from the next generation of scientists
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-pulse">Loading latest articles...</div>
          </div>
        ) : articles.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No articles available yet.</p>
          </div>
        ) : (
          articles.map((article, index) => (
            <Card 
              key={article.id} 
              className={`group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in ${
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
                  className={`absolute top-4 left-4 ${
                    categoryColors[article.category as keyof typeof categoryColors] || 
                    categoryColors.Biology
                  }`}
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
                
                <Link to={`/blog/${article.slug}`}>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto font-medium text-primary hover:text-primary/80">
                    Read full article →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
