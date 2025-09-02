import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain, Clock, Lightbulb, X } from 'lucide-react';
import { getCachedBlogSummary, type AISummary } from '@/services/aiSummaryService';

interface AISummaryComponentProps {
  postId: string;
  title: string;
  content: string;
}

export function AISummaryComponent({ postId, title, content }: AISummaryComponentProps) {
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching summary for post:', postId);
        const aiSummary = await getCachedBlogSummary(postId, title, content);
        console.log('Summary received:', aiSummary);
        setSummary(aiSummary);
      } catch (err) {
        console.error('Failed to generate AI summary:', err);
        setError(err instanceof Error ? err.message : 'Unable to generate AI summary');
      } finally {
        setLoading(false);
      }
    }

    if (postId && title && content) {
      fetchSummary();
    }
  }, [postId, title, content]);

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <Card className="mb-8 border-l-4 border-l-blue-500 bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg text-blue-500">AI Summary</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              Gemini AI
            </Badge>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-auto p-1 hover:bg-muted rounded-full transition-colors"
              aria-label="Hide AI Summary"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !summary) {
    return (
      <Card className="mb-8 border-l-4 border-l-red-500 bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg text-blue-500">AI Summary</CardTitle>
            <Badge variant="destructive" className="text-xs">
              Unavailable
            </Badge>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-auto p-1 hover:bg-muted rounded-full transition-colors"
              aria-label="Hide AI Summary"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            {error || 'AI summary could not be generated at this time. Please read the full article below.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 border-l-4 border-l-blue-500 bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg text-blue-500">AI Summary</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              Gemini AI
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {summary.estimatedReadTime}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-muted rounded-full transition-colors"
              aria-label="Hide AI Summary"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm leading-relaxed text-foreground">
            {summary.summary}
          </p>
        </div>
        
        {summary.keyPoints.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1 text-foreground">
              <Lightbulb className="h-3 w-3" />
              Key Takeaways
            </h4>
            <ul className="space-y-1">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
