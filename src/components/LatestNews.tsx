import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllBlogPosts, type BlogPost } from '@/services/blogService'

const estimateReadingTime = (content: string = ''): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

export function LatestNews() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const posts = await getAllBlogPosts();
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
    <section id="articles" className="py-24 lg:py-32 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            The Latest{' '}
            <span className="bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent">
              News
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fresh perspectives on biology from the next generation of scientists, curated with passion and precision
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {loading ? (
          <div className="col-span-full text-center py-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-muted-foreground font-medium">Loading latest articles...</span>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="max-w-md mx-auto p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl">
              <p className="text-muted-foreground text-lg">No articles available yet. Check back soon for exciting biology news!</p>
            </div>
          </div>
        ) : (
          articles.map((article, index) => (
            <Link key={article.id} to={`/blog/${article.slug}`} className="group">
              <Card 
                className={`h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden animate-fade-in cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                
                <div className="relative overflow-hidden">
                  <img 
                    src={article.cover_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"} 
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-primary to-green-500 text-white border-0 px-3 py-1 rounded-full shadow-lg font-medium">
                      {article.category}
                    </Badge>
                  </div>
                  
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300 text-xl leading-tight">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.preview || article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-medium">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{estimateReadingTime(article.content)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
        </div>

        <div className="text-center mt-16">
          <Link to="/blog">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white border-0 text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
