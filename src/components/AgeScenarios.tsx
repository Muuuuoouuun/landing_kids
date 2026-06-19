'use client';

import React, { useState } from 'react';
import { FadeIn } from './motion';

type TabKey = 'toddler' | 'elementary';

const tabs: { key: TabKey; label: string; sub: string }[] = [
  { key: 'toddler', label: '유아', sub: '5~7세' },
  { key: 'elementary', label: '초등 저학년', sub: '8~10세' },
];

const scenarios: Record<
  TabKey,
  {
    headline: string;
    lead: string;
    accent: string;
    cards: { icon: string; tag: string; title: string; desc: string; color: string }[];
    parentLine: string;
  }
> = {
  toddler: {
    headline: '정서·발달·안전, 그리고 신나는 놀이.',
    lead: '아직 글보다 그림이, 점수보다 즐거움이 먼저인 나이. 우리 아이가 "또 가고 싶다"고 말하는 데서 모든 게 시작됩니다.',
    accent: 'bg-[var(--super-pink)]',
    cards: [
      {
        icon: '🧸',
        tag: '정서 안정',
        title: '울지 않고, 웃으며 들어가요',
        desc: '캐릭터와 애니메이션으로 시작하는 수업. 낯선 환경도 놀이처럼 느끼며 학원에 정붙입니다.',
        color: 'bg-white',
      },
      {
        icon: '🌱',
        tag: '발달 맞춤',
        title: '나이에 딱 맞는 난이도',
        desc: '발달 단계별로 설계된 콘텐츠. 너무 어렵지도, 시시하지도 않게 아이의 호기심을 키웁니다.',
        color: 'bg-[var(--super-blue)]',
      },
      {
        icon: '🛡️',
        tag: '안전 최우선',
        title: '짧은 화면, 안전한 환경',
        desc: '유아 권장 시간에 맞춘 짧은 세션과 광고 없는 화면. 부모님이 안심할 수 있는 화면만 보여줍니다.',
        color: 'bg-[var(--gold-light)]',
      },
      {
        icon: '🎨',
        tag: '놀이 학습',
        title: '공부가 아니라 놀이예요',
        desc: '터치·소리·움직임으로 오감을 자극하는 활동. 배운다는 느낌 없이 자연스럽게 익힙니다.',
        color: 'bg-white',
      },
    ],
    parentLine: '"우리 애가 어린데 괜찮을까?" — 가장 어린 친구에게 가장 안전하게 설계했습니다.',
  },
  elementary: {
    headline: '학습 습관·집중력, 그리고 보이는 결과.',
    lead: '이제는 즐거움 위에 결과가 필요한 나이. 스스로 앉아 끝까지 해내는 습관과, 부모님이 확인할 수 있는 성장을 만듭니다.',
    accent: 'bg-[var(--super-orange)]',
    cards: [
      {
        icon: '📚',
        tag: '학습 습관',
        title: '스스로 앉는 아이가 됩니다',
        desc: '미션과 보상 구조로 "끝까지 해내는" 경험을 반복. 시키지 않아도 책상 앞에 앉는 습관을 만듭니다.',
        color: 'bg-white',
      },
      {
        icon: '🎯',
        tag: '집중력',
        title: '딴짓 대신 몰입',
        desc: '단계별 퀘스트로 한 가지에 집중하는 힘을 길러요. 산만함이 줄고 수업 완수율이 올라갑니다.',
        color: 'bg-[var(--super-blue)]',
      },
      {
        icon: '📈',
        tag: '보이는 결과',
        title: '성장이 데이터로 남아요',
        desc: '정답률·진도·취약 단원이 리포트로 정리. "잘하고 있어요"가 아니라 숫자로 증명합니다.',
        color: 'bg-[var(--gold-light)]',
      },
      {
        icon: '🏆',
        tag: '성취 동기',
        title: '해냈다는 자신감',
        desc: '레벨업과 배지로 성취를 눈에 보이게. 작은 성공이 쌓여 공부에 대한 자신감으로 이어집니다.',
        color: 'bg-white',
      },
    ],
    parentLine: '"학원 보냈는데 뭘 배웠는지 모르겠어요" — 매 수업, 결과로 증명합니다.',
  },
};

export default function AgeScenarios() {
  const [active, setActive] = useState<TabKey>('toddler');
  const data = scenarios[active];

  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative border-b-4 border-[var(--super-text)] overflow-hidden bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--super-brown)] text-white border-4 border-[var(--super-text)] text-sm font-bold shadow-[4px_4px_0px_0px_var(--super-text)] mb-8 transform -rotate-2">
              For Every Age
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-4">
              우리 아이 나이에 맞나요?
            </h2>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-[var(--super-text)]/80 font-bold text-lg max-w-2xl mx-auto">
              유아와 초등 저학년은 필요한 게 다릅니다. 우리 아이에게 맞는 이야기를 골라보세요.
            </p>
          </FadeIn>
        </div>

        {/* Tabs */}
        <FadeIn delay={0.3}>
          <div className="flex justify-center mb-12">
            <div className="inline-flex gap-3 p-2 bg-white border-4 border-[var(--super-text)] shadow-[8px_8px_0px_0px_var(--super-text)] rounded-[1.5rem]">
              {tabs.map((t) => {
                const isActive = active === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className={`px-6 md:px-10 py-4 rounded-[1rem] border-4 border-[var(--super-text)] font-black text-base md:text-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[var(--super-orange)] text-white shadow-[4px_4px_0px_0px_var(--super-text)] -translate-y-1'
                        : 'bg-[var(--cream)] text-[var(--super-text)] hover:-translate-y-0.5'
                    }`}
                  >
                    {t.label}
                    <span className={`block text-xs font-bold mt-0.5 ${isActive ? 'text-white/90' : 'text-[var(--super-text)]/60'}`}>
                      {t.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Content — FadeIn re-keyed on tab change so it swaps in */}
        <FadeIn key={active} direction="up" duration={0.5}>
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
            {/* Left — headline */}
            <div className="md:w-1/3 md:sticky md:top-32 h-fit w-full">
              <div className={`${data.accent} border-4 border-[var(--super-text)] p-8 shadow-[8px_8px_0px_0px_var(--super-text)] transform -rotate-1`}>
                <h3 className="font-serif text-3xl lg:text-4xl text-[var(--super-text)] leading-[1.15] font-black mb-5">
                  {data.headline}
                </h3>
                <p className="text-[var(--super-text)] font-bold leading-relaxed mb-6">{data.lead}</p>
                <div className="bg-white border-2 border-[var(--super-text)] px-4 py-3 shadow-[3px_3px_0px_0px_var(--super-text)] text-sm font-bold text-[var(--super-text)] leading-relaxed">
                  {data.parentLine}
                </div>
              </div>
            </div>

            {/* Right — scenario cards */}
            <div className="md:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {data.cards.map((c, i) => (
                <div
                  key={c.title}
                  className={`${c.color} border-4 border-[var(--super-text)] p-7 shadow-[8px_8px_0px_0px_var(--super-text)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--super-text)] transition-transform duration-300 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                >
                  <div className="w-16 h-16 bg-white border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center text-3xl mb-5 transform -rotate-6">
                    {c.icon}
                  </div>
                  <div className="inline-block px-2 py-1 bg-[var(--super-text)] text-white text-xs font-bold mb-3 uppercase tracking-wider">
                    {c.tag}
                  </div>
                  <h4 className="text-xl font-black font-serif text-[var(--super-text)] mb-2 leading-tight">{c.title}</h4>
                  <p className="text-[var(--super-text)]/80 font-bold leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
