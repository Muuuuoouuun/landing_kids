'use client';

import { ScrollProgress } from '../components/motion';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import PainPoint from '../components/PainPoint';
import TurningPoint from '../components/TurningPoint';
import OurBelief from '../components/OurBelief';
import Philosophy from '../components/Philosophy';
import AgeScenarios from '../components/AgeScenarios';
import HowItWorks from '../components/HowItWorks';
import ContentShowcase from '../components/ContentShowcase';
import InteractiveFeatures from '../components/InteractiveFeatures';
import ExtraFeatures from '../components/ExtraFeatures';
import OurWish from '../components/OurWish';
import DataProof from '../components/DataProof';
import CurriculumSection from '../components/Curriculum';
import Testimonials from '../components/Testimonials';
import ActivityReport from '../components/ActivityReport';
import KidsVoice from '../components/KidsVoice';
import References from '../components/References';
import SafetyTrust from '../components/SafetyTrust';
import ForAcademy from '../components/ForAcademy';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main className="bg-[#FDFBF7]">
        {/* ACT 1: 공감 — "지루한 수업, 가라앉는 교실, 부족한 관리" */}
        <Hero />
        <PainPoint />
        <TurningPoint />

        {/* 우리의 믿음 — 정체성 */}
        <OurBelief />

        {/* ACT 2: 해결 — "즐겁고, 활기차고, 철저하게" */}
        <Philosophy />
        <AgeScenarios />
        <HowItWorks />
        <ContentShowcase />
        <InteractiveFeatures />
        <ExtraFeatures />

        {/* 우리의 바람 — 결국 이것을 위해 */}
        <OurWish />

        {/* ACT 3: 증거 — "실제 결과입니다" */}
        <DataProof />
        <CurriculumSection />
        <Testimonials />
        <ActivityReport />
        <KidsVoice />

        {/* 레퍼런스 — 실제 수업 현장 & 도입 학원 */}
        <References />

        {/* ACT 4: 안심 — "전문가 검증, 완벽 관리" */}
        <SafetyTrust />
        <FAQ />

        {/* ACT 5: 행동 — "더 즐겁고, 더 활기차고, 더 철저하게" */}
        <ForAcademy />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
