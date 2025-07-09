
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LikeButtonProps {
  blogId: string;
}

// Helper function to get or create anonymous user ID
const getAnonymousUserId = (): string => {
  if (typeof window === 'undefined') return 'anonymous';
  
  let anonymousId = localStorage.getItem('bionews_anonymous_id');
  if (!anonymousId) {
    // Generate a unique anonymous ID
    anonymousId = `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('bionews_anonymous_id', anonymousId);
  }
  return anonymousId;
};

// Helper functions for anonymous likes in localStorage
const getAnonymousLikes = (): string[] => {
  if (typeof window === 'undefined') return [];
  const likes = localStorage.getItem('bionews_anonymous_likes');
  return likes ? JSON.parse(likes) : [];
};

const saveAnonymousLikes = (likes: string[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bionews_anonymous_likes', JSON.stringify(likes));
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

      // Determine the user ID to check for likes
      const userId = user ? user.id : getAnonymousUserId();
      
      // Check if current user (authenticated or anonymous) has liked this post
      const userLike = likes?.find(like => like.user_id === userId);
      setIsLiked(!!userLike);
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
      // Determine the user ID (authenticated or anonymous)
      const userId = user ? user.id : getAnonymousUserId();

      if (isLiked) {
        // Remove like from database
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('blog_id', blogId)
          .eq('user_id', userId);

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        toast.success('Like removed');
      } else {
        // Add like to database
        const { error } = await supabase
          .from('likes')
          .insert([{ 
            blog_id: blogId, 
            user_id: userId,
            created_at: new Date().toISOString()
          }]);

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        
        if (user) {
          toast.success('Post liked!');
        } else {
          toast.success('Post liked! (Anonymous like saved)');
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      
      // Provide more specific error information
      if (error instanceof Error) {
        toast.error(`Failed to update like: ${error.message}`);
      } else {
        toast.error('Failed to update like - please try again');
      }
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
