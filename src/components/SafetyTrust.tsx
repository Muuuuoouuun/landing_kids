'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const promises = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: '개인정보 철저 보호',
    desc: 'COPPA, GDPR-K 국제 기준 준수. 아이의 데이터는 학습 분석에만 사용되며 학부모에게 안심을 드립니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: '광고 완전 제로',
    desc: '어떤 외부 광고도 노출되지 않습니다. 학원의 브랜드 이미지를 지키는 깨끗한 학습 환경.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    title: '교육 전문가 검증 콘텐츠',
    desc: '유아교육학 박사, 발달심리학자, 현직 교사 자문단이 모든 콘텐츠를 검증합니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>
    ),
    title: '전담 매니저 배정',
    desc: '도입부터 운영까지 전담 매니저가 함께합니다. 기술적 문제도, 커리큘럼 문의도 빠르게 해결.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: '위약금 없는 자유로운 계약',
    desc: '도입 후 만족하지 않으시면 언제든 해지 가능. 원장님의 부담을 최소화합니다.',
  },
];

export default function SafetyTrust() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Left — sticky header */}
          <div className="md:w-2/5 md:sticky md:top-32">
            <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
              Trust & Safety
            </span>
            <h2 className="reveal font-serif text-3xl md:text-4xl text-[#2D3436] leading-tight mb-6">
              원장님이 안심하고<br />
              도입할 수 있는<br />
              <span className="italic font-light">5가지 약속</span>
            </h2>
            <p className="reveal text-[#636E72] font-light leading-relaxed text-[15px] mb-8">
              학원의 명성을 걸고 도입하시는 만큼,
              저희도 그에 걸맞은 신뢰를 약속드립니다.
            </p>
            <div className="reveal section-divider !mx-0" />
          </div>

          {/* Right — promise cards */}
          <div className="md:w-3/5 space-y-4">
            {promises.map((p, i) => (
              <div
                key={i}
                className="reveal group bg-[#FDFBF7] rounded-2xl p-6 md:p-8 border border-[#E9E4DB]/60 hover:border-[#8C9A8B]/30 transition-all duration-300 flex gap-5"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#F2F4F2] flex-shrink-0 flex items-center justify-center text-[#8C9A8B] group-hover:bg-[#8C9A8B] group-hover:text-white transition-all duration-300">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2D3436] mb-1.5">{p.title}</h3>
                  <p className="text-[#636E72] text-[15px] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
