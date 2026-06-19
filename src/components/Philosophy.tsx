'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const pillars = [
  {
    icon: '🎉',
    label: '더 즐거운 수업',
    title: '아이가 "또 하고 싶다!" 외치는 콘텐츠',
    desc: '프리미엄 애니메이션과 인터랙티브 게임으로 설계된 수업. 아이들이 스스로 빠져드는 몰입형 학습 경험을 만듭니다.',
    color: 'bg-white'
  },
  {
    icon: '⚡',
    label: '더 활기찬 수업',
    title: '교실 에너지가 완전히 달라진다',
    desc: '터치, 퀴즈, 미션, 보상 시스템이 만들어내는 역동적인 교실. 아이들 눈이 반짝이고 선생님도 수업이 즐거워집니다.',
    color: 'bg-[var(--super-pink)]'
  },
  {
    icon: '📊',
    label: '철저한 관리',
    title: '아이별 성장을 데이터로 완벽 추적',
    desc: '학습 패턴, 강약점, 성취도를 실시간 분석. 자동 생성되는 전문 리포트로 학부모 상담까지 완벽하게 관리합니다.',
    color: 'bg-[var(--gold-light)]'
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative border-b-4 border-[var(--super-text)] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/philosophy-bg.png" alt="" fill className="object-cover opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-16">

        {/* Left column: Sticky Header */}
        <div className="md:w-1/3 md:sticky md:top-32 h-fit">
          <FadeIn direction="down" delay={0.1}>
            <div className="inline-block px-4 py-2 bg-[var(--super-brown)] text-white border-2 border-[var(--super-text)] font-bold text-sm shadow-[4px_4px_0px_0px_var(--super-text)] mb-8 transform -rotate-2">
              Our Philosophy
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-5xl md:text-6xl text-[var(--super-text)] leading-[1.1] font-black mb-6">
              즐겁고, 활기차고,<br />
              <span className="text-[var(--super-orange)]">철저하게.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="text-[var(--super-text)] font-bold text-lg leading-relaxed">
              재미있으니 아이가 몰입하고, 활기차니 교실이 살아나고, 데이터로 관리하니 학부모가 신뢰합니다.
            </p>
          </FadeIn>
        </div>

        {/* Right column: Staggered Cards */}
        <StaggerContainer className="md:w-2/3 flex flex-col gap-8" stagger={0.18}>
          {pillars.map((p, i) => (
            <StaggerItem key={i} direction="right">
              <div
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 md:p-10 ${p.color} border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-text)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--super-text)] duration-300`}
              >
                <div className="w-20 h-20 shrink-0 bg-white border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center text-4xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  {p.icon}
                </div>

                <div>
                  <div className="inline-block px-2 py-1 bg-white border-2 border-[var(--super-text)] text-xs font-bold mb-3 uppercase tracking-wider">
                    {p.label}
                  </div>
                  <h3 className="text-2xl font-black font-serif text-[var(--super-text)] mb-3 leading-none">{p.title}</h3>
                  <p className="text-[var(--super-text)]/80 leading-relaxed font-bold">{p.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Parallax speed={0.3} className="absolute top-20 right-[3%] z-0 opacity-10 pointer-events-none">
        <div className="w-32 h-32 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
