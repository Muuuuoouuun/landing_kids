'use client';

import React from 'react';
import { FadeIn, Parallax } from './motion';

export default function OurWish() {
  return (
    <section className="py-28 md:py-40 px-6 lg:px-12 xl:px-20 bg-white relative overflow-hidden border-y-4 border-[var(--super-text)]">

      {/* Dot background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'radial-gradient(var(--super-text) 2px, transparent 2px)', backgroundSize: '28px 28px'}} />

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        <FadeIn direction="down">
          <p className="text-[var(--super-text)]/50 font-bold text-lg mb-10 tracking-wide uppercase">What We Truly Want</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--super-text)] font-black leading-[1.15] mb-10">
            우리는 아이들이<br />
            <span className="relative inline-block">
              <span className="relative z-10">더 재밌게 공부</span>
              <span className="absolute bottom-1 left-0 w-full h-4 md:h-5 bg-[var(--super-orange)]/30 -z-0 transform -rotate-1" />
            </span>하길<br />
            원합니다.
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-[var(--super-text)]/70 text-xl md:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
            기술도, 데이터도, 시스템도<br />
            결국 이 한 가지를 위해 존재합니다.
          </p>
        </FadeIn>

      </div>

      <Parallax speed={0.3} className="absolute top-16 left-[8%] opacity-10 pointer-events-none">
        <div className="w-16 h-16 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
      <Parallax speed={-0.2} className="absolute bottom-16 right-[6%] opacity-10 pointer-events-none">
        <div className="w-12 h-12 bg-[var(--gold-light)] border-2 border-[var(--super-text)] rotate-45" />
      </Parallax>
    </section>
  );
}
