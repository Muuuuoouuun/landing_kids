'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const areas = [
  { name: '의사소통', ages: '4-7세', topics: '어휘력 · 문해력 · 듣기이해', color: '#8C9A8B' },
  { name: '자연탐구', ages: '4-7세', topics: '수와연산 · 과학탐구 · 자연관찰', color: '#C4A265' },
  { name: '사회관계', ages: '5-7세', topics: '감정이해 · 규칙과질서 · 협동놀이', color: '#7B9BAB' },
  { name: '예술경험', ages: '4-6세', topics: '음악감상 · 미술표현 · 창의활동', color: '#B08C8C' },
  { name: '신체운동', ages: '4-7세', topics: '소근육발달 · 조작능력 · 리듬운동', color: '#9B8CB0' },
];

const advisors = [
  { name: '김영미 교수', title: '서울대학교 유아교육학과' },
  { name: '박재현 박사', title: '아동발달심리학 연구소' },
  { name: '이수진 원장', title: '현직 유치원 원장 20년' },
];

export default function CurriculumSection() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            Curriculum Map
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            누리과정 연계<br />
            <span className="italic font-light">체계적 커리큘럼</span>
          </h2>
          <p className="reveal text-[#636E72] font-light text-lg max-w-xl mx-auto">
            국가 수준 교육과정에 맞춰 설계된 5대 영역별 학습 체계.
            학부모에게 "검증된 커리큘럼"이라는 확신을 드립니다.
          </p>
        </div>

        {/* Curriculum grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {areas.map((area, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-[#E9E4DB]/60 hover:shadow-lg transition-all duration-500 text-center group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-sm font-bold transition-transform group-hover:scale-110"
                style={{ backgroundColor: area.color }}
              >
                {area.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-[#2D3436] mb-1">{area.name}</h3>
              <p className="text-xs text-[#8C9A8B] mb-3">{area.ages}</p>
              <p className="text-xs text-[#636E72] leading-relaxed">{area.topics}</p>
            </div>
          ))}
        </div>

        {/* Advisory board */}
        <div className="reveal bg-white rounded-3xl border border-[#E9E4DB]/60 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C4A265] font-medium block mb-3">
                Advisory Board
              </span>
              <h3 className="font-serif text-2xl text-[#2D3436] leading-tight">
                교육 전문가<br />
                <span className="italic font-light">자문단</span>
              </h3>
            </div>
            <div className="md:w-2/3 flex flex-col sm:flex-row gap-6">
              {advisors.map((a, i) => (
                <div key={i} className="flex-1 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F2F0EC] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#8C9A8B] font-serif text-lg">{a.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#2D3436] text-sm">{a.name}</p>
                    <p className="text-xs text-[#636E72]">{a.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
