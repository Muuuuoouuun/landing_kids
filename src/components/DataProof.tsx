'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const metrics = [
  {
    title: '학부모 재등록률',
    value: '94%',
    sub: '도입 학원 평균',
    desc: 'Little Minds 도입 학원의 학부모 재등록률. 데이터 기반 리포트가 만든 신뢰의 결과입니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: '상담 시간 절감',
    value: '60%',
    sub: '업무 효율화',
    desc: '자동 생성 리포트로 상담 준비 시간이 대폭 줄어듭니다. 원장님과 선생님의 시간을 되돌려 드립니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: '신규 원생 유입',
    value: '+35%',
    sub: '도입 6개월 후',
    desc: '학부모 입소문 효과. "그 학원은 데이터로 아이를 관리해 준다"는 평판이 신규 등록으로 이어집니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

export default function DataProof() {
  const ref = useReveal();

  return (
    <section id="results" ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-[#F8F7F4] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            Proven Results
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            도입 학원이 경험한<br />
            <span className="italic font-light">실제 변화</span>
          </h2>
          <p className="reveal text-[#636E72] font-light text-lg max-w-xl mx-auto">
            150개 이상의 도입 학원에서 확인된 평균 수치입니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="reveal group bg-white rounded-3xl p-8 md:p-10 border border-[#E9E4DB]/60 hover:border-[#8C9A8B]/30 hover:shadow-xl hover:shadow-[#8C9A8B]/5 transition-all duration-500"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#F2F0EC] flex items-center justify-center text-[#8C9A8B] group-hover:bg-[#8C9A8B] group-hover:text-white transition-all duration-300">
                  {m.icon}
                </div>
                <div className="text-right">
                  <span className="text-3xl font-serif font-semibold text-[#2D3436]">{m.value}</span>
                  <span className="block text-xs text-[#8C9A8B] mt-1">{m.sub}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#2D3436] mb-3">{m.title}</h3>
              <p className="text-[#636E72] leading-relaxed text-[15px]">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
