import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getCachedBlogSummary, clearSummaryCache } from '@/services/aiSummaryService';

export function TestAISummary() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testSummary = async () => {
    setLoading(true);
    try {
      // Clear cache to test fresh
      clearSummaryCache();
      
      const summary = await getCachedBlogSummary(
        'test-123',
        'Test Blog Post',
        'This is a test blog post content. It contains some information about AI and machine learning. The post discusses various aspects of artificial intelligence and its applications in modern technology. Artificial intelligence has revolutionized many industries by providing automated solutions and improving efficiency. Machine learning algorithms can analyze vast amounts of data to identify patterns and make predictions. These technologies are being used in healthcare for diagnostic purposes, in finance for fraud detection, and in transportation for autonomous vehicles.'
      );
      setResult(JSON.stringify(summary, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Test AI Summary</h3>
      <Button onClick={testSummary} disabled={loading}>
        {loading ? 'Testing...' : 'Test AI Summary'}
      </Button>
      {result && (
        <pre className="mt-4 p-4 bg-muted rounded text-sm overflow-auto text-foreground">
          {result}
        </pre>
      )}
    </div>
  );
}
