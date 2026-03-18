'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    time: 'STEP 1',
    title: '무료 원격 상담 & 분석',
    desc: '전담 매니저가 학원 환경을 분석하여 최적의 도입 방안 설계',
    color: 'bg-[var(--super-blue)]',
    rotate: '-rotate-2',
    icon: '💬'
  },
  {
    time: 'STEP 2',
    title: '맞춤형 커리큘럼 세팅',
    desc: '원장님의 교육 방향에 맞춘 맞춤형 콘텐츠 구성 및 강사 교육 진행',
    color: 'bg-[#FFF9C4]',
    rotate: 'rotate-1',
    icon: '🛠️'
  },
  {
    time: 'STEP 3',
    title: '수업 적용 및 데이터 축적',
    desc: '아이별 학습 데이터 자동 수집 및 주차별 맞춤 피드백 생성',
    color: 'bg-[var(--super-pink)]',
    rotate: '-rotate-1',
    icon: '📊'
  },
  {
    time: 'STEP 4',
    title: '입소문이 나는 학원!',
    desc: '월간 성장 리포트로 학부모 만족도 상승 및 원생 유입 증가',
    color: 'bg-[var(--cream)]',
    rotate: 'rotate-2',
    icon: '✨'
  },
];

export default function HowItWorks() {
  const ref = useReveal();

  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[#F4EBE1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Text & Header */}
        <div className="lg:w-1/3 text-center lg:text-left">
          <span className="inline-block px-4 py-2 bg-[var(--super-brown)] text-white text-xs font-bold rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] mb-6 transform -rotate-2">
            Easy Onboarding
          </span>
          <h2 className="reveal font-serif text-4xl md:text-5xl text-[var(--super-text)] leading-tight font-black mb-6">
            도입부터<br />
            입소문까지<br />
            <span className="text-[var(--super-orange)]">4주 완성</span>
          </h2>
          <p className="reveal text-[var(--warm-gray)] font-medium text-lg mb-8">
            전담 매니저와 함께하는 체계적인 온보딩.<br />원장님은 오직 <span className="font-bold text-[var(--super-text)]">교육에만 집중</span>하세요.
          </p>
          
          <div className="hidden lg:block relative w-48 h-48 mx-auto xl:mx-0 opacity-80 mt-12">
             <div className="absolute inset-0 bg-[#E5D4C4] rounded-full filter blur-xl"></div>
             {/* Abstract shape representing onboarding */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--super-orange)] rounded-full border-4 border-[var(--super-text)] animate-pulse-soft"></div>
             <div className="absolute top-10 right-10 w-16 h-16 bg-[#FFF9C4] rounded-full border-2 border-[var(--super-text)]"></div>
             <div className="absolute bottom-10 left-10 w-12 h-12 bg-[var(--super-pink)] rounded-full border-2 border-[var(--super-text)]"></div>
          </div>
        </div>

        {/* Right: Funky timeline cards */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
             {/* Connective dots background */}
             <div className="absolute inset-0 z-0 hidden sm:block pointer-events-none opacity-20" style={{backgroundImage: 'radial-gradient(#2D231A 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>
             
             {steps.map((step, i) => (
                <div 
                  key={i}
                  className={`reveal relative p-6 rounded-2xl border-[3px] border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] ${step.color} ${step.rotate} z-10 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--super-text)] transition-all`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <div className="font-bold font-serif text-[var(--super-text)] text-sm mb-1 opacity-70 border-b-2 border-[var(--super-text)]/20 pb-1 inline-block">
                    {step.time}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--super-text)] mt-3 mb-2">{step.title}</h3>
                  <p className="text-[var(--super-text)]/80 font-medium leading-relaxed">{step.desc}</p>
                </div>
             ))}
        </div>

      </div>
    </section>
  );
}
