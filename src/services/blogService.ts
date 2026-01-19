import rawBlogPosts, { type RawBlogPost } from "@/data/blogPosts";

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

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "");

const toBlogPost = (post: RawBlogPost): BlogPost => {
  const slug = post.slug ? normalizeSlug(post.slug) : normalizeSlug(post.title);
  const excerptSource = post.preview || post.content || "";

  return {
    id: post.id,
    title: post.title,
    excerpt:
      excerptSource.length > 150
        ? `${excerptSource.substring(0, 150)}...`
        : excerptSource,
    preview: post.preview || null,
    date: new Date(post.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    slug,
    category: post.category,
    author: post.author || "Samuel Forrest",
    content: post.content,
    cover_image: post.cover_image || undefined,
    tags: post.tags || [],
  };
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return [...rawBlogPosts]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .map(toBlogPost);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const normalizedSlug = normalizeSlug(slug);

  const post = rawBlogPosts.find((p) => {
    const postSlug = p.slug ? normalizeSlug(p.slug) : normalizeSlug(p.title);
    return postSlug === normalizedSlug;
  });

  return post ? toBlogPost(post) : null;
}
