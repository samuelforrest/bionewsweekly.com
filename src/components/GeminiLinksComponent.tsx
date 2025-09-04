import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Lightbulb, Globe, X } from 'lucide-react';

interface GeminiLinksComponentProps {
  title: string;
  content: string;
}

interface LinkInfo {
  title: string;
  url: string;
}

// Function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

export function GeminiLinksComponent({ title, content }: GeminiLinksComponentProps) {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      setLoading(true);
      setError(null);
      
      try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        
        if (!apiKey) {
          throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env.local file.');
        }

        const plainTextContent = stripHtml(content);
        
        const prompt = `Please suggest 3-5 reputable, up-to-date external links for further reading on the following topic. For each link, provide a title and URL.

Title: ${title}

Content: ${plainTextContent.slice(0, 1000)}

Please respond with a JSON object containing a "links" array in this exact format:
{
  "links": [
    {
      "title": "Link title",
      "url": "https://example.com"
    }
  ]
}

Ensure all URLs are real, working links to reputable sources like scientific journals, educational institutions, or well-known science websites.`;

        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        
        const requestBody = {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that suggests relevant external links for further reading on scientific and educational topics. Always respond with valid JSON only, no markdown formatting or code blocks."
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
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
          throw new Error('No response from OpenAI ChatGPT');
        }

        const generatedText = data.choices[0].message.content;
        
        // Parse the JSON response
        const parsedResponse = JSON.parse(generatedText);
        const parsedLinks = parsedResponse.links || parsedResponse;
        
        if (Array.isArray(parsedLinks) && parsedLinks.length > 0) {
          setLinks(parsedLinks);
        } else {
          throw new Error('No valid links found in response');
        }
        
      } catch (err) {
        console.error('Failed to generate further reading links:', err);
        setError(err instanceof Error ? err.message : 'Unable to generate reading links');
      } finally {
        setLoading(false);
      }
    }
    
    if (title && content) {
      fetchLinks();
    }
  }, [title, content]);

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <Card className="mb-8 border-l-4 border-l-green-500 bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg text-green-500">Further Reading</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              ChatGPT
            </Badge>
            <Badge variant="outline" className="text-xs">
              Beta
            </Badge>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-auto p-1 hover:bg-muted rounded-full transition-colors"
              aria-label="Hide Further Reading"
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

  if (error || !links.length) {
    return (
      <Card className="mb-8 border-l-4 border-l-red-500 bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg text-green-500">Further Reading</CardTitle>
            <Badge variant="destructive" className="text-xs">
              Unavailable
            </Badge>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-auto p-1 hover:bg-muted rounded-full transition-colors"
              aria-label="Hide Further Reading"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            {error || 'Further reading links could not be generated at this time.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 border-l-4 border-l-green-500 bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-green-500" />
          <CardTitle className="text-lg text-green-500">Further Reading</CardTitle>
          <Badge variant="secondary" className="text-xs">
            <Lightbulb className="h-3 w-3 mr-1" />
            Gemini AI
          </Badge>
          <Badge variant="outline" className="text-xs">
            Beta
          </Badge>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Hide Further Reading"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground mb-4">
          AI-suggested links for deeper exploration of this topic
        </p>
        <ul className="space-y-4">
          {links.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group hover:text-primary transition-colors p-3 rounded-lg hover:bg-muted/30"
              >
                <ExternalLink className="w-4 h-4 mt-1 text-green-500 group-hover:text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm block group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
