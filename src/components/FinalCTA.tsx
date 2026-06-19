'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, Float, ScaleIn, Parallax } from './motion';

export default function FinalCTA() {
  return (
    <section id="final-cta" className="pt-24 md:pt-32 px-6 lg:px-12 xl:px-20 bg-[var(--super-orange)] text-white relative overflow-hidden border-b-4 border-[var(--super-text)]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/cta-bg.png" alt="" fill className="object-cover opacity-20 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

        {/* Floating elements */}
        <Float className="absolute top-0 left-10 z-20" duration={5} distance={10}>
          <div className="w-16 h-16 bg-white border-4 border-[var(--super-text)] rounded-full flex items-center justify-center text-3xl transform -rotate-12 shadow-[4px_4px_0px_0px_var(--super-text)]">🔥</div>
        </Float>
        <Float className="absolute top-20 right-10 z-20" duration={7} distance={8} delay={1}>
          <div className="w-20 h-20 bg-[#FFF9C4] rounded-xl border-4 border-[var(--super-text)] flex items-center justify-center text-4xl transform rotate-12 shadow-[6px_6px_0px_0px_var(--super-text)]">✨</div>
        </Float>

        <FadeIn>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--super-text)] leading-[1.1] font-black mb-8 drop-shadow-[4px_4px_0_white]">
            더 즐겁고, 더 활기차고,<br />
            더 철저한 우리 학원
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-[var(--super-text)] text-xl font-bold mb-12 max-w-2xl mx-auto bg-white/50 px-6 py-3 rounded-xl border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] transform -rotate-1">
            아이는 신나고, 교실은 활기차고, 관리는 완벽하게.<br />
            지금 무료 상담으로 시작하세요.
          </p>
        </FadeIn>

        <ScaleIn delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-6">
            <button className="group bg-white text-[var(--super-text)] px-12 py-5 font-black text-xl hover:bg-[var(--super-text)] hover:text-white border-4 border-[var(--super-text)] transition-colors shadow-[8px_8px_0px_0px_var(--super-text)] hover:translate-y-2 hover:shadow-none cursor-pointer">
              무료 도입 상담 신청 &rarr;
            </button>
            <button className="group bg-[var(--super-text)] text-white px-10 py-5 font-black text-xl hover:bg-[var(--gold-light)] hover:text-[var(--super-text)] border-4 border-[var(--super-text)] transition-colors shadow-[8px_8px_0px_0px_white] hover:translate-y-2 hover:shadow-none cursor-pointer transform -rotate-1 hover:rotate-0">
              체험 수업 1회 운영해보기 ✨
            </button>
          </div>
        </ScaleIn>

        <FadeIn delay={0.5}>
          <p className="text-[var(--super-text)] font-bold mb-20 bg-white/40 px-4 py-2 rounded-full border-2 border-[var(--super-text)]">
            부담 없이 시작하세요. 우리 학원에서 딱 한 번만 돌려봐도 충분합니다.
          </p>
        </FadeIn>

      </div>

      <Parallax speed={-0.2} className="absolute bottom-10 left-[10%] z-0 opacity-10 pointer-events-none">
        <div className="w-40 h-40 border-8 border-white rounded-full" />
      </Parallax>
    </section>
  );
}
