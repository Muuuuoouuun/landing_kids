'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, Parallax } from './motion';

const voices = [
  {
    quote: '선생님, 저 발표할래요! 나 답 알아요!',
    name: '6세 서연',
    context: '수업 중 자발적 참여',
    emoji: '🙋',
    color: 'bg-[#FFF9C4]',
    rotate: 'rotate-2',
  },
  {
    quote: '원래 소극적이던 아이가 "엄마 나 오늘 발표 두 번 했어!" 하며 자랑하더라고요. 눈물 날 뻔했어요.',
    name: '학부모 김○○',
    context: '아이의 변화에 감동한 학부모',
    emoji: '🥹',
    color: 'bg-[var(--super-blue)]',
    rotate: '-rotate-1',
  },
  {
    quote: '내일 학원 가는 날이야? 빨리 가고 싶어! 오늘 배운 거 친구한테 알려줄 거야!',
    name: '5세 민준',
    context: '수업이 기대되는 아이',
    emoji: '🏃',
    color: 'bg-[var(--super-pink)]',
    rotate: '-rotate-2',
  },
  {
    quote: '집에서 혼자 복습하면서 "엄마 이거 봐봐, 내가 설명해줄게" 해요. 참여하는 습관이 완전히 달라졌어요.',
    name: '학부모 이○○',
    context: '능동적으로 변한 아이',
    emoji: '⭐',
    color: 'bg-[var(--cream)]',
    rotate: 'rotate-1',
  },
];

export default function KidsVoice() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden border-b-4 border-[var(--super-text)]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/kids-bg.png" alt="" fill className="object-cover opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header + Research Block */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20">
          {/* Left: Headline */}
          <div className="lg:w-1/2">
            <FadeIn direction="down">
              <span className="inline-block px-4 py-2 bg-[var(--super-orange)] text-white text-sm font-bold border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] mb-8 transform -rotate-2">
                Kids Changed!
              </span>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-[1.1] font-black mb-6">
                발표하고 싶어<br />
                손을 드는 교실,<br />
                <span className="text-[var(--super-orange)]">상상해 보셨나요?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-[var(--super-text)] font-bold text-xl leading-relaxed">
                수업이 기대되고, 더 참여하고 싶고, 친구에게 알려주고 싶은 아이들.<br/>
                교실의 에너지가 완전히 달라집니다.
              </p>
            </FadeIn>
          </div>

          {/* Right: Research Card */}
          <div className="lg:w-1/2 flex items-center">
            <ScaleIn>
              <div className="bg-[var(--super-blue)] border-4 border-[var(--super-text)] p-8 md:p-10 shadow-[8px_8px_0px_0px_var(--super-text)] transform rotate-1 hover:rotate-0 transition-transform duration-300 w-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 shrink-0 bg-white border-4 border-[var(--super-text)] rounded-full flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_var(--super-text)]">
                    📚
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-xl text-[var(--super-text)] mb-1">참여형 학습의 과학적 근거</h3>
                    <p className="text-[var(--super-text)]/60 text-sm font-bold">Scott Freeman et al. (2014), PNAS</p>
                  </div>
                </div>
                <p className="text-[var(--super-text)] font-bold leading-relaxed mb-6">
                  워싱턴대학교 스콧 프리먼 교수 연구팀은 225개 연구를 메타분석한 결과,
                  <span className="bg-white px-2 py-0.5 border-2 border-[var(--super-text)] inline-block mx-1">능동적 참여형 수업</span>이
                  기존 강의식 수업 대비
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white border-4 border-[var(--super-text)] px-5 py-3 shadow-[4px_4px_0px_0px_var(--super-text)] transform -rotate-2">
                    <span className="font-serif font-black text-3xl text-[var(--super-orange)]">+6%</span>
                    <p className="text-[var(--super-text)] font-bold text-xs mt-1">시험 성적 향상</p>
                  </div>
                  <div className="bg-white border-4 border-[var(--super-text)] px-5 py-3 shadow-[4px_4px_0px_0px_var(--super-text)] transform rotate-1">
                    <span className="font-serif font-black text-3xl text-[var(--super-orange)]">1.5x</span>
                    <p className="text-[var(--super-text)] font-bold text-xs mt-1">낙오율 감소</p>
                  </div>
                  <div className="bg-white border-4 border-[var(--super-text)] px-5 py-3 shadow-[4px_4px_0px_0px_var(--super-text)] transform -rotate-1">
                    <span className="font-serif font-black text-3xl text-[var(--super-orange)]">↑↑</span>
                    <p className="text-[var(--super-text)] font-bold text-xs mt-1">장기 기억 정착</p>
                  </div>
                </div>
                <p className="text-[var(--super-text)] font-bold text-sm mt-6 leading-relaxed border-t-2 border-[var(--super-text)]/20 pt-4">
                  Little Minds는 이 연구를 토대로 <span className="text-[var(--super-orange)]">직접 만지고, 퀴즈에 도전하고, 친구와 경쟁하는 참여형 학습</span>을 설계했습니다.
                  아이가 수동적으로 듣기만 하는 수업과는 차원이 다릅니다.
                </p>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* Voice Cards - Staggered */}
        <StaggerContainer className="grid sm:grid-cols-2 gap-8" stagger={0.1}>
          {voices.map((v, i) => (
            <StaggerItem key={i}>
              <div
                className={`${v.color} ${v.rotate} border-4 border-[var(--super-text)] rounded-2xl p-8 shadow-[6px_6px_0px_0px_var(--super-text)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_var(--super-text)] hover:rotate-0 transition-all duration-300 relative`}
              >
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 transform rotate-[-3deg] shadow-sm border border-[var(--super-text)]/20" />

                <span className="text-4xl mb-4 block">{v.emoji}</span>
                <p className="text-[var(--super-text)] text-xl font-black leading-relaxed mb-6 font-serif">
                  &ldquo;{v.quote}&rdquo;
                </p>
                <div className="border-t-2 border-[var(--super-text)]/15 pt-4">
                  <p className="text-[var(--super-text)] font-black">{v.name}</p>
                  <p className="text-[var(--super-text)]/60 text-sm font-bold mt-1">{v.context}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Parallax speed={0.3} className="absolute bottom-10 left-[3%] z-0 opacity-10 pointer-events-none">
        <div className="w-20 h-20 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
