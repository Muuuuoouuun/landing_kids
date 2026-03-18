'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const pillars = [
  {
    num: '01',
    label: 'Neuro-Development',
    title: '두뇌 발달 기반 설계',
    desc: '4~7세 연령별 인지 발달 단계에 정확히 맞춘 학습 자극. 아이마다 다른 성장 속도를 데이터로 추적하고 최적의 난이도를 자동 조절합니다.',
    color: '#8C9A8B',
  },
  {
    num: '02',
    label: 'Active Inquiry',
    title: '능동적 탐구 학습',
    desc: '답을 알려주지 않습니다. 질문을 던지고, 시도하고, 스스로 발견하게 합니다. 원장님의 교육 철학을 디지털로 연장하는 구조입니다.',
    color: '#C4A265',
  },
  {
    num: '03',
    label: 'Data-Driven Report',
    title: '학부모 리포트 자동화',
    desc: '아이별 학습 성취도, 집중 패턴, 강약점을 분석한 전문 리포트가 자동 생성. 상담 준비 시간은 줄고, 학부모 신뢰도는 올라갑니다.',
    color: '#8C9A8B',
  },
];

export default function Philosophy() {
  const ref = useReveal();

  return (
    <section id="philosophy" ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E9E4DB] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div className="md:max-w-2xl">
            <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
              Pedagogical Excellence
            </span>
            <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight">
              단순한 학습 앱이 아닌<br />
              <span className="italic font-light">학원 경쟁력을 높이는 교육 시스템</span>
            </h2>
          </div>
          <p className="reveal md:max-w-sm text-[#636E72] font-light leading-relaxed text-[15px]">
            뇌과학 기반 커리큘럼, 능동적 학습 설계, 자동화된 학부모 리포트까지.
            원장님의 교육 철학을 더 강력하게 만드는 세 가지 축입니다.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-0 md:gap-0 border-t border-[#E9E4DB]">
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`reveal group py-10 md:py-14 md:px-8 ${
                i < pillars.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#E9E4DB]' : ''
              }`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-serif font-light text-[#E9E4DB] group-hover:text-[#8C9A8B] transition-colors">
                  {p.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B2BEC3] font-medium">
                  {p.label}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#2D3436] mb-4">{p.title}</h3>
              <p className="text-[#636E72] leading-relaxed text-[15px]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
