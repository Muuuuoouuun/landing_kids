'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const promises = [
  {
    title: '개인정보 철저 보호',
    desc: 'COPPA, GDPR-K 기준 준수. 데이터는 오직 학습 분석에만 사용됩니다.',
    icon: '🔒'
  },
  {
    title: '광고 완전 제로',
    desc: '우리 아이들이 보는 화면에 외부 광고는 전혀 없습니다.',
    icon: '🚫'
  },
  {
    title: '전문가 검증 완료',
    desc: '유아교육학자, 심리학자 자문단이 직접 검증한 안전한 콘텐츠입니다.',
    icon: '🎓'
  },
  {
    title: '자유로운 계약',
    desc: '만족하지 않으시면 위약금 없이 편하게 해지 가능합니다.',
    icon: '🤝'
  },
];

export default function SafetyTrust() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[#F4EBE1] relative border-y-2 border-[var(--super-text)]">
       {/* Background pattern */}
       <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)'}} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 relative z-10">
        
        {/* Left Side Header */}
        <div className="md:w-1/3 md:sticky md:top-32 h-fit">
          <div className="w-16 h-16 bg-[var(--super-orange)] rounded-full border-[3px] border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center text-3xl mb-6 transform -rotate-6">
            🛡️
          </div>
          <h2 className="reveal font-serif text-4xl lg:text-5xl text-[var(--super-text)] leading-tight font-black mb-6">
            안심하고<br />
            도입하세요.
          </h2>
          <p className="reveal text-[var(--warm-gray)] font-medium text-lg leading-relaxed">
            학원의 이름을 걸고 도입하시는 만큼, 저희도 타협하지 않는 기준을 세웠습니다.
          </p>
        </div>

        {/* Right Side Promises */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {promises.map((p, i) => (
            <div
              key={i}
              className="reveal bg-white rounded-2xl p-8 border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--super-text)] transition-transform duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-bold font-serif text-[var(--super-text)] mb-2">{p.title}</h3>
              <p className="text-[var(--super-text)]/70 font-medium leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
