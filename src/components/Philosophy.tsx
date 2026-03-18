'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const pillars = [
  {
    icon: (
      <svg className="w-16 h-16 text-[var(--super-brown)] mb-6 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    label: '#Brain #Development',
    title: '두뇌 발달 기반 설계',
    desc: '4~7세 인지 발달 단계에 맞춘 즐거운 자극. 아이마다 다른 성장 속도에 맞춰 난이도를 자동 조절합니다.',
    color: 'bg-[var(--super-blue)]'
  },
  {
    icon: (
      <svg className="w-16 h-16 text-[var(--super-brown)] mb-6 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.546l-1.59-1.59" />
      </svg>
    ),
    label: '#Active #Inquiry',
    title: '능동적 탐구 학습',
    desc: '답을 주입하지 않습니다. 스스로 묻고 발견하는 과정으로 원장님의 교육 철학을 고스란히 담아냅니다.',
    color: 'bg-[var(--super-pink)]'
  },
  {
    icon: (
      <svg className="w-16 h-16 text-[var(--super-brown)] mb-6 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    label: '#Data #Report',
    title: '학부모 리포트 자동화',
    desc: '아이별 학습 패턴 분석을 통한 전문 리포트 자동 생성. 상담은 쉬워지고 학부모 신뢰도는 높아집니다.',
    color: 'bg-[#FFF9C4]'
  },
];

export default function Philosophy() {
  const ref = useReveal();

  return (
    <section id="philosophy" ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[var(--cream)] relative overflow-hidden text-center">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
           <span className="inline-block px-3 py-1 bg-white border-2 border-[var(--super-text)] text-xs font-bold rounded shadow-[2px_2px_0px_0px_var(--super-text)] mb-6 transform rotate-2">
             Our Philosophy
           </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-6">
            단순한 학습 앱이 아닌<br />
            학원 경쟁력을 높이는 <span className="text-[var(--super-orange)]">교육 시스템</span>
          </h2>
          <p className="reveal text-[var(--warm-gray)] font-medium text-lg max-w-2xl mx-auto">
            뇌과학 기반 커리큘럼, 능동적 학습 설계, 자동화된 학부모 리포트까지.<br className="hidden md:block"/>원장님의 교육 철학을 더 강력하게 만드는 세 가지 축입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div
              key={i}
              className={`reveal group p-8 md:p-10 ${p.color} border-[3px] border-[var(--super-text)] rounded-[2rem] shadow-[6px_6px_0px_0px_var(--super-text)] hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--super-text)] transition-all duration-300 relative`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Fun decorative tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 rotate-[-4deg] opacity-70" style={{boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}></div>
              
              {p.icon}
              <div className="text-sm font-bold text-[var(--super-text)] mb-3 opacity-60">
                {p.label}
              </div>
              <h3 className="text-2xl font-bold font-serif text-[var(--super-text)] mb-4">{p.title}</h3>
              <p className="text-[var(--super-text)]/80 leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
