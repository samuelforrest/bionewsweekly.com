
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { LatestNews } from '@/components/LatestNews'
import { Team } from '@/components/Team'
import { Newsletter } from '@/components/Newsletter'
import { Footer } from '@/components/Footer'

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <Hero />
        <LatestNews />
        <Team />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
