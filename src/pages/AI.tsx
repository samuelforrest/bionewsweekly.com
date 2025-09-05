import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Loader2, Brain, BookOpen } from 'lucide-react';
import { getAllBlogPosts, type BlogPost } from '@/services/blogService';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const stripHtml = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const AI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI biology tutor. I have knowledge of all the articles on BioNewsWeekly and can help you understand complex biology concepts. What would you like to learn about today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to bottom when new messages are added (only after user interaction)
  useEffect(() => {
    if (!hasInteracted) return;
    
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    // Scroll immediately
    scrollToBottom();
    
    // Also scroll after a short delay to handle any rendering delays
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading, hasInteracted]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Mark that user has interacted with the chat
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(input, blogPosts, messages);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      
      <main className="flex-1 mt-20 pt-4 pb-4 flex flex-col">
        <div className="container mx-auto px-4 py-4 md:py-8 flex-1 flex flex-col">
          <div className="max-w-4xl mx-auto flex-1 flex flex-col">
            
            <div className="text-center mb-4 md:mb-8 flex-shrink-0">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">AI Biology Tutor</h1>
              </div>
              <p className="text-sm md:text-lg text-muted-foreground mb-4 px-4">
                Get personalized help with biology concepts using our AI tutor trained on all BioNewsWeekly articles
                <br></br>🫢 Disclaimer: I do not remember stuff if you leave this tab 🫢
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {isLoadingPosts ? 'Loading...' : `${blogPosts.length} Articles`}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ChatGPT Powered
                </Badge>
              </div>
            </div>

            
            <Card className="flex-1 flex flex-col min-h-0">
              <CardHeader className="flex-shrink-0 pb-2 md:pb-3">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Bot className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Chat with AI Tutor
                </CardTitle>
              </CardHeader>
            
              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                
                <div 
                  ref={chatContainerRef}
                  className="flex-1 p-3 md:p-4 overflow-y-auto min-h-0"
                >
                  <div className="space-y-3 md:space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 md:gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="h-3 w-3 md:h-4 md:w-4" />
                        ) : (
                          <Bot className="h-3 w-3 md:h-4 md:w-4" />
                        )}
                      </div>
                      
                      <div className={`flex-1 max-w-[85%] md:max-w-[80%] ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}>
                        <div className={`inline-block p-2 md:p-3 rounded-lg text-sm md:text-base ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="inline-block p-2 md:p-3 rounded-lg bg-muted">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
                            <span className="text-muted-foreground text-sm md:text-base">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="flex-shrink-0 p-3 md:p-4 border-t bg-background">
                <div className="flex gap-2">
                  {isMobile ? (
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about our articles or bio!"
                      className="flex-1 text-sm resize-none min-h-[40px] max-h-24"
                      disabled={isLoading}
                      rows={1}
                    />
                  ) : (
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about biology concepts, articles, or get study help..."
                      className="flex-1 text-sm md:text-base"
                      disabled={isLoading}
                    />
                  )}
                  <Button 
                    onClick={sendMessage} 
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="h-10 w-10 md:h-10 md:w-10 self-end"
                  >
                    <Send className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-1">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </main>
      
      <Footer />
    </div>
  );
};

// AI Response Generation Function
async function generateAIResponse(
  userMessage: string, 
  blogPosts: BlogPost[], 
  chatHistory: ChatMessage[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env.local file.');
  }

  const articlesContext = blogPosts.map(post => {
    const content = stripHtml(post.content || '');
    return `Title: ${post.title}\nExcerpt: ${post.excerpt || ''}\nContent Preview: ${content.slice(0, 500)}...`;
  }).join('\n\n---\n\n');

  // Create chat history context
  const recentHistory = chatHistory.slice(-6).map(msg => 
    `${msg.role}: ${msg.content}`
  ).join('\n');

  const systemPrompt = `You are an expert biology tutor with access to a comprehensive database of biology articles from BioNewsWeekly. Your role is to:

1. Help students understand complex biology concepts
2. Provide clear, educational explanations
3. Reference relevant articles when appropriate
4. Adapt your teaching style to the student's level
5. Encourage curiosity and deeper learning

Available Articles Context:
${articlesContext}

Guidelines:
- Be encouraging and supportive
- Use analogies and examples to explain complex concepts
- Break down difficult topics into digestible parts
- Reference specific articles when they're relevant to the question
- Ask follow-up questions to ensure understanding
- Provide study tips and learning strategies when helpful

Keep responses conversational, informative, and educational. Aim for 2-3 paragraphs unless a longer explanation is needed.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Chat History:\n${recentHistory}\n\nCurrent Question: ${userMessage}` }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenAI ChatGPT');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

export default AI;
