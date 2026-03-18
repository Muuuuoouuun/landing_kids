'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const pains = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: '학부모 이탈이 멈추지 않는다',
    desc: '"왜 옆 학원으로 옮기는 걸까?" 수업 퀄리티엔 자신 있는데, 학부모가 체감하는 차별점이 부족한 현실.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: '학습 성과를 보여줄 방법이 없다',
    desc: '"우리 아이가 얼마나 늘었는지 모르겠어요." 학부모 상담 때마다 객관적 데이터 없이 말로만 설명하는 한계.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: '수업 준비에 시간이 너무 많이 든다',
    desc: '"교재 준비, 레벨 테스트, 학부모 보고..." 본연의 교육에 집중하고 싶은데 행정 업무에 치이는 하루하루.',
  },
];

export default function PainPoint() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-[#F8F7F4] rounded-bl-[120px] -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            We Understand
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            원장님이라면 누구나<br />
            <span className="italic font-light">한 번쯤 이런 고민을 합니다</span>
          </h2>
          <p className="reveal text-[#636E72] text-lg font-light max-w-xl mx-auto">
            원장님만 그런 게 아닙니다. 150개 학원의 고민에서 출발했습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="reveal group p-8 md:p-10 rounded-3xl bg-[#FDFBF7] border border-[#E9E4DB]/60 hover:border-[#8C9A8B]/40 hover:shadow-lg hover:shadow-[#8C9A8B]/5 transition-all duration-500"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F2F0EC] flex items-center justify-center text-[#8C9A8B] mb-6 group-hover:bg-[#8C9A8B] group-hover:text-white transition-all duration-300">
                {pain.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#2D3436] mb-3">{pain.title}</h3>
              <p className="text-[#636E72] leading-relaxed text-[15px]">{pain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
