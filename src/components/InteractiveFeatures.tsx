'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const features = [
  {
    title: '터치 & 드래그 학습',
    desc: '화면 위 블록을 옮기고, 그림을 완성하고, 퍼즐을 맞추며 직접 체험하는 수업',
    img: '/images/features/touch-drag.png',
    color: 'bg-[#B4E4D3]',
    tag: 'Interactive',
  },
  {
    title: '실시간 퀴즈 배틀',
    desc: '친구들과 동시에 푸는 퀴즈 대결! 순위표가 올라갈 때 교실이 환호합니다',
    img: '/images/features/quiz-battle.png',
    color: 'bg-[#FFD1DC]',
    tag: 'Gamification',
  },
  {
    title: '미션 & 보상 시스템',
    desc: '오늘의 미션 클리어 → 별 획득 → 캐릭터 성장. 매일 수업이 기대되는 이유',
    img: '/images/features/mission-reward.png',
    color: 'bg-[#FFF9C4]',
    tag: 'Motivation',
  },
  {
    title: '스토리 어드벤처',
    desc: '캐릭터와 모험을 떠나며 배우는 내러티브 학습. "다음 편 언제 나와요?"가 나옵니다',
    img: '/images/features/story-adventure.png',
    color: 'bg-[#CDE4F7]',
    tag: 'Storytelling',
  },
  {
    title: '음성 인식 발표',
    desc: '아이가 직접 말하고 AI가 피드백. 발표력과 자신감이 동시에 자랍니다',
    img: '/images/features/voice-present.png',
    color: 'bg-[#E8D5F5]',
    tag: 'Speaking',
  },
  {
    title: '학부모 실시간 알림',
    desc: '오늘 수업에서 아이가 뭘 배웠는지, 얼마나 참여했는지 즉시 알림 발송',
    img: '/images/features/parent-notify.png',
    color: 'bg-[#D4EDDA]',
    tag: 'Management',
  },
];

export default function InteractiveFeatures() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden border-b-4 border-[var(--super-text)]">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/features-bg.png" alt="" fill className="object-cover opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--super-text)] text-white text-sm font-bold border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-brown)] mb-8 transform rotate-1">
              Interactive Learning
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] font-black leading-tight mb-6">
              만지고, 말하고, 도전하는<br />
              <span className="text-white bg-[var(--super-orange)] px-4 pb-1 inline-block border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] transform -rotate-1 mt-2">
                참여형 수업의 모든 것
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[var(--super-text)] font-bold text-xl max-w-2xl mx-auto">
              아이가 수동적으로 듣기만 하는 수업은 없습니다.<br />
              모든 순간이 참여이고, 모든 참여가 성장입니다.
            </p>
          </FadeIn>
        </div>

        {/* Feature Grid — 2x3 with images */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
          {features.map((f, i) => (
            <StaggerItem key={i}>
              <div className="group bg-white border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_var(--super-text)] transition-all duration-300 overflow-hidden">

                {/* Image area */}
                <div className={`relative w-full h-52 ${f.color} border-b-4 border-[var(--super-text)] overflow-hidden`}>
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tag */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[var(--super-text)] text-white text-xs font-bold border-2 border-[var(--super-text)] shadow-[2px_2px_0px_0px_var(--super-brown)]">
                    {f.tag}
                  </span>
                </div>

                {/* Text area */}
                <div className="p-6">
                  <h3 className="font-serif font-black text-xl text-[var(--super-text)] mb-2 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-[var(--super-text)]/80 font-bold leading-relaxed text-sm">
                    {f.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      <Parallax speed={0.3} className="absolute bottom-10 right-[5%] z-0 opacity-10 pointer-events-none">
        <div className="w-24 h-24 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
