import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getCachedBlogSummary } from '@/services/aiSummaryService';

export function TestAISummary() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testSummary = async () => {
    setLoading(true);
    try {
      const summary = await getCachedBlogSummary(
        'test-123',
        'Test Blog Post',
        'This is a test blog post content. It contains some information about AI and machine learning. The post discusses various aspects of artificial intelligence and its applications in modern technology.'
      );
      setResult(JSON.stringify(summary, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Test AI Summary</h3>
      <Button onClick={testSummary} disabled={loading}>
        {loading ? 'Testing...' : 'Test AI Summary'}
      </Button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
}
