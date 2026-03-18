'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const areas = [
  { name: '의사소통', ages: '4-7세', topics: '어휘력 · 문해력 · 듣기이해', color: 'bg-[var(--super-blue)]' },
  { name: '자연탐구', ages: '4-7세', topics: '수와연산 · 과학탐구 · 자연관찰', color: 'bg-[#FFF9C4]' },
  { name: '사회관계', ages: '5-7세', topics: '감정이해 · 규칙과질서 · 협동놀이', color: 'bg-[var(--super-pink)]' },
  { name: '예술경험', ages: '4-6세', topics: '음악감상 · 미술표현 · 창의활동', color: 'bg-[#E8D5F5]' },
  { name: '신체운동', ages: '4-7세', topics: '소근육발달 · 조작능력 · 리듬운동', color: 'bg-[#D4EDDA]' },
];

const advisors = [
  { name: '김영미 교수', title: '서울대학교 유아교육학과', emoji: '🎓' },
  { name: '박재현 박사', title: '아동발달심리학 연구소', emoji: '🧠' },
  { name: '이수진 원장', title: '현직 유치원 원장 20년', emoji: '🏫' },
];

export default function CurriculumSection() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[var(--cream)] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] text-xs font-bold rounded-full shadow-[2px_2px_0px_0px_var(--super-text)] mb-6">
            Curriculum Map
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-4">
            누리과정 연계<br />
            <span className="text-[var(--super-orange)]">체계적 커리큘럼</span>
          </h2>
          <p className="reveal text-[var(--warm-gray)] font-medium text-lg max-w-xl mx-auto">
            국가 수준 교육과정에 맞춰 설계된 5대 영역별 학습 체계.
            학부모에게 &ldquo;검증된 커리큘럼&rdquo;이라는 확신을 드립니다.
          </p>
        </div>

        {/* Curriculum grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-20">
          {areas.map((area, i) => (
            <div
              key={i}
              className={`${area.color} rounded-2xl p-6 border-[3px] border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] text-center group hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--super-text)] transition-all duration-300`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] text-lg font-black font-serif group-hover:scale-110 transition-transform">
                {area.name.charAt(0)}
              </div>
              <h3 className="font-bold font-serif text-[var(--super-text)] text-lg mb-1">{area.name}</h3>
              <p className="text-xs text-[var(--super-text)]/60 font-bold mb-3">{area.ages}</p>
              <p className="text-xs text-[var(--super-text)]/80 leading-relaxed font-medium">{area.topics}</p>
            </div>
          ))}
        </div>

        {/* Advisory board */}
        <div className="reveal bg-white rounded-2xl border-[3px] border-[var(--super-text)] p-8 md:p-12 shadow-[6px_6px_0px_0px_var(--super-text)]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/3 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[var(--super-orange)] text-white text-xs font-bold rounded shadow-[2px_2px_0px_0px_var(--super-text)] mb-4 transform -rotate-2">
                Advisory Board
              </span>
              <h3 className="font-serif text-3xl text-[var(--super-text)] font-black leading-tight">
                교육 전문가<br />자문단
              </h3>
            </div>
            <div className="md:w-2/3 flex flex-col sm:flex-row gap-6">
              {advisors.map((a, i) => (
                <div key={i} className="flex-1 flex items-center gap-4 bg-[var(--cream)] p-4 rounded-xl border-2 border-[var(--super-text)]/20">
                  <div className="w-12 h-12 rounded-full bg-[var(--super-blue)] border-2 border-[var(--super-text)] flex items-center justify-center flex-shrink-0 text-xl">
                    {a.emoji}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--super-text)] text-sm">{a.name}</p>
                    <p className="text-xs text-[var(--warm-gray)] font-medium">{a.title}</p>
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
