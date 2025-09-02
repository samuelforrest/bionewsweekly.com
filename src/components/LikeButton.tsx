
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LikeButtonProps {
  blogId: string;
}

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

      // Check if current user has liked this post
      if (user) {
        // For authenticated users, check by user_id
        const userLike = likes?.find(like => like.user_id === user.id);
        setIsLiked(!!userLike);
      } else {
        // For anonymous users, check localStorage since we can't uniquely identify them in DB
        const anonymousLikes = getAnonymousLikes();
        setIsLiked(anonymousLikes.includes(blogId));
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

      if (isLiked) {
        // Remove like from database
        if (user) {
          // For authenticated users, delete their specific like
          const { error } = await supabase
            .from('likes')
            .delete()
            .eq('blog_id', blogId)
            .eq('user_id', user.id);

          if (error) {
            console.error('Database error:', error);
            throw error;
          }
        } else {
          // For anonymous users, delete one anonymous like and update localStorage
          const { error } = await supabase
            .from('likes')
            .delete()
            .eq('blog_id', blogId)
            .is('user_id', null)
            .limit(1);

          if (error) {
            console.error('Database error:', error);
            throw error;
          }

          // Update localStorage
          const anonymousLikes = getAnonymousLikes();
          const updatedLikes = anonymousLikes.filter(id => id !== blogId);
          saveAnonymousLikes(updatedLikes);
        }

        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        toast.success('Like removed');
      } else {
        // Add like to database
        const likeData: { 
          blog_id: string; 
          created_at: string;
          user_id?: string | null;
        } = { 
          blog_id: blogId, 
          created_at: new Date().toISOString()
        };

        if (user) {
          likeData.user_id = user.id;
        } else {
          likeData.user_id = null; // Anonymous users get null user_id
        }

        const { data, error } = await supabase
          .from('likes')
          .insert([likeData])
          .select();

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        // Update localStorage for anonymous users
        if (!user) {
          const anonymousLikes = getAnonymousLikes();
          if (!anonymousLikes.includes(blogId)) {
            anonymousLikes.push(blogId);
            saveAnonymousLikes(anonymousLikes);
          }
        }

        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        
        if (user) {
          toast.success('Post liked!');
        } else {
          toast.success('Post liked! Thanks for your feedback');
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      
      // Provide more specific error information
      if (error && typeof error === 'object' && 'message' in error) {
        const errorObj = error as { message?: string; code?: string; details?: string };
        console.error('Error message:', errorObj.message);
        console.error('Error code:', errorObj.code);
        console.error('Error details:', errorObj.details);
        toast.error(`Failed to update like: ${errorObj.message || 'Unknown error'}`);
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
