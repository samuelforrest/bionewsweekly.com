
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { LatestNews } from '@/components/LatestNews'
import { Team } from '@/components/Team'
import { Newsletter } from '@/components/Newsletter'
import { Footer } from '@/components/Footer'
import { TestAISummary } from '@/components/TestAISummary'

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <div className="container mx-auto px-4 py-8">
            <TestAISummary />
          </div>
          <LatestNews />
          <Team />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
