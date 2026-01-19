import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "./RichTextEditor";
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
  const STATIC_MODE = true;

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (!slug || slug === generateSlug(post?.title || "")) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Static content mode: posts are read-only.");
    onCancel();
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">
          {post ? "Edit Blog Post" : "Create New Blog Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-foreground">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              className="border-input bg-background text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-foreground">
              URL Slug
            </Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-friendly-version-of-title"
              required
              className="border-input bg-background text-foreground placeholder:text-muted-foreground"
            />
            <p className="text-sm text-muted-foreground mt-1">
              This will be used in the URL: /blog/{slug}
            </p>
          </div>

          <div>
            <Label htmlFor="preview" className="text-foreground">
              Preview
            </Label>
            <Textarea
              id="preview"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              placeholder="Short preview text for blog listings"
              rows={3}
              className="border-input bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-foreground">
              Category
            </Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border-input bg-background text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="author" className="text-foreground">
              Author
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="border-input bg-background text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="coverImage" className="text-foreground">
              Cover Image URL
            </Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border-input bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <Label htmlFor="tags" className="text-foreground">
              Tags (comma separated)
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="technology, programming, web development"
              className="border-input bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <Label className="text-foreground">Content</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={STATIC_MODE}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {post ? "Update Post (disabled)" : "Create Post (disabled)"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
