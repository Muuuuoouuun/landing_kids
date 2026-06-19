'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const promises = [
  {
    title: '교육 전문가 검증 콘텐츠',
    desc: '유아교육학자·발달심리학자 자문단이 직접 설계하고 검증한 즐거운 학습 콘텐츠입니다.',
    icon: '🎓'
  },
  {
    title: '아이별 맞춤 난이도 관리',
    desc: 'AI가 아이의 수준을 실시간 분석해 최적 난이도를 자동 조절. 너무 쉽거나 어렵지 않게.',
    icon: '🎯'
  },
  {
    title: '개인정보 철저 보호',
    desc: 'COPPA, GDPR-K 국제 기준 준수. 학습 데이터는 오직 교육 분석에만 활용됩니다.',
    icon: '🔒'
  },
  {
    title: '광고 제로 · 위약금 제로',
    desc: '외부 광고 없는 순수한 학습 환경. 만족하지 않으시면 언제든 자유롭게 해지 가능합니다.',
    icon: '✅'
  },
];

export default function SafetyTrust() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative border-b-4 border-[var(--super-text)] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/safety-bg.png" alt="" fill className="object-cover opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 relative z-10">

        {/* Left Side Header */}
        <div className="md:w-1/3 md:sticky md:top-32 h-fit">
          <FadeIn direction="left">
            <div className="bg-white border-4 border-[var(--super-text)] p-8 shadow-[8px_8px_0px_0px_var(--super-text)] transform -rotate-1">
              <div className="w-16 h-16 bg-[var(--super-orange)] rounded-full border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center text-3xl mb-8 transform -rotate-6">
                🛡️
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl text-[var(--super-text)] leading-[1.15] font-black mb-6">
                안심하고<br />
                도입하세요.
              </h2>
              <p className="text-[var(--super-text)]/80 font-bold text-lg leading-relaxed">
                학원의 이름을 걸고 도입하시는 만큼, 저희도 타협하지 않는 기준을 세웠습니다.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Side - Staggered Promise Cards */}
        <StaggerContainer className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8" stagger={0.1}>
          {promises.map((p, i) => (
            <StaggerItem key={i}>
              <div
                className={`bg-white rounded-[2rem] p-8 border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-text)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--super-text)] transition-transform duration-300 ${i%2===0 ? 'transform rotate-1': 'transform -rotate-1'}`}
              >
                <div className="text-4xl mb-6 bg-[var(--cream)] inline-block p-4 rounded-xl border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)]">{p.icon}</div>
                <h3 className="text-2xl font-black font-serif text-[var(--super-text)] mb-3 leading-tight">{p.title}</h3>
                <p className="text-[var(--super-text)]/80 font-bold leading-relaxed">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Parallax speed={0.4} className="absolute -bottom-8 right-[5%] z-0 opacity-10 pointer-events-none">
        <div className="w-32 h-32 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
