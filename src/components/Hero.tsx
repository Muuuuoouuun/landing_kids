import React from 'react';
import { LuxuryBackground } from './LuxuryBackground';

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center px-6 text-center snap-start bg-[#FDFBF7] relative overflow-hidden">
      <LuxuryBackground />
      <div className="max-w-4xl z-10">
        <span className="text-sm uppercase tracking-[0.2em] text-[#8C9A8B] mb-6 block font-medium">
          Premium Educational Ecosystem
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-[#2D3436] mb-10 leading-tight tracking-tight">
          소중한 아이의 첫 번째<br />
          <span className="italic font-light">디지털 학습 파트너</span>
        </h1>
        <p className="text-xl text-[#636E72] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          엄마의 안심과 아이의 즐거움이 공존하는 공간.<br />
          검증된 교육 철학으로 설계된 프리미엄 에듀테크를 지금 만나보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-[#8C9A8B] text-white px-10 py-4 rounded-full font-medium hover:bg-[#7a887a] transition-all shadow-sm">
            데모 문의하기
          </button>
          <button className="bg-transparent border border-[#8C9A8B] text-[#8C9A8B] px-10 py-4 rounded-full font-medium hover:bg-[#F2F4F2] transition-all">
            학습 철학 알아보기
          </button>
        </div>
      </div>
    </section>
  );
}
