
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LikeButtonProps {
  blogId: string;
}

// Helper function to get local likes from localStorage
const getLocalLikes = (): string[] => {
  if (typeof window === 'undefined') return [];
  const likes = localStorage.getItem('bionews_likes');
  return likes ? JSON.parse(likes) : [];
};

// Helper function to save local likes to localStorage
const saveLocalLikes = (likes: string[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bionews_likes', JSON.stringify(likes));
};

export function LikeButton({ blogId }: LikeButtonProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLikes = useCallback(async () => {
    try {
      // Get total likes count
      const { data: likes, error: likesError } = await supabase
        .from('likes')
        .select('*')
        .eq('blog_id', blogId);

      if (likesError) throw likesError;

      setLikeCount(likes?.length || 0);

      // Check if current user has liked this post
      if (user) {
        // For authenticated users, check database
        const userLike = likes?.find(like => like.user_id === user.id);
        setIsLiked(!!userLike);
      } else {
        // For anonymous users, check localStorage
        const localLikes = getLocalLikes();
        setIsLiked(localLikes.includes(blogId));
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [blogId, user]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLike = async () => {
    setLoading(true);

    try {
      if (user) {
        // Authenticated user - use database
        if (isLiked) {
          // Remove like
          const { error } = await supabase
            .from('likes')
            .delete()
            .eq('blog_id', blogId)
            .eq('user_id', user.id);

          if (error) throw error;

          setIsLiked(false);
          setLikeCount(prev => prev - 1);
          toast.success('Like removed');
        } else {
          // Add like
          const { error } = await supabase
            .from('likes')
            .insert([{ blog_id: blogId, user_id: user.id }]);

          if (error) throw error;

          setIsLiked(true);
          setLikeCount(prev => prev + 1);
          toast.success('Post liked!');
        }
      } else {
        // Anonymous user - use localStorage only
        const localLikes = getLocalLikes();
        
        if (isLiked) {
          // Remove like locally
          const updatedLikes = localLikes.filter(id => id !== blogId);
          saveLocalLikes(updatedLikes);
          setIsLiked(false);
          setLikeCount(prev => prev - 1);
          toast.success('Like removed (local only)');
        } else {
          // Add like locally
          const updatedLikes = [...localLikes, blogId];
          saveLocalLikes(updatedLikes);
          setIsLiked(true);
          setLikeCount(prev => prev + 1);
          toast.success('Post liked! (Sign in to save permanently)');
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
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
      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
      {likeCount}
    </Button>
  );
}
