'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, ScaleIn, Parallax } from './motion';

export default function TurningPoint() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 relative border-b-4 border-[var(--super-text)] flex flex-col items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/solution-bg.png" alt="" fill className="object-cover opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">

        <FadeIn direction="down" delay={0.1}>
          <div className="inline-block px-4 py-2 bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] font-bold text-sm shadow-[4px_4px_0px_0px_var(--super-text)] mb-10 transform rotate-2">
            The Solution
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--super-text)] leading-[1.1] mb-12 font-black">
            만약 수업 시간에<br />
            <span className="inline-block bg-[var(--super-orange)] text-white px-4 py-1 mt-2 shadow-[6px_6px_0px_0px_var(--super-text)] border-4 border-[var(--super-text)] transform -rotate-1">
              아이들이 환호하고
            </span><br />
            그 성과가 데이터로 증명된다면?
          </h2>
        </FadeIn>

        <ScaleIn delay={0.35}>
          <div className="relative bg-white border-4 border-[var(--super-text)] p-8 md:p-12 shadow-[12px_12px_0px_0px_var(--super-text)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_var(--super-text)]">

             {/* Decorative Pin */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--super-pink)] border-4 border-[var(--super-text)] shadow-[2px_2px_0px_0px_var(--super-text)] z-20"></div>

             <p className="text-xl md:text-3xl text-[var(--super-text)] font-bold leading-relaxed font-serif">
              지루한 수업이 아닌 <span className="text-[var(--super-orange)] underline decoration-4 underline-offset-4">아이가 먼저 달려오는 수업</span>으로.<br className="hidden md:block"/>
              감에 의존하는 관리가 아닌 <span className="bg-[#FFF9C4] px-2 py-1 border-2 border-[var(--super-text)]">데이터 기반 철저한 교육 관리</span>로.<br className="hidden md:block"/>
              학원이 완전히 달라집니다.
            </p>
          </div>
        </ScaleIn>

      </div>

      {/* Parallax decorations */}
      <Parallax speed={0.3} className="absolute top-20 left-[5%] z-0 opacity-15 pointer-events-none">
        <div className="w-20 h-20 bg-[var(--super-pink)] border-4 border-[var(--super-text)] rounded-xl rotate-12" />
      </Parallax>
      <Parallax speed={-0.4} className="absolute bottom-20 right-[8%] z-0 opacity-15 pointer-events-none">
        <div className="w-16 h-16 bg-[var(--gold-light)] border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
