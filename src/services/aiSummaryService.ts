export interface AISummary {
  id: string;
  postId: string;
  summary: string;
  keyPoints: string[];
  estimatedReadTime: string;
  createdAt: string;
}

// Simple cache to store summaries in memory
const summaryCache = new Map<string, AISummary>();

// Function to estimate reading time based on content length
function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

// Function to call Gemini AI API
async function generateAISummary(title: string, content: string): Promise<{ summary: string; keyPoints: string[] }> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env.local file.');
  }

  const plainTextContent = stripHtml(content);
  
  const prompt = `Please provide a concise summary and key takeaways for this blog post:

Title: ${title}

Content: ${plainTextContent}

Please respond in the following JSON format:
{
  "summary": "A 2-3 sentence summary of the main points",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
}

Keep the summary concise and the key points as bullet-worthy insights. Limit to 3-5 key points maximum.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini AI');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Try to parse JSON response
    try {
      const parsedResponse = JSON.parse(generatedText);
      return {
        summary: parsedResponse.summary || 'Summary not available',
        keyPoints: parsedResponse.keyPoints || []
      };
    } catch (parseError) {
      // If JSON parsing fails, use the raw text as summary
      return {
        summary: generatedText.substring(0, 300) + '...',
        keyPoints: []
      };
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export async function getCachedBlogSummary(postId: string, title: string, content: string): Promise<AISummary> {
  // Check cache first
  if (summaryCache.has(postId)) {
    return summaryCache.get(postId)!;
  }

  try {
    // Generate new summary
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

    // Cache the result
    summaryCache.set(postId, aiSummary);
    
    return aiSummary;
  } catch (error) {
    console.error('Failed to generate AI summary:', error);
    throw error;
  }
}

// Function to clear cache (useful for development)
export function clearSummaryCache(): void {
  summaryCache.clear();
}
