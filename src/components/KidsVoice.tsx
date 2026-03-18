'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const voices = [
  {
    quote: '매주 리포트 받을 때마다 감동이에요. 우리 아이가 어디가 약한지, 어디가 강한지 한눈에 보여서 집에서도 도와줄 수 있거든요.',
    name: '학부모 김○○',
    context: '도입 학원 학부모',
    emoji: '📊',
    color: 'bg-[var(--super-blue)]',
    rotate: '-rotate-1',
  },
  {
    quote: '이거 게임이야? 공부야? ...둘 다인 거 같아!',
    name: '6세 서연',
    context: '수업 중 아이 반응',
    emoji: '🎮',
    color: 'bg-[#FFF9C4]',
    rotate: 'rotate-2',
  },
  {
    quote: '예전 학원에서는 뭘 배우는지 잘 몰랐는데, 여기는 데이터로 보여주니까 신뢰가 가요. 주변 엄마들한테도 추천했어요.',
    name: '학부모 이○○',
    context: '도입 학원 학부모',
    emoji: '💬',
    color: 'bg-[var(--super-pink)]',
    rotate: '-rotate-2',
  },
  {
    quote: '엄마! 나 오늘 별 세 개 받았어! 내일은 네 개 받을 거야!',
    name: '5세 민준',
    context: '수업 후 아이 반응',
    emoji: '🌟',
    color: 'bg-[var(--cream)]',
    rotate: 'rotate-1',
  },
];

export default function KidsVoice() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-white relative overflow-hidden">
      {/* Background dots */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{backgroundImage: 'radial-gradient(var(--super-text) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px'}} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#FFF9C4] border-2 border-[var(--super-text)] text-[var(--super-text)] text-xs font-bold rounded-full shadow-[2px_2px_0px_0px_var(--super-text)] mb-6">
            Real Feedback
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-4">
            학부모와 아이들의<br />
            <span className="text-[var(--super-orange)]">진짜 반응</span>
          </h2>
          <p className="reveal text-[var(--warm-gray)] font-medium text-lg max-w-lg mx-auto">
            원장님의 학원에 이런 피드백이 쌓이기 시작합니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {voices.map((v, i) => (
            <div
              key={i}
              className={`reveal ${v.color} ${v.rotate} border-[3px] border-[var(--super-text)] rounded-2xl p-8 shadow-[4px_4px_0px_0px_var(--super-text)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--super-text)] hover:rotate-0 transition-all duration-300 relative`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Tape */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/50 transform rotate-[-3deg] shadow-sm" />

              <span className="text-4xl mb-4 block">{v.emoji}</span>
              <p className="text-[var(--super-text)] text-lg font-bold leading-relaxed mb-6 font-serif">
                &ldquo;{v.quote}&rdquo;
              </p>
              <div className="border-t-2 border-[var(--super-text)]/10 pt-3">
                <p className="text-[var(--super-text)] text-sm font-bold">{v.name}</p>
                <p className="text-[var(--super-text)]/60 text-xs font-medium mt-0.5">{v.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
