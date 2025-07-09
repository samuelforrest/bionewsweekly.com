
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LikeButtonProps {
  blogId: string;
}

export function LikeButton({ blogId }: LikeButtonProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLikes();
  }, [blogId, user]);

  const fetchLikes = async () => {
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
        const userLike = likes?.find(like => like.user_id === user.id);
        setIsLiked(!!userLike);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Please sign in to like posts');
      return;
    }

    setLoading(true);

    try {
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
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert([{ blog_id: blogId, user_id: user.id }]);

        if (error) throw error;

        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error: any) {
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
