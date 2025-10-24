import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, type BlogPost } from "@/services/blogService";
import { LikeButton } from "@/components/LikeButton";
import { AISummaryComponent } from "@/components/AISummaryComponent";
import "../components/QuillContent.css";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      try {
        const fetchedPost = await getBlogPostBySlug(slug);
        setPost(fetchedPost);

        if (fetchedPost) {
          document.title = `${fetchedPost.title} | Samuel Forrest`;
        } else {
          document.title = "Post Not Found | Samuel Forrest";
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-foreground">Loading post...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow mt-20 pt-6 pb-16">
        <article className="container px-3 md:px-4 mx-auto max-w-5xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 font-serif text-foreground">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>By {post.author}</span>
              <span>•</span>
              <span className="bg-secondary px-2 py-1 rounded-full text-xs text-secondary-foreground">
                {post.category}
              </span>
            </div>
          </div>

          {post.cover_image && (
            <div className="mb-8">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          <AISummaryComponent
            postId={post.id}
            title={post.title}
            content={post.content || ""}
          />

          <div
            className="ql-editor prose prose-lg max-w-none mb-8 text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-blockquote:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-li:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          <div className="flex items-center gap-4 mb-8 py-4 border-y border-border">
            <LikeButton blogId={post.id} />
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const title = encodeURIComponent(post.title);
                  window.open(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              >
                Share on LinkedIn
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
