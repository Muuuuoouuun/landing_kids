'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const pains = [
  {
    title: '학부모 이탈이 멈추지 않는다',
    desc: '"왜 옆 학원으로 옮기는 걸까?" 수업 퀄리티엔 자신 있는데, 학부모가 체감하는 차별점이 부족한 현실.',
    color: 'bg-[var(--super-pink)]',
    rotation: '-rotate-2'
  },
  {
    title: '학습 성과를 보여줄 방법이 없다',
    desc: '"우리 아이가 얼마나 늘었는지 모르겠어요." 학부모 상담 때마다 객관적 데이터 없이 말로만 설명하는 한계.',
    color: 'bg-[var(--super-blue)]',
    rotation: 'rotate-1'
  },
  {
    title: '수업 준비에 시간이 너무 많이 든다',
    desc: '"교재 준비, 레벨 테스트, 학부모 보고..." 본연의 교육에 집중하고 싶은데 행정 업무에 치이는 하루하루.',
    color: 'bg-[#FFF9C4]',
    rotation: '-rotate-1'
  },
];

export default function PainPoint() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 bg-[#8C9A8B] relative overflow-hidden flex justify-center">
      {/* Texture overlay for grass/nature feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
      
      {/* The "Open Book" Container */}
      <div className="max-w-6xl w-full relative z-10 flex flex-col md:flex-row bg-[var(--cream)] rounded-xl shadow-2xl pb-10 md:pb-0 overflow-hidden transform perspective-1000 rotate-x-2">
        
        {/* Book Spine Shadow */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-black/10 to-transparent z-20 pointer-events-none" />

        {/* Left Page (Header) */}
        <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center relative">
          <div className="absolute top-8 left-8">
             <span className="inline-block px-3 py-1 bg-white border-2 border-[var(--super-text)] text-xs font-bold rounded shadow-[2px_2px_0px_0px_var(--super-text)] transform -rotate-3">
               Issue Tracker
             </span>
          </div>
          
          <h2 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight mb-8 mt-12">
            원장님이라면<br />
            누구나<br />
            <span className="text-[var(--super-orange)]">한 번쯤.</span>
          </h2>
          <p className="reveal text-[var(--warm-gray)] text-lg font-medium">
            원장님만 그런 게 아닙니다.<br/>150개 학원의 고민에서 출발했습니다.
          </p>
        </div>

        {/* Right Page (Content) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6 relative bg-white/50">
           {/* Page line pattern */}
           <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #E5D4C4 31px, #E5D4C4 32px)'}} />

          {pains.map((pain, i) => (
            <div
              key={i}
              className={`reveal relative p-6 rounded-lg border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] ${pain.color} ${pain.rotation} hover:rotate-0 transition-transform duration-300 z-10`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <h3 className="text-xl font-bold text-[var(--super-text)] mb-2 font-serif">{pain.title}</h3>
              <p className="text-[var(--super-text)]/80 leading-relaxed font-medium">{pain.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
