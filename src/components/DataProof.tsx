'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, ScaleIn, CountUp, Tilt3D, Parallax, Float } from './motion';

const metrics = [
  { title: '수업 몰입도', value: 3.2, suffix: 'x', desc: '아이 집중시간 향상', color: 'bg-[var(--super-orange)]' },
  { title: '학부모 재등록률', value: 94, suffix: '%', desc: '철저한 관리의 결과', color: 'bg-[var(--super-blue)]' },
  { title: '원생 증가율', value: 35, prefix: '+', suffix: '%', desc: '활기찬 수업 입소문', color: 'bg-[#FFF9C4]' },
];

export default function DataProof() {
  return (
    <section id="results" className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden border-b-4 border-[var(--super-text)] flex flex-col items-center">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/data-bg.png" alt="" fill className="object-cover opacity-15" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-20 flex flex-col lg:flex-row items-center gap-16">

        {/* Left: 3D Tilt Graphic Block */}
        <FadeIn direction="left" className="w-full lg:w-1/2 flex justify-center">
          <Tilt3D intensity={6}>
            <div className="relative w-full max-w-md aspect-square bg-[var(--super-brown)] border-4 border-[var(--super-text)] rounded-[2rem] shadow-[12px_12px_0px_0px_var(--super-text)] flex flex-col items-center justify-center p-8 overflow-hidden">

              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(white 2px, transparent 2px)', backgroundSize: '20px 20px'}} />

              <div className="relative z-10 w-full bg-white border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-text)] rounded-xl p-6 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer duration-300">
                <div className="w-1/2 h-4 bg-[var(--super-text)]/10 rounded-full mb-4"></div>
                <div className="w-3/4 h-6 bg-[var(--super-orange)] rounded-full mb-8 border-2 border-[var(--super-text)]"></div>

                <h3 className="font-serif text-3xl text-[var(--super-text)] font-black text-center mb-6 leading-tight">
                  성장 데이터 리포트
                </h3>

                {/* Mock chart */}
                <div className="flex items-end justify-between h-24 gap-2 border-b-4 border-[var(--super-text)] pb-2 px-2">
                  <div className="w-1/4 h-[40%] bg-[var(--super-pink)] border-2 border-[var(--super-text)] rounded-t-sm"></div>
                  <div className="w-1/4 h-[60%] bg-[var(--super-blue)] border-2 border-[var(--super-text)] rounded-t-sm"></div>
                  <div className="w-1/4 h-[90%] bg-[var(--gold-light)] border-2 border-[var(--super-text)] rounded-t-sm relative">
                    <div className="absolute -top-10 -right-4 bg-white px-2 py-1 border-2 border-[var(--super-text)] text-xs font-bold rounded shadow-[2px_2px_0px_0px_var(--super-text)] transform rotate-6">MAX</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <Float className="absolute -right-4 -top-4 z-20" duration={4} distance={6}>
                <div className="w-24 h-24 bg-[var(--super-orange)] rounded-full border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center transform rotate-12">
                  <span className="text-white font-black text-2xl">94%</span>
                </div>
              </Float>
            </div>
          </Tilt3D>
        </FadeIn>

        {/* Right: Text & Animated Metrics */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <FadeIn direction="down">
            <div className="inline-block px-4 py-2 bg-[var(--cream)] border-2 border-[var(--super-text)] text-[var(--super-text)] text-sm font-bold shadow-[4px_4px_0px_0px_var(--super-text)] mb-8 transform rotate-1">
              Proven Results
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--super-text)] leading-[1.15] font-black mb-6">
              즐거운 수업이<br />
              <span className="text-white bg-[var(--super-orange)] px-4 mt-2 inline-block border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] transform -rotate-1">
                숫자로 증명됩니다
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[var(--super-text)]/80 font-bold text-lg mb-12">
              활기찬 수업 → 높은 몰입도 → 철저한 관리 → 학부모 만족.<br className="hidden md:block"/>
              150개 학원이 경험한 선순환의 데이터입니다.
            </p>
          </FadeIn>

          {/* Count-up Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <ScaleIn key={i} delay={0.2 + i * 0.12}>
                <div className={`${m.color} border-4 border-[var(--super-text)] p-6 rounded-2xl shadow-[6px_6px_0px_0px_var(--super-text)] text-center transform hover:-translate-y-2 transition-transform duration-300`}>
                  <h4 className="text-[var(--super-text)] font-bold text-sm mb-2 opacity-80">{m.title}</h4>
                  <div className="font-serif text-4xl font-black text-[var(--super-text)] mb-2">
                    <CountUp target={m.value} prefix={m.prefix || ''} suffix={m.suffix} duration={2} />
                  </div>
                  <p className="text-sm font-bold text-[var(--super-text)] opacity-70 border-t-2 border-[var(--super-text)]/20 pt-2">{m.desc}</p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>

      </div>

      <Parallax speed={0.3} className="absolute bottom-16 left-[3%] z-0 opacity-10 pointer-events-none">
        <div className="w-28 h-28 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
