'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    time: 'STEP 1',
    title: '무료 상담 & 학원 분석',
    desc: '전담 매니저가 학원 규모, 연령대, 기존 커리큘럼을 분석하여 최적의 도입 방안을 설계합니다.',
    visual: '📋',
  },
  {
    time: 'STEP 2',
    title: '맞춤 커리큘럼 세팅',
    desc: '원장님의 교육 방향에 맞춰 콘텐츠를 구성하고, 선생님 대상 활용법 교육을 진행합니다.',
    visual: '⚙️',
  },
  {
    time: 'STEP 3',
    title: '수업 적용 & 데이터 축적',
    desc: '아이별 학습 데이터가 자동으로 쌓이며, 1주차부터 학부모 리포트가 발송됩니다.',
    visual: '📊',
  },
  {
    time: 'STEP 4',
    title: '성과 확인 & 학부모 만족',
    desc: '월간 성장 리포트로 학부모 상담이 수월해지고, 입소문이 시작됩니다.',
    visual: '🌟',
  },
];

export default function HowItWorks() {
  const ref = useReveal();

  return (
    <section id="how-it-works" ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            Implementation Journey
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            도입부터 성과까지<br />
            <span className="italic font-light">4단계로 완성됩니다</span>
          </h2>
          <p className="reveal text-[#636E72] font-light text-lg max-w-lg mx-auto">
            전담 매니저와 함께하는 체계적인 온보딩. 원장님은 교육에만 집중하세요.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#E9E4DB] -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`reveal relative md:flex md:items-center md:min-h-[180px] ${
                    isLeft ? '' : 'md:flex-row-reverse'
                  }`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  {/* Content */}
                  <div className={`md:w-[calc(50%-40px)] ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <span className="text-sm font-medium text-[#8C9A8B] mb-2 block">{step.time}</span>
                    <h3 className="text-xl font-semibold text-[#2D3436] mb-2">{step.title}</h3>
                    <p className="text-[#636E72] text-[15px] leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Center dot — desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FDFBF7] border-2 border-[#8C9A8B] items-center justify-center text-lg z-10">
                    {step.visual}
                  </div>

                  {/* Empty spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
