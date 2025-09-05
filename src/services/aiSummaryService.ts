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

// Function to call OpenAI ChatGPT API
async function generateAISummary(title: string, content: string): Promise<{ summary: string; keyPoints: string[] }> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  console.log('API Key check:', apiKey ? 'API key is present' : 'API key is missing');
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env.local file.');
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
    console.log('Making API request to OpenAI ChatGPT...');
    
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    console.log('API URL:', apiUrl);
    
    const requestBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise summaries and key points for blog posts. Always respond with valid JSON only, no markdown formatting or code blocks."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1024,
      response_format: { type: "json_object" }
    };
    
    console.log('Request body:', requestBody);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenAI ChatGPT');
    }

    const generatedText = data.choices[0].message.content;
    console.log('Generated text:', generatedText);
    
    let cleanedText = generatedText.trim();
    
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    console.log('Cleaned text:', cleanedText);
    
    try {
      const parsedResponse = JSON.parse(cleanedText);
      return {
        summary: parsedResponse.summary || 'Summary not available',
        keyPoints: parsedResponse.keyPoints || []
      };
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Failed to parse:', cleanedText);
      
      if (cleanedText.includes('"summary"') && cleanedText.includes('"keyPoints"')) {
        try {
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
      
      return {
        summary: cleanedText.substring(0, 300) + (cleanedText.length > 300 ? '...' : ''),
        keyPoints: []
      };
    }
  } catch (error) {
    console.error('Error calling OpenAI ChatGPT API:', error);
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
