import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import PainPoint from '../components/PainPoint';
import TurningPoint from '../components/TurningPoint';
import Philosophy from '../components/Philosophy';
import HowItWorks from '../components/HowItWorks';
import ContentShowcase from '../components/ContentShowcase';
import DataProof from '../components/DataProof';
import CurriculumSection from '../components/Curriculum';
import Testimonials from '../components/Testimonials';
import KidsVoice from '../components/KidsVoice';
import SafetyTrust from '../components/SafetyTrust';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#FDFBF7]">
        {/* ACT 1: 공감 — "원장님, 이런 고민 있으시죠?" */}
        <Hero />
        <PainPoint />
        <TurningPoint />

        {/* ACT 2: 솔루션 — "이렇게 해결됩니다" */}
        <Philosophy />
        <HowItWorks />
        <ContentShowcase />

        {/* ACT 3: 증거 — "실제 결과입니다" */}
        <DataProof />
        <CurriculumSection />
        <Testimonials />
        <KidsVoice />

        {/* ACT 4: 안심 — "걱정 마세요" */}
        <SafetyTrust />
        <FAQ />

        {/* ACT 5: 행동 — "지금 상담받으세요" */}
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
