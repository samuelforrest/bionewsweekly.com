export interface AISummary {
  id: string;
  postId: string;
  summary: string;
  keyPoints: string[];
  estimatedReadTime: string;
  createdAt: string;
}

const summaryCache = new Map<string, AISummary>();

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function stripHtml(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

async function generateAISummary(title: string, content: string): Promise<{ summary: string; keyPoints: string[] }> {
  const plainTextContent = stripHtml(content);
  
  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `Title: ${title}\n\nContent: ${plainTextContent}`
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.summary) {
      throw new Error('No summary received from AI service');
    }

    const sentences = data.summary.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const keyPoints = sentences.slice(0, 3).map(s => s.trim());

    return {
      summary: data.summary,
      keyPoints: keyPoints.length > 0 ? keyPoints : ["AI-generated summary available"]
    };
  } catch (error) {
    console.error('Error calling AI summary API:', error);
    throw error;
  }
}

export async function getCachedBlogSummary(postId: string, title: string, content: string): Promise<AISummary> {
  if (summaryCache.has(postId)) {
    return summaryCache.get(postId)!;
  }

  try {
    const { summary, keyPoints } = await generateAISummary(title, content);
    const estimatedReadTime = estimateReadingTime(content);
    
    const aiSummary: AISummary = {
      id: `summary_${postId}_${Date.now()}`,
      postId,
      summary,
      keyPoints,
      estimatedReadTime,
      createdAt: new Date().toISOString()
    };
    summaryCache.set(postId, aiSummary);
    
    return aiSummary;
  } catch (error) {
    console.error('Failed to generate AI summary:', error);
    throw error;
  }
}


export function clearSummaryCache(): void {
  summaryCache.clear();
}
