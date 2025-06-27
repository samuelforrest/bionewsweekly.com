
import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllBlogPosts, type BlogPost } from "@/services/blogService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Edit, Trash2, Plus, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogPosts();
    }
  }, [isAuthenticated]);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const posts = await getAllBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast.error("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      
      toast.success("Blog post deleted successfully!");
      fetchBlogPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast.error("Failed to delete blog post");
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingPost(null);
    fetchBlogPosts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <BlogPostForm
            post={editingPost || undefined}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-lime-500">Blog Admin</h1>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2 text-white" />
            New Post
          </Button>
        </div>

        {/* Information Section */}
        <Card className="mb-8 border-blue-200 bg-blue-50/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <Info className="h-5 w-5" />
              Important Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">Login Information:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Password: <code className="bg-gray-800 px-2 py-1 rounded text-lime-500">bionews2025</code> (no caps)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Article Guidelines:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li><strong>Do not change the slug</strong> of existing articles - this will break links</li>
                  <li>Always add proper headings (H1, H2, H3) to structure your content</li>
                  <li>Use the rich text editor formatting tools for better readability</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Images:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Find royalty-free images on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Unsplash</a> or <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Pixabay</a></li>
                  <li>Copy the direct image link and paste it in the "Cover Image URL" field</li>
                  <li>Ensure images are high quality and relevant to your article content</li>
                  <li>Recommended image size: at least 1200x600 pixels for best display</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Other Info:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Database runs on Supabase, uptime is 99.9%</li>
                  <li>Swipe right across the blog article admins to the edit button.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center p-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline" className="border border-white text-white hover:bg-white hover:text-black">
              Go back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
