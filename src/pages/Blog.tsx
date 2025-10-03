import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllBlogPosts, type BlogPost } from "@/services/blogService";
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

// Estimate reading time
const estimateReadingTime = (content: string = ''): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow mt-20 pt-6">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Articles</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest news in the field of <span className="text-primary">Biology</span>.
            </p>
          </div>
          
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              className={`rounded-full transition-transform duration-200 ${
                selectedCategory === null ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category, index) => (
              <Button 
                key={index} 
                variant={selectedCategory === category ? "default" : "outline"} 
                className={`rounded-full transition-transform duration-200 ${
                  selectedCategory === category ? 'scale-110' : 'scale-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-pulse text-muted-foreground">Loading posts...</div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <Card 
                    className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden animate-fade-in cursor-pointer transform hover:scale-105 hover:shadow-2xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.cover_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"} 
                        alt={post.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-primary to-green-500 text-white border-0 px-3 py-1 rounded-full shadow-lg font-medium">
                          {post.category}
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
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {(post.preview || post.excerpt)?.length > 200
                          ? `${(post.preview || post.excerpt).substring(0, 200)}...` 
                          : (post.preview || post.excerpt)
                        }
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">{estimateReadingTime(post.content)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No blog posts available in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <div className="pb-16"></div>
      
      <Footer />
    </div>
  );
};

export default Blog;
