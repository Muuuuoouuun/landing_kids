'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function TurningPoint() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 lg:px-12 xl:px-20 bg-[#2D3436] relative overflow-hidden grain-overlay">
      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[60%] bg-[#8C9A8B]/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] bg-[#C4A265]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="reveal mb-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium">
            A Different Perspective
          </span>
        </div>

        <h2 className="reveal font-serif text-3xl sm:text-4xl md:text-6xl text-white leading-[1.3] mb-10">
          만약 학부모가<br />
          <span className="italic font-light text-[#C4A265]">&lsquo;우리 아이 성장 데이터&rsquo;</span>를<br />
          직접 확인할 수 있다면?
        </h2>

        <div className="reveal section-divider mb-10 bg-[#636E72]" />

        <p className="reveal text-lg md:text-xl text-[#B2BEC3] font-light leading-relaxed max-w-2xl mx-auto mb-14">
          말로 하는 상담이 아닌 <span className="text-white font-normal">데이터로 보여주는 성과</span>로.<br />
          학부모의 불안이 아닌 <span className="text-white font-normal">신뢰</span>로.<br />
          그 전환을 설계했습니다.
        </p>

        <a
          href="#philosophy"
          className="reveal inline-flex items-center gap-2 text-[#8C9A8B] border border-[#636E72] px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#8C9A8B] hover:text-white hover:border-[#8C9A8B] transition-all duration-300"
        >
          어떻게 가능한지 알아보기
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
