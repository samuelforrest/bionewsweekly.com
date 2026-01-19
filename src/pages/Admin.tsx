import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllBlogPosts, type BlogPost } from "@/services/blogService";
import { toast } from "sonner";
import { Edit, Trash2, Plus, Info, ExternalLink } from "lucide-react";

const STATIC_MODE = true;

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
    if (STATIC_MODE) {
      toast.info("Static content mode: editing is disabled.");
      return;
    }
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (STATIC_MODE) {
      toast.info("Static content mode: deleting is disabled.");
      return;
    }

    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavbar onLogout={handleLogout} />
        <div className="container mx-auto px-6 py-8">
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
    <div className="min-h-screen bg-background">
      <AdminNavbar onLogout={handleLogout} />

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Article Management Portal, best on Desktop.
            </p>
          </div>
          <Button
            onClick={() => {
              if (STATIC_MODE) {
                toast.info(
                  "Static content mode: adding new posts is disabled.",
                );
                return;
              }
              setShowForm(true);
            }}
            disabled={STATIC_MODE}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </div>

        <Card className="mb-8 border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/50 to-transparent dark:from-red-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <Info className="h-5 w-5" />
              Important Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Article Guidelines:
                </h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <strong className="text-foreground">
                      Do not change the slug
                    </strong>{" "}
                    of existing articles - Google wont like it
                  </li>
                  <li>
                    Always add proper headings (H1, H2, H3) to structure your
                    content
                  </li>
                  <li>
                    Use bold, italics and add images as and when you wish.
                  </li>
                  <li>
                    It's best practice to make all text color <b>Black</b> as it
                    auto-adapts to user's colour mode.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Images Guidelines
                </h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    Find royalty-free images on{" "}
                    <a
                      href="https://unsplash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 underline underline-offset-2 inline-flex items-center gap-1"
                    >
                      Unsplash <ExternalLink className="h-3 w-3" />
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://pixabay.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 underline underline-offset-2 inline-flex items-center gap-1"
                    >
                      Pixabay <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li>
                    Copy the direct image link and paste it in the "Cover Image
                    URL" field
                  </li>
                  <li>
                    Ensure images are high quality and relevant to your article
                    content, as well as appropriate.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">
              Blog Posts ({blogPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center p-8 text-muted-foreground">
                Loading...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Title</TableHead>
                      <TableHead className="text-foreground">
                        Category
                      </TableHead>
                      <TableHead className="text-foreground">Author</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-foreground">
                          {post.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {post.category}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {post.author}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {post.date}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(post)}
                              disabled={STATIC_MODE}
                              className="hover:bg-primary hover:text-primary-foreground"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(post.id)}
                              disabled={STATIC_MODE}
                              className="hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
