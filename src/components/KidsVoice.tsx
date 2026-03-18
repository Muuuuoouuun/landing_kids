'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const voices = [
  {
    quote: '매주 리포트 받을 때마다 감동이에요. 우리 아이가 어디가 약한지, 어디가 강한지 한눈에 보여서 집에서도 도와줄 수 있거든요.',
    name: '학부모 김○○',
    context: '도입 학원 학부모',
    emoji: '📊',
    bg: 'bg-[#F0F7F0]',
    border: 'border-[#D4E4D4]',
  },
  {
    quote: '이거 게임이야? 공부야? ...둘 다인 거 같아!',
    name: '6세 서연',
    context: '수업 중 아이 반응',
    emoji: '🎮',
    bg: 'bg-[#FFF8E7]',
    border: 'border-[#F5E6C4]',
  },
  {
    quote: '예전 학원에서는 뭘 배우는지 잘 몰랐는데, 여기는 데이터로 보여주니까 신뢰가 가요. 주변 엄마들한테도 추천했어요.',
    name: '학부모 이○○',
    context: '도입 학원 학부모',
    emoji: '💬',
    bg: 'bg-[#F0F4FF]',
    border: 'border-[#D4DEF4]',
  },
  {
    quote: '엄마! 나 오늘 별 세 개 받았어! 내일은 네 개 받을 거야!',
    name: '5세 민준',
    context: '수업 후 아이 반응',
    emoji: '🌟',
    bg: 'bg-[#FFF5F5]',
    border: 'border-[#F4D4D4]',
  },
];

export default function KidsVoice() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-[#F8F7F4] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[50%] h-[40%] bg-[#FDFBF7] rounded-tr-[120px] -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            Real Feedback
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            학부모와 아이들이 보내온<br />
            <span className="italic font-light">가장 솔직한 반응</span>
          </h2>
          <p className="reveal text-[#636E72] font-light text-lg max-w-lg mx-auto">
            원장님의 학원에 이런 피드백이 쌓이기 시작합니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {voices.map((v, i) => (
            <div
              key={i}
              className={`reveal group ${v.bg} ${v.border} border rounded-3xl p-8 hover:shadow-lg transition-all duration-500`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="text-4xl mb-4 block">{v.emoji}</span>
              <p className="text-[#2D3436] text-lg font-medium leading-relaxed mb-6">
                &ldquo;{v.quote}&rdquo;
              </p>
              <div>
                <p className="text-[#2D3436] text-sm font-medium">{v.name}</p>
                <p className="text-[#636E72] text-xs mt-0.5">{v.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
