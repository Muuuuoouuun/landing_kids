'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const steps = [
  {
    time: 'STEP 1',
    title: '맞춤 상담 & 세팅',
    desc: '학원 환경 분석 후 즐거운 수업 콘텐츠를 맞춤 구성합니다',
    color: 'bg-[var(--super-blue)]',
    icon: '💬'
  },
  {
    time: 'STEP 2',
    title: '활기찬 수업 시작!',
    desc: '아이들이 환호하는 인터랙티브 수업이 교실에 펼쳐집니다',
    color: 'bg-[#FFF9C4]',
    icon: '🎉'
  },
  {
    time: 'STEP 3',
    title: '실시간 학습 관리',
    desc: '아이별 데이터가 자동 축적, 선생님이 즉시 확인·피드백',
    color: 'bg-[var(--super-pink)]',
    icon: '📊'
  },
  {
    time: 'STEP 4',
    title: '학부모 감동 리포트',
    desc: '성장 데이터 리포트 자동 발송 → 입소문 → 원생 증가!',
    color: 'bg-white',
    icon: '🚀'
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[var(--super-orange)] relative overflow-hidden border-b-4 border-[var(--super-text)]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/howitworks-bg.png" alt="" fill className="object-cover opacity-15 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">

        {/* Left: Text & Header */}
        <div className="lg:w-2/5 md:sticky md:top-32 h-fit">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-white text-[var(--super-text)] text-sm font-bold border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] mb-8 transform -rotate-3">
              Easy Onboarding
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-5xl md:text-6xl text-[var(--super-text)] leading-tight font-black mb-6">
              4주 만에<br />
              교실 분위기가<br />
              <span className="text-white underline decoration-[var(--super-text)] decoration-4 underline-offset-8">완전히 바뀝니다</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[var(--super-text)] font-semibold text-lg mb-12 border-l-4 border-white pl-6">
              즐거운 수업 세팅부터 철저한 관리 시스템 구축까지.<br />
              전담 매니저가 모든 과정을 함께합니다.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <button className="bg-[var(--super-text)] text-white px-8 py-4 font-bold border-4 border-transparent hover:bg-white hover:text-[var(--super-text)] hover:border-[var(--super-text)] transition-colors shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-none hover:translate-y-1">
               상세 도입 과정 보기 &rarr;
            </button>
          </FadeIn>
        </div>

        {/* Right: Staggered Cards */}
        <StaggerContainer className="lg:w-3/5 flex flex-col gap-6" stagger={0.12}>
          {steps.map((step, i) => (
            <StaggerItem key={i} direction="left">
              <div
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 rounded-2xl border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-brown)] ${step.color} transition-transform hover:-translate-x-2 duration-300`}
              >
                <div className="w-16 h-16 shrink-0 bg-white border-4 border-[var(--super-text)] rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_var(--super-text)]">
                  {step.icon}
                </div>

                <div className="flex-1">
                  <div className="font-black font-serif text-[var(--super-text)] text-sm mb-2 opacity-60">
                    {step.time}
                  </div>
                  <h3 className="text-2xl font-black text-[var(--super-text)] mb-2 leading-tight">{step.title}</h3>
                  <p className="text-[var(--super-text)]/80 font-bold leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      <Parallax speed={-0.3} className="absolute -bottom-8 -left-8 z-0 opacity-10 pointer-events-none">
        <div className="w-40 h-40 border-8 border-white rounded-full" />
      </Parallax>
    </section>
  );
}
