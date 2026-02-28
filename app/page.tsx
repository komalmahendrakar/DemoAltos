import ScrollVideo from '@/components/ScrollVideo';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import IntroSection from '@/components/IntroSection';
import StatsBar from '@/components/StatsBar';
import ClientMarquee from '@/components/ClientMarquee';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* z-index 4 — frame animation canvas (hidden until 10% scroll) */}
      <ScrollVideo />

      {/* z-index 5 — skyy.png + text overlay (fades out by 10% scroll) */}
      <HeroSection />

      {/* 400vh = 300vh animation zone + 100vh buffer to hold last frame */}
      <div style={{ height: '400vh' }} />

      {/* ── Static Flow Content Below Animation ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <IntroSection />
        <StatsBar />
        <ClientMarquee />
        <ServicesSection />
      </div>
    </main>
  );
}
