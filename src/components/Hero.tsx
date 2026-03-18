'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 lg:px-12 xl:px-20 text-center overflow-hidden grain-overlay">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] bg-[#E9E4DB]/40 rounded-full blur-[160px] animate-pulse-soft" />
        <div className="absolute top-[30%] right-[0%] w-[40%] h-[40%] bg-[#8C9A8B]/8 rounded-full blur-[140px] animate-pulse-soft delay-200" />
        <div className="absolute -bottom-[15%] left-[15%] w-[35%] h-[35%] bg-[#D4CFC6]/25 rounded-full blur-[120px] animate-pulse-soft delay-400" />
      </div>

      <div className="max-w-6xl z-10">
        {/* Subtle top label */}
        <div className="animate-fade-in-up opacity-0 mb-8">
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium border border-[#E9E4DB] rounded-full px-5 py-2">
            Premium EdTech for Academies
          </span>
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up opacity-0 delay-200 text-4xl sm:text-5xl md:text-7xl font-serif text-[#2D3436] mb-8 leading-[1.2] tracking-tight">
          학부모가 먼저 알아보는 학원,<br />
          <span className="italic font-light text-[#636E72]">어떻게 만들어지나요?</span>
        </h1>

        {/* Sub copy */}
        <p className="animate-fade-in-up opacity-0 delay-400 text-lg md:text-xl text-[#636E72] mb-14 max-w-2xl mx-auto font-light leading-relaxed">
          똑같은 교재, 비슷한 커리큘럼 속에서 고민하시는 원장님께,<br className="hidden sm:block" />
          <span className="text-[#2D3436] font-normal">학부모 신뢰와 학원 브랜드를 동시에 높이는 프리미엄 에듀테크</span>를 소개합니다.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up opacity-0 delay-600 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#final-cta"
            className="group bg-[#8C9A8B] text-white px-10 py-4 rounded-full font-medium hover:bg-[#7a887a] transition-all shadow-lg shadow-[#8C9A8B]/20 hover:shadow-xl hover:shadow-[#8C9A8B]/30 hover:-translate-y-0.5"
          >
            무료 도입 상담 신청
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
          <a
            href="#philosophy"
            className="bg-transparent border border-[#D4CFC6] text-[#636E72] px-10 py-4 rounded-full font-medium hover:bg-[#F8F7F4] hover:border-[#8C9A8B] hover:text-[#2D3436] transition-all"
          >
            교육 철학 알아보기
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up opacity-0 delay-800 mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#636E72]">
          <span className="flex items-center gap-2">
            <span className="font-semibold text-[#2D3436]">150+</span> 학원 도입 완료
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-[#D4CFC6]" />
          <span className="flex items-center gap-2">
            학부모 만족도 <span className="font-semibold text-[#2D3436]">4.9/5.0</span>
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-[#D4CFC6]" />
          <span className="flex items-center gap-2">
            재계약률 <span className="font-semibold text-[#2D3436]">94%</span>
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in opacity-0 delay-800">
        <div className="flex flex-col items-center gap-2 text-[#B2BEC3]">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#B2BEC3] to-transparent" />
        </div>
      </div>
    </section>
  );
}
