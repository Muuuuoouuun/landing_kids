'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn } from './motion';

export default function Footer() {
  return (
    <footer className="bg-[var(--super-orange)] text-[var(--super-text)] px-6 lg:px-12 xl:px-20 pt-16 pb-8 relative overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/footer-bg.png" alt="" fill className="object-cover opacity-15 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto border-t-4 border-[var(--super-text)] pt-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand/Links */}
          <FadeIn direction="left">
            <div className="flex-1">
              <div className="font-serif font-black text-3xl mb-4 text-[var(--super-text)]">
                Little Minds.
              </div>
              <p className="font-bold text-[var(--super-text)]/80 max-w-xs mb-8 leading-relaxed">
                원장님의 교육 철학을 가장 완벽하게 담아내는 프리미엄 에듀테크.
              </p>
              <div className="flex gap-4 font-black text-sm text-[var(--super-text)]">
                <a href="#" className="hover:text-white transition-colors bg-white/30 px-3 py-1 border-2 border-[var(--super-text)] shadow-[2px_2px_0_var(--super-text)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">인스타그램</a>
                <a href="#" className="hover:text-white transition-colors bg-white/30 px-3 py-1 border-2 border-[var(--super-text)] shadow-[2px_2px_0_var(--super-text)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">블로그</a>
                <a href="#" className="hover:text-white transition-colors bg-white/30 px-3 py-1 border-2 border-[var(--super-text)] shadow-[2px_2px_0_var(--super-text)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">유튜브</a>
              </div>
            </div>
          </FadeIn>

          {/* Nav */}
          <FadeIn direction="right" delay={0.15}>
            <div className="flex gap-12 font-bold text-[var(--super-text)] border-4 border-[var(--super-text)] p-8 bg-white shadow-[8px_8px_0_var(--super-text)] transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex flex-col gap-4">
                <a href="#philosophy" className="hover:text-[var(--super-orange)] transition-colors">교육 철학</a>
                <a href="#how-it-works" className="hover:text-[var(--super-orange)] transition-colors">도입 과정</a>
                <a href="#results" className="hover:text-[var(--super-orange)] transition-colors">도입 성과</a>
              </div>
              <div className="flex flex-col gap-4">
                <a href="#" className="hover:text-[var(--super-orange)] transition-colors">이용약관</a>
                <a href="#" className="hover:text-[var(--super-orange)] transition-colors">개인정보방침</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Massive Bottom Text */}
      <div className="w-full text-center mt-6 relative z-10">
        <h1 className="font-serif font-black text-[#FF703B] text-[15vw] leading-none select-none tracking-tighter" style={{WebkitTextStroke: '3px var(--super-text)'}}>
          littleminds
        </h1>
      </div>

      <div className="text-center mt-6 font-bold text-sm text-[var(--super-text)] relative z-10">
        &copy; 2026 Little Minds. All Rights Reserved.
      </div>
    </footer>
  );
}
