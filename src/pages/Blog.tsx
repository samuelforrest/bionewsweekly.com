
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts, type BlogPost } from "@/services/blogService";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Clock } from 'lucide-react';

// Helper function to estimate reading time
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow mt-20 pt-6">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">Articles</h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Latest news in the field of <span className="text-lime-500">Biology</span>.
            </p>
          </div>
          
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              className={`rounded-full bg-white !text-black border-black hover:bg-gray-100 transition-transform duration-200 ${
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
                className={`rounded-full bg-white !text-black border-black hover:bg-gray-100 transition-transform duration-200 ${
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
              <div className="animate-pulse text-white">Loading posts...</div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in bg-gray-800 cursor-pointer border border-white">
                    <div className="relative overflow-hidden">
                      {post.cover_image && (
                        <img 
                          src={post.cover_image} 
                          alt={post.title} 
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      {!post.cover_image && (
                        <div className="flex items-center justify-center w-full h-48 bg-muted">
                          <p className="text-white">No image</p>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full text-black">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="line-clamp-2 text-white group-hover:scale-105 transition-transform duration-300">{post.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-white">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{estimateReadingTime(post.content)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-white line-clamp-3">
                        {(post.preview || post.excerpt)?.length > 200
                          ? `${(post.preview || post.excerpt).substring(0, 200)}...` 
                          : (post.preview || post.excerpt)
                        }
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-white">No blog posts available in this category.</p>
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
