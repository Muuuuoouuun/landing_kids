'use client';

import React from 'react';
import { FadeIn, Parallax } from './motion';

export default function OurBelief() {
  return (
    <section className="relative py-32 md:py-44 px-6 lg:px-12 xl:px-20 bg-[var(--super-text)] overflow-hidden">

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px'}} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Small tag */}
        <FadeIn direction="down" className="flex justify-center mb-12">
          <span className="inline-block px-5 py-2 bg-[var(--super-orange)] text-white text-sm font-black border-4 border-white/20 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] transform -rotate-2">
            Our Belief
          </span>
        </FadeIn>

        {/* Main manifesto - staggered lines */}
        <div className="text-center space-y-8">
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-black leading-[1.15]">
              우리는 믿습니다.
            </h2>
          </FadeIn>

          <div className="space-y-6 max-w-3xl mx-auto">
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-bold leading-relaxed font-serif">
                공부는 원래 <span className="text-[var(--super-orange)]">재밌는 거라고.</span>
              </p>
            </FadeIn>
            <FadeIn delay={0.45}>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-bold leading-relaxed font-serif">
                교실은 원래 <span className="text-[var(--gold-light)]">웃음이 터지는 곳이라고.</span>
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-bold leading-relaxed font-serif">
                아이의 성장은 <span className="text-[var(--super-pink)]">한 순간도 놓쳐선 안 된다고.</span>
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Divider */}
        <FadeIn delay={0.7} className="flex justify-center my-14">
          <div className="w-20 h-1 bg-[var(--super-orange)]" />
        </FadeIn>

        {/* Story paragraph */}
        <FadeIn delay={0.8}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/70 text-lg md:text-xl font-medium leading-[1.9]">
              아이들이 억지로 앉아 있는 수업을 보면서 생각했습니다.<br />
              <span className="text-white font-bold">&ldquo;왜 배움은 지루해야 할까?&rdquo;</span><br /><br />
              놀이처럼 빠져들고, 게임처럼 도전하고,<br />
              성취감에 스스로 다시 찾아오는 수업.<br />
              동시에 아이 한 명 한 명의 성장을<br />
              데이터로 빠짐없이 기록하는 시스템.<br /><br />
              <span className="text-white font-bold">그게 Little Minds가 만들고 싶은 교실입니다.</span>
            </p>
          </div>
        </FadeIn>

        {/* Bottom signature */}
        <FadeIn delay={0.9} className="flex justify-center mt-16">
          <div className="bg-white/10 border-2 border-white/20 backdrop-blur-sm px-8 py-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <span className="font-serif font-black text-white text-xl tracking-tight">Little Minds</span>
            <span className="text-white/50 font-bold text-sm ml-3">Team</span>
          </div>
        </FadeIn>

      </div>

      {/* Parallax decorations */}
      <Parallax speed={0.3} className="absolute top-20 left-[5%] opacity-10 pointer-events-none">
        <div className="w-24 h-24 border-4 border-white rounded-full" />
      </Parallax>
      <Parallax speed={-0.4} className="absolute bottom-20 right-[8%] opacity-10 pointer-events-none">
        <div className="w-16 h-16 border-4 border-white rotate-45" />
      </Parallax>
    </section>
  );
}
