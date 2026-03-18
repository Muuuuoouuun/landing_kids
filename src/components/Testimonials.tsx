'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const reviews = [
  {
    quote: '데이터로 보여주니까 학부모님들이 먼저 "감사하다"고 하시더라고요. 입소문이 안 날 수가 없어요.',
    name: '박지영 원장',
    role: '영어학원 (원생 45명)',
    tilt: '-rotate-2',
    color: 'bg-[var(--super-blue)]'
  },
  {
    quote: '"우리 아이 성장 데이터를 매주 드립니다." 이 한마디가 저희 학원의 가장 강력한 무기가 됐어요.',
    name: '김수진 원장',
    role: '유아학원 (원생 60명)',
    tilt: 'rotate-1',
    color: 'bg-[#FFF9C4]'
  },
  {
    quote: '예전엔 보고서 만드느라 야근했는데, 이제 자동으로 나가니까 수업 준비에만 집중할 수 있어요.',
    name: '이현아 원장',
    role: '어학원 (원생 80명)',
    tilt: '-rotate-1',
    color: 'bg-[var(--super-pink)]'
  },
];

export default function Testimonials() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[var(--super-blue)] relative overflow-hidden">
      
      {/* Decorative stars */}
      <div className="absolute top-10 left-10 text-3xl opacity-50 animate-pulse-soft">✨</div>
      <div className="absolute bottom-20 right-20 text-4xl opacity-50 animate-pulse-soft delay-300">⭐</div>
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Header */}
        <div className="lg:w-1/3 text-center lg:text-left z-10">
          <h2 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-6">
            먼저 도입하신<br />
            원장님들의<br />
            <span className="text-[var(--super-orange)] bg-white px-2 rounded-lg inline-block transform -rotate-2 mt-2 border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)]">
              진짜 이야기
            </span>
          </h2>
          <p className="reveal text-[var(--super-text)]/80 font-medium text-lg">
            도입 후 무엇이 달라졌을까요?<br />생생한 후기를 확인해보세요.
          </p>
        </div>

        {/* Right Side: Masonry-style sticky quotes */}
        <div className="lg:w-2/3 flex flex-col gap-6 w-full">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`reveal relative ${r.color} p-8 md:p-10 rounded-2xl border-[3px] border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] w-full lg:w-4/5 ${i%2 === 1 ? 'lg:self-end' : 'lg:self-start'} ${r.tilt} hover:rotate-0 hover:-translate-y-1 transition-all duration-300`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Tape detail */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-12 h-6 bg-white/60 backdrop-blur-sm transform -rotate-6 shadow-[0_1px_2px_rgba(0,0,0,0.1)]"></div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-[var(--super-orange)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-[var(--super-text)] font-bold text-lg leading-relaxed mb-6 font-serif">
                &ldquo;{r.quote}&rdquo;
              </p>
              
              <div className="flex justify-between items-end border-t-2 border-[var(--super-text)]/10 pt-4">
                <div>
                  <p className="font-bold text-[var(--super-text)]">{r.name}</p>
                  <p className="text-[var(--super-text)]/70 text-sm font-medium">{r.role}</p>
                </div>
                <div className="text-3xl opacity-50">👍</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
