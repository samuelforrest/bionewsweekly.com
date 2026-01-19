import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface LikeButtonProps {
  blogId: string;
}

const STORAGE_KEY = "bionews_static_likes";

const loadLocalLikes = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error reading likes from storage", error);
    return [];
  }
};

const saveLocalLikes = (likes: string[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  } catch (error) {
    console.error("Error saving likes to storage", error);
  }
};

export function LikeButton({ blogId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLikes = useCallback(async () => {
    const likes = loadLocalLikes();
    const liked = likes.includes(blogId);
    setIsLiked(liked);
    setLikeCount(liked ? 1 : 0);
  }, [blogId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLike = async () => {
    setLoading(true);

    try {
      const currentLikes = loadLocalLikes();

      if (isLiked) {
        const updatedLikes = currentLikes.filter((id) => id !== blogId);
        saveLocalLikes(updatedLikes);
        setIsLiked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
        toast.success("Like removed (local only)");
      } else {
        const updatedLikes = [...new Set([...currentLikes, blogId])];
        saveLocalLikes(updatedLikes);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        toast.success("Post liked locally");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Heart
        className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
      />
      {likeCount}
    </Button>
  );
}
