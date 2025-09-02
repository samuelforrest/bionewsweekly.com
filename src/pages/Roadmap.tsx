import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock, Rocket, Zap, Users, Database, Palette, Shield, LucideIcon, Settings2 } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  quarter: string;
  icon: LucideIcon;
  features: string[];
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'Initial Launch & Foundation',
    description: 'Core website functionality with basic blog features',
    status: 'completed',
    quarter: 'June 2024',
    icon: Rocket,
    features: [
      'Responsive article layout',
      'Article publishing system',
      'Basic admin portal',
      'Team showcase section',
      'Newsletter subscription'
    ]
  },
  {
    id: '2',
    title: 'Enhanced User Experience',
    description: 'Major UI/UX improvements and user engagement features',
    status: 'completed',
    quarter: 'July 2025',
    icon: Palette,
    features: [
      'Light/Dark mode theme system',
      'Modern, beautiful UI components',
      'Anonymous Liking of articles',
      'AI-powered article summaries',
      'Improved mobile responsiveness',
      'GDPR compliance; replacing terms of service',
    ]
  },
  {
    id: '3',
    title: 'Advanced Features',
    description: 'Building community features and user interaction',
    status: 'in-progress',
    quarter: 'Q3 2025',
    icon: Settings2, // changed from Users to Settings2 (cogs)
    features: [
      'Article bookmarking',
      'Learning features for students - AI bot',
      'Improved SEO and Marketing - 1st on Google',
      'Reading progress tracking',
      'Expanding team & producing more content',
    ]
  },
];

const statusConfig = {
  completed: {
    color: 'bg-green-500',
    textColor: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    icon: CheckCircle,
    label: 'Completed'
  },
  'in-progress': {
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: Clock,
    label: 'In Progress'
  },
  planned: {
    color: 'bg-gray-400',
    textColor: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-50 dark:bg-gray-950/30',
    borderColor: 'border-gray-200 dark:border-gray-800',
    icon: Circle,
    label: 'Planned'
  }
};

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Development Roadmap
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track the development of our website.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>
          
          <div className="space-y-8">
            {roadmapData.map((item, index) => {
              const config = statusConfig[item.status];
              const ItemIcon = item.icon;
              const StatusIcon = config.icon;
              
              return (
                <div key={item.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 rounded-full border-4 border-background bg-card hidden md:block">
                    <div className={`w-full h-full rounded-full ${config.color}`}></div>
                  </div>
                  
                  {/* Content card */}
                  <div className="md:ml-16">
                    <Card className={`${config.bgColor} ${config.borderColor} border-l-4`}>
                      <CardHeader>
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
                              <ItemIcon className={`h-5 w-5 ${config.textColor}`} />
                            </div>
                            <div>
                              <CardTitle className="text-foreground">{item.title}</CardTitle>
                              <p className="text-muted-foreground mt-1">{item.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`${config.textColor} ${config.borderColor}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                            <Badge variant="secondary">
                              {item.quarter}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          <h4 className="font-semibold text-foreground">Key Features:</h4>
                          <div className="grid gap-2">
                            {item.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                {item.status === 'completed' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                ) : item.status === 'in-progress' ? (
                                  <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                ) : (
                                  <Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                )}
                                <span className="text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {roadmapData.filter(item => item.status === 'completed').length}
              </div>
              <div className="text-muted-foreground">Completed Phases</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {roadmapData.filter(item => item.status === 'in-progress').length}
              </div>
              <div className="text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                {roadmapData.filter(item => item.status === 'planned').length}
              </div>
              <div className="text-muted-foreground">Planned Features</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 via-green-500/10 to-emerald-500/10 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Join Our Journey
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're building something amazing for the biology community. Stay tuned for updates 
                and be part of our growing platform that's making science more accessible to students worldwide.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="/#newsletter" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  <Rocket className="h-4 w-4" />
                  Subscribe for Updates
                </a>
                <a href="/blog" className="inline-flex items-center gap-2 border border-border bg-background text-foreground px-6 py-3 rounded-lg hover:bg-muted transition-colors">
                  Read Our Articles
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
