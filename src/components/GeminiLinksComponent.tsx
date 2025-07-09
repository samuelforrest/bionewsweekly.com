import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ExternalLink } from 'lucide-react';

interface GeminiLinksComponentProps {
  title: string;
  content: string;
}

interface LinkInfo {
  title: string;
  url: string;
  description?: string;
}

export function GeminiLinksComponent({ title, content }: GeminiLinksComponentProps) {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLinks() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/gemini-links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });
        const data = await res.json();
        if (data.links && Array.isArray(data.links)) {
          setLinks(data.links);
        } else {
          setError(data.error || 'No links found.');
        }
      } catch (e) {
        setError('Could not fetch further reading links.');
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, [title, content]);

  return (
    <Card className="mb-12 mt-8 bg-card/70 border-border/60 shadow-lg rounded-2xl">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
          Further Reading
          <span className="text-base font-normal text-muted-foreground">(AI suggested)</span>
        </h3>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin w-5 h-5" />
            Fetching links...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ul className="space-y-4">
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mt-1 text-muted-foreground group-hover:text-primary" />
                  <span>
                    <span className="font-semibold underline underline-offset-2 group-hover:text-primary">
                      {link.title}
                    </span>
                    {link.description && (
                      <span className="block text-sm text-muted-foreground mt-0.5">{link.description}</span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
