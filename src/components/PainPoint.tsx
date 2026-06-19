'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const pains = [
  {
    title: '수업이 지루해 보인다',
    desc: '"아이들 눈이 안 빛나요." 열심히 준비했는데 아이들 반응은 시큰둥. 즐겁게 몰입하는 수업을 만들고 싶은데 방법이 막막한 현실.',
    color: 'bg-[var(--super-pink)]',
    icon: '😴'
  },
  {
    title: '교실 분위기가 가라앉는다',
    desc: '"활기가 없어요." 선생님도 아이도 에너지가 떨어지는 오후 수업. 매일 새롭고 활기찬 수업을 이끌어가기가 점점 힘들어집니다.',
    color: 'bg-[var(--super-blue)]',
    icon: '🔋'
  },
  {
    title: '아이별 관리가 안 된다',
    desc: '"이 아이가 뭘 잘하고 뭘 못하는지 정확히 모르겠어요." 체계적인 학습 데이터 없이 감으로 운영하는 한계에 부딪힙니다.',
    color: 'bg-[#FFF9C4]',
    icon: '📋'
  },
];

export default function PainPoint() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[var(--super-orange)] relative border-b-4 border-[var(--super-text)] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/pain-bg.png" alt="" fill className="object-cover opacity-20 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">

        {/* Header Section */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <FadeIn direction="down" delay={0.1}>
              <span className="inline-block px-4 py-2 bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] font-bold text-sm shadow-[4px_4px_0px_0px_var(--super-text)] mb-6 transform -rotate-2">
                Issue Tracker
              </span>
            </FadeIn>
            <FadeIn>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[var(--super-text)] font-black leading-tight">
                이런 수업,<br />
                계속 <span className="text-white underline decoration-[var(--super-text)] decoration-4 underline-offset-8">괜찮을까요?</span>
              </h2>
            </FadeIn>
          </div>

          <FadeIn direction="right" delay={0.2}>
            <div className="md:max-w-xs bg-white p-6 border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] rounded-xl">
              <p className="text-[var(--super-text)] font-semibold text-lg leading-relaxed">
                즐거운 수업, 활기찬 교실, 철저한 관리.<br/>
                세 마리 토끼를 잡을 수 있습니다.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Staggered Pain Point Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" stagger={0.15}>
          {pains.map((pain, i) => (
            <StaggerItem key={i}>
              <div
                className={`flex flex-col p-8 md:p-10 border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-text)] rounded-3xl ${pain.color} transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--super-text)] duration-300`}
              >
                <div className="w-16 h-16 bg-white border-4 border-[var(--super-text)] rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_var(--super-text)] mb-8">
                  {pain.icon}
                </div>
                <h3 className="text-2xl font-black text-[var(--super-text)] mb-4 font-serif leading-tight">
                  {pain.title}
                </h3>
                <p className="text-[var(--super-text)]/80 leading-relaxed font-bold text-lg">
                  {pain.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* Parallax decoration */}
      <Parallax speed={0.4} className="absolute -bottom-10 -right-10 z-0 opacity-10 pointer-events-none">
        <div className="w-60 h-60 border-8 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
