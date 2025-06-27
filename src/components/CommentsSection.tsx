
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

interface CommentsSectionProps {
  blogId: string;
}

export function CommentsSection({ blogId }: CommentsSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      // First get the comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_id', blogId)
        .order('created_at', { ascending: false });

      if (commentsError) throw commentsError;

      // Then get the profile data for each comment
      const commentsWithProfiles = await Promise.all(
        (commentsData || []).map(async (comment) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', comment.user_id)
            .single();

          return {
            ...comment,
            profiles: profile || null
          };
        })
      );

      setComments(commentsWithProfiles);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          blog_id: blogId,
          user_id: user.id,
          content: newComment.trim()
        }]);

      if (error) throw error;

      setNewComment('');
      toast.success('Comment added successfully');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Comments</h3>
      
      {user ? (
        <Card className="border border-white">
          <CardHeader>
            <h4 className="text-lg font-semibold text-white">Add a comment</h4>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={4}
                className="border border-white text-white"
              />
              <Button type="submit" disabled={submitting} className="border border-white text-white hover:bg-white hover:text-black">
                {submitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-white">
          <CardContent className="pt-6">
            <p className="text-white">Please sign in to leave a comment.</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4 text-white">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="border border-white">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-white">
                    {comment.profiles?.full_name || comment.profiles?.email || 'Anonymous'}
                  </span>
                  <span className="text-sm text-white">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-white">{comment.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-white">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
}
