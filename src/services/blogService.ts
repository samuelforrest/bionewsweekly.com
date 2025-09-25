import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  author: string;
  content?: string;
  cover_image?: string;
  preview?: string;
  tags?: string[];
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  // Transform the data to match our BlogPost type
  return data.map(post => ({
    id: post.id,
    title: post.title,
    // Use preview if available, otherwise generate excerpt from content
    excerpt: post.content ? post.content.substring(0, 150) + '...' : '',
    preview: post.preview || null,
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    // Generate slug from title if not provided
    slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    category: post.category,
    author: post.author || 'Samuel Forrest',
    content: post.content,
    cover_image: post.cover_image,
    tags: post.tags || []
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
  
  const post = data.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug
  );
  
  if (!post) return null;
  
  return {
    id: post.id,
    title: post.title,
    excerpt: post.content ? post.content.substring(0, 150) + '...' : '',
    preview: post.preview || null,
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    category: post.category,
    author: post.author || 'Samuel Forrest',
    content: post.content,
    cover_image: post.cover_image,
    tags: post.tags || []
  };
}
