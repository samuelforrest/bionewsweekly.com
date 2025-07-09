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
  
  console.log('API Key check:', apiKey ? 'API key is present' : 'API key is missing');
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env.local file.');
  }

  const plainTextContent = stripHtml(content);
  console.log('Content length:', plainTextContent.length);
  
  const prompt = `Please provide a concise summary and key takeaways for this blog post, use Great British UK English:

Title: ${title}

Content: ${plainTextContent}

Please respond with ONLY a valid JSON object in this exact format (no markdown, no code blocks, no additional text):
{
  "summary": "A 2-3 sentence summary of the main points",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
}

Keep the summary concise and the key points as bullet-worthy insights. Limit to 3-5 key points maximum. Return only the JSON object without any markdown formatting.`;

  try {
    console.log('Making API request to Gemini...');
    
    // Test if the API key is accessible
    console.log('Environment variables:', import.meta.env);
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    console.log('API URL (key redacted):', apiUrl.replace(apiKey, '[REDACTED]'));
    
    const requestBody = {
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
    };
    
    console.log('Request body:', requestBody);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini AI');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);
    
    // Clean the response by removing markdown code blocks
    let cleanedText = generatedText.trim();
    
    // Remove ```json and ``` markers if present
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    console.log('Cleaned text:', cleanedText);
    
    // Try to parse JSON response
    try {
      const parsedResponse = JSON.parse(cleanedText);
      return {
        summary: parsedResponse.summary || 'Summary not available',
        keyPoints: parsedResponse.keyPoints || []
      };
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Failed to parse:', cleanedText);
      
      // If JSON parsing still fails, try to extract summary and keyPoints manually
      if (cleanedText.includes('"summary"') && cleanedText.includes('"keyPoints"')) {
        try {
          // Try to find the JSON part within the text
          const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const extractedJson = JSON.parse(jsonMatch[0]);
            return {
              summary: extractedJson.summary || 'Summary not available',
              keyPoints: extractedJson.keyPoints || []
            };
          }
        } catch (extractError) {
          console.error('JSON extraction error:', extractError);
        }
      }
      
      // Final fallback: use the raw text as summary
      return {
        summary: cleanedText.substring(0, 300) + (cleanedText.length > 300 ? '...' : ''),
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
