'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, Tilt3D, Float, Parallax } from './motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 xl:px-20 overflow-hidden border-b-4 border-[var(--super-text)]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/hero-bg.png" alt="" fill className="object-cover opacity-40" priority />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 pt-24 pb-12">
        {/* Left Content */}
        <div className="flex flex-col items-start space-y-8 relative">

          <div className="absolute -top-12 -left-6 w-16 h-16 bg-[var(--super-orange)] rounded-full mix-blend-multiply opacity-50 blur-xl"></div>

          <FadeIn direction="down" delay={0.1}>
            <div className="inline-block px-4 py-2 border-2 border-[var(--super-text)] text-[var(--super-text)] text-sm font-bold tracking-wide uppercase bg-[var(--gold-light)] shadow-[4px_4px_0px_0px_var(--super-text)] -rotate-2">
              Premium EdTech Platform
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.25}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[var(--super-text)] leading-[1.05] tracking-tight font-black">
              아이는 신나고<br />
              부모는 안심하는<br />
              <span className="text-white bg-[var(--super-orange)] px-4 leading-[1.2] inline-block -rotate-1 shadow-[4px_4px_0px_0px_var(--super-text)]">우리 학원</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <p className="text-xl text-[var(--super-text)] max-w-lg font-medium leading-relaxed border-l-4 border-[var(--super-text)] pl-6">
              &ldquo;또 하고 싶어요!&rdquo; 터지는 수업, 데이터로 증명되는 성장. 즐거운 수업과 철저한 관리를 동시에 잡아 학부모가 먼저 찾는 학원을 만듭니다.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.55}>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a
                href="#final-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[var(--super-text)] text-white px-10 py-5 font-bold text-lg hover:bg-[var(--super-orange)] transition-colors shadow-[6px_6px_0px_0px_rgba(255,90,31,0.3)] hover:translate-y-1 hover:shadow-none border-4 border-transparent hover:border-[var(--super-text)]"
              >
                무료 상담 예약 &rarr;
              </a>
              <a
                href="#final-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[var(--gold-light)] text-[var(--super-text)] px-8 py-5 font-bold text-lg border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] hover:translate-y-1 hover:shadow-none transition-all transform -rotate-1 hover:rotate-0"
              >
                체험 수업 1회 운영해보기 ✨
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.65}>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
              <p className="text-sm font-bold text-[var(--super-text)]/70">이미 함께하는 원장님들</p>
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--super-text)] bg-[var(--super-brown)]" />
                <div className="w-12 h-12 rounded-full border-2 border-[var(--super-text)] bg-[var(--super-blue)]" />
                <div className="w-12 h-12 rounded-full border-2 border-[var(--super-text)] bg-[#FFF9C4] flex items-center justify-center font-bold text-[var(--super-text)] text-sm">+150</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Content - 3D Tilt Hero Graphic */}
        <FadeIn direction="right" delay={0.3}>
          <Tilt3D className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center" intensity={8}>

            <div className="relative w-full h-full bg-[var(--super-brown)] border-4 border-[var(--super-text)] rounded-[2rem] shadow-[12px_12px_0px_0px_var(--super-text)] overflow-hidden flex flex-col justify-between p-8 md:p-12 z-10">

              <div className="flex justify-between items-start">
                 <div className="w-10 h-10 rounded-full border-2 border-[var(--super-text)] bg-white mix-blend-overlay"></div>
                 <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-[var(--super-text)] rounded-full text-[var(--super-text)] font-bold text-sm">
                   v2.0 Beta
                 </div>
              </div>

              <div className="self-center flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6 rounded-2xl overflow-hidden border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)]">
                  <Image src="/images/hero/hero-main.png" alt="Learning illustration" fill className="object-cover" />
                </div>
                <h2 className="font-serif text-3xl md:text-5xl text-white font-bold drop-shadow-[2px_2px_0_var(--super-text)] text-center leading-tight">
                  Little Minds<br/>
                  <span className="text-[var(--gold-light)] drop-shadow-none font-normal italic">Fun &amp; Smart</span>
                </h2>
              </div>

              <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden">
                 <div className="w-2/3 h-full bg-[var(--super-orange)]"></div>
              </div>
            </div>

            {/* Decorative Floaters */}
            <Float className="absolute -bottom-6 -right-6 z-20" duration={5} distance={10}>
              <div className="w-32 h-32 bg-[var(--super-blue)] border-4 border-[var(--super-text)] rounded-full flex items-center justify-center text-4xl shadow-[6px_6px_0px_0px_var(--super-text)]">
                💡
              </div>
            </Float>

            <Float className="absolute -top-4 -left-4 z-20" duration={7} distance={8} delay={1}>
              <div className="w-20 h-20 bg-[var(--super-pink)] border-4 border-[var(--super-text)] rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_var(--super-text)]">
                🎯
              </div>
            </Float>

          </Tilt3D>
        </FadeIn>
      </div>

      {/* Parallax decorative elements */}
      <Parallax speed={0.5} className="absolute bottom-20 left-[5%] z-0 opacity-30 pointer-events-none">
        <div className="w-24 h-24 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
      <Parallax speed={-0.3} className="absolute top-40 right-[8%] z-0 opacity-20 pointer-events-none">
        <div className="w-16 h-16 bg-[var(--gold-light)] border-2 border-[var(--super-text)] rotate-45" />
      </Parallax>
    </section>
  );
}
