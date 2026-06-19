'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const reviews = [
  {
    quote: '도입하고 나서 아이들이 수업 시작 전부터 "오늘 뭐 해요?" 하고 달려와요. 교실 분위기가 완전 달라졌어요!',
    name: '박지영 원장',
    role: '영어학원 (원생 45명)',
    color: 'bg-[var(--super-pink)]'
  },
  {
    quote: '학부모님이 "학원 다녀온 날은 아이가 신나서 집에서도 복습해요"라고 하시더라고요. 리포트 보내드리니 감동하시고요.',
    name: '김수진 원장',
    role: '유아학원 (원생 60명)',
    color: 'bg-white'
  },
  {
    quote: '아이별 데이터 관리가 자동으로 되니까 상담이 너무 편해졌어요. 수업은 더 재밌게, 관리는 더 철저하게 할 수 있게 됐습니다.',
    name: '이현아 원장',
    role: '어학원 (원생 80명)',
    color: 'bg-[var(--super-blue)]'
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden border-b-4 border-[var(--super-text)]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/testimonial-bg.png" alt="" fill className="object-cover opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

        {/* Left Side: Header */}
        <div className="lg:w-1/3 text-center lg:text-left">
          <FadeIn>
            <h2 className="font-serif text-5xl md:text-6xl text-[var(--super-text)] leading-tight font-black mb-6">
              먼저 도입하신<br />
              원장님들의<br />
              <span className="text-[var(--super-orange)] bg-white px-4 pb-2 border-4 border-[var(--super-text)] inline-block transform -rotate-2 mt-4 shadow-[8px_8px_0px_0px_var(--super-text)]">
                진짜 이야기
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[var(--super-text)]/80 font-bold text-xl mt-8">
              즐거운 수업, 활기찬 교실,<br />
              그리고 감동하는 학부모.
            </p>
          </FadeIn>
        </div>

        {/* Right Side: Staggered Testimonial Cards */}
        <StaggerContainer className="lg:w-2/3 flex flex-col sm:flex-row gap-8 w-full" stagger={0.15}>
          {reviews.map((r, i) => (
            <StaggerItem key={i} direction="right">
              <div
                className={`relative flex-1 ${r.color} p-8 rounded-2xl border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-text)] flex flex-col justify-between hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--super-text)] transition-all duration-300`}
              >
                <div className="flex gap-2 mb-6 border-b-4 border-[var(--super-text)] pb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-6 h-6 text-[var(--super-orange)] drop-shadow-[2px_2px_0_var(--super-text)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[var(--super-text)] font-black text-xl leading-relaxed mb-8 font-serif">
                  &ldquo;{r.quote}&rdquo;
                </p>

                <div className="flex justify-between items-end mt-auto">
                  <div>
                    <p className="font-black text-[var(--super-text)] text-lg">{r.name}</p>
                    <p className="text-[var(--super-text)]/70 text-sm font-bold bg-white/50 px-2 rounded inline-block mt-1">{r.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Parallax speed={-0.3} className="absolute top-10 right-[5%] z-0 opacity-10 pointer-events-none">
        <div className="w-24 h-24 border-4 border-[var(--super-text)] rounded-xl rotate-45" />
      </Parallax>
    </section>
  );
}
