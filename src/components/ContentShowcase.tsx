'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const features = [
  {
    title: '신나는 애니메이션 수업',
    desc: '캐릭터와 모험하며 배우는 스토리텔링. 아이들이 "다음 편 언제 나와요?" 물어봅니다.',
    bgColor: 'bg-[#B4E4D3]',
    icon: '🎬'
  },
  {
    title: '몸으로 배우는 터치 학습',
    desc: '터치하고, 드래그하고, 완성하는 참여형 수업. 교실에 웃음소리와 환호가 끊이지 않습니다.',
    bgColor: 'bg-[#FFD1DC]',
    icon: '🙌'
  },
  {
    title: '실시간 학습 관리 대시보드',
    desc: '아이별 진도, 정답률, 집중 시간까지. 선생님이 한눈에 파악하고 즉시 피드백할 수 있습니다.',
    bgColor: 'bg-[#CDE4F7]',
    icon: '📊'
  },
];

export default function ContentShowcase() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden border-b-4 border-[var(--super-text)]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/showcase-bg.png" alt="" fill className="object-cover opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-16 relative">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--super-orange)] text-white text-sm font-bold border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] transform -rotate-3 mb-6 relative z-10">
              Premium Content!
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-5xl md:text-6xl text-[var(--super-text)] leading-tight font-black mb-4">
              수업 시간이<br />
              <span className="text-white bg-[var(--super-brown)] px-4 pb-1 inline-block transform rotate-1 border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] mt-2">
                놀이 시간처럼!
              </span><br />
              그런데 성장은 확실하게.
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[var(--super-text)] font-semibold text-xl mt-8">
              즐거운 콘텐츠 + 실시간 관리 = 완벽한 수업
            </p>
          </FadeIn>
        </div>

        {/* Staggered Feature Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full" stagger={0.15}>
          {features.map((f, i) => (
            <StaggerItem key={i}>
              <div
                className="flex flex-col w-full bg-white border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-text)] transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--super-text)] duration-300"
              >
                {/* Top Colored Block */}
                <div className={`w-full h-48 ${f.bgColor} border-b-4 border-[var(--super-text)] flex items-center justify-center p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(#2D231A 2px, transparent 2px)', backgroundSize: '16px 16px'}} />
                  <div className="w-20 h-20 bg-white border-4 border-[var(--super-text)] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_var(--super-text)] text-4xl transform rotate-6 hover:rotate-0 hover:scale-110 transition-transform cursor-pointer relative z-10">
                    {f.icon}
                  </div>
                </div>

                {/* Bottom Text Block */}
                <div className="p-8">
                  <h3 className="font-serif font-black text-2xl text-[var(--super-text)] mb-3 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-[var(--super-text)]/80 font-bold leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      <Parallax speed={0.4} className="absolute top-16 right-[4%] z-0 opacity-10 pointer-events-none">
        <div className="w-24 h-24 bg-[var(--super-pink)] border-4 border-[var(--super-text)] rounded-xl rotate-12" />
      </Parallax>
    </section>
  );
}
