'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function FinalCTA() {
  const ref = useReveal();

  return (
    <section id="final-cta" ref={ref} className="pt-24 md:pt-32 px-6 lg:px-12 xl:px-20 bg-[var(--super-orange)] text-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Floating elements */}
        <div className="absolute top-0 left-10 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl transform -rotate-12 shadow-lg animate-float">🔥</div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-[#FFF9C4] rounded-lg border-4 border-[var(--super-text)] flex items-center justify-center text-4xl transform rotate-12 shadow-[4px_4px_0px_0px_var(--super-text)] animate-float delay-200">✨</div>

        <h2 className="reveal font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--super-text)] leading-none font-black mb-8 drop-shadow-[4px_4px_0_white]">
          학부모가 먼저 찾는<br />
          우리 학원 만들기
        </h2>

        <p className="reveal text-white/90 text-xl font-medium mb-12 max-w-2xl mx-auto">
          지금 바로 무료 상담을 신청하세요.<br />
          전담 매니저가 맞춤형 도입 프랜을 제안해 드립니다.
        </p>

        <button className="reveal group bg-[var(--super-text)] text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--super-text)] border-4 border-transparent hover:border-[var(--super-text)] transition-all shadow-[8px_8px_0px_0px_rgba(45,35,26,0.3)] hover:translate-y-1 hover:shadow-none mb-20">
          무료 도입 상담 신청 &rarr;
        </button>
        
      </div>
    </section>
  );
}
