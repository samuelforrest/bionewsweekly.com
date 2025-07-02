import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain, Clock, Lightbulb } from 'lucide-react';
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

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        setError(null);
        
        const aiSummary = await getCachedBlogSummary(postId, title, content);
        setSummary(aiSummary);
      } catch (err) {
        console.error('Failed to generate AI summary:', err);
        setError('Unable to generate AI summary');
      } finally {
        setLoading(false);
      }
    }

    if (postId && title && content) {
      fetchSummary();
    }
  }, [postId, title, content]);

  if (loading) {
    return (
      <Card className="mb-8 border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">AI Summary</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              Gemini AI
            </Badge>
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
      <Card className="mb-8 border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">AI Summary</CardTitle>
            <Badge variant="destructive" className="text-xs">
              Unavailable
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            AI summary could not be generated at this time. Please read the full article below.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">AI Summary</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              Gemini AI
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {summary.estimatedReadTime}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {summary.summary}
          </p>
        </div>
        
        {summary.keyPoints.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
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
