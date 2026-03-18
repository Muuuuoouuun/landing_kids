'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function TurningPoint() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 bg-[#F4EBE1] relative overflow-hidden flex flex-col items-center">
      {/* Decorative SVG elements hanging from top */}
      <div className="absolute top-0 inset-x-0 w-full flex justify-around opacity-30 pointer-events-none">
         <svg width="20" height="100" viewBox="0 0 20 100"><line x1="10" y1="0" x2="10" y2="80" stroke="#9E7453" strokeWidth="2" strokeDasharray="4 4" /><circle cx="10" cy="90" r="6" fill="#FF5A1F"/></svg>
         <svg width="20" height="150" viewBox="0 0 20 150"><line x1="10" y1="0" x2="10" y2="130" stroke="#9E7453" strokeWidth="2" strokeDasharray="4 4" /><circle cx="10" cy="140" r="8" fill="#FFC0CB"/></svg>
         <svg width="20" height="120" viewBox="0 0 20 120"><line x1="10" y1="0" x2="10" y2="100" stroke="#9E7453" strokeWidth="2" strokeDasharray="4 4" /><circle cx="10" cy="110" r="6" fill="#A8B5A7"/></svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 pt-10">
        <h2 className="reveal font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-[1.2] mb-8 font-black">
          만약 학부모가<br />
          <span className="text-[var(--super-orange)] underline decoration-wavy decoration-[#FFC0CB] underline-offset-8 bg-white/50 px-2 rounded">
            &lsquo;우리 아이 성장 데이터&rsquo;
          </span>를<br />
          직접 확인할 수 있다면?
        </h2>

        <div className="reveal flex justify-center mb-10">
          <svg className="w-16 h-16 text-[var(--super-brown)] animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        <div className="reveal relative bg-white border-[3px] border-[var(--super-text)] p-8 md:p-12 rounded-[2rem] shadow-[8px_8px_0px_0px_var(--super-brown)] transform rotate-1 hover:rotate-0 transition-transform duration-300">
           <p className="text-xl md:text-2xl text-[var(--super-text)] font-semibold leading-relaxed">
            말로 하는 상담이 아닌 <span className="bg-[#FFF9C4] px-2 py-1 rounded">데이터로 보여주는 성과</span>로.<br className="hidden md:block"/>
            학부모의 불안이 아닌 <span className="text-[var(--super-orange)] font-bold">깊은 신뢰</span>로.<br className="hidden md:block"/>
            그 놀라운 전환.
          </p>
        </div>

      </div>
    </section>
  );
}
