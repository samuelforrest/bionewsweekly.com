
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "./RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { BlogPost } from "@/services/blogService";

interface BlogPostFormProps {
  post?: BlogPost;
  onSave: () => void;
  onCancel: () => void;
}

export function BlogPostForm({ post, onSave, onCancel }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [preview, setPreview] = useState(post?.preview || "");
  const [category, setCategory] = useState(post?.category || "");
  const [author, setAuthor] = useState(post?.author || "Samuel Forrest");
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [tags, setTags] = useState(post?.tags?.join(", ") || "");
  const [loading, setLoading] = useState(false);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Auto-generate slug if it's empty or matches the previous title's slug
    if (!slug || slug === generateSlug(post?.title || "")) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      
      const postData = {
        title,
        content,
        preview,
        category,
        author,
        cover_image: coverImage,
        slug: slug || generateSlug(title),
        tags: tagsArray.length > 0 ? tagsArray : null,
      };

      if (post?.id) {
        // Update existing post
        const { error } = await supabase
          .from('blogs')
          .update(postData)
          .eq('id', post.id);

        if (error) throw error;
        toast.success("Blog post updated successfully!");
      } else {
        // Create new post
        const { error } = await supabase
          .from('blogs')
          .insert([postData]);

        if (error) throw error;
        toast.success("Blog post created successfully!");
      }

      onSave();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("Failed to save blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-friendly-version-of-title"
              required
            />
            <p className="text-sm text-muted-foreground mt-1">
              This will be used in the URL: /blog/{slug}
            </p>
          </div>

          <div>
            <Label htmlFor="preview">Preview</Label>
            <Textarea
              id="preview"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              placeholder="Short preview text for blog listings"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="technology, programming, web development"
            />
          </div>

          <div>
            <Label>Content</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
