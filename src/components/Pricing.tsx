'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const plans = [
  {
    name: 'Starter',
    label: '소규모 학원',
    price: '290,000',
    period: '월',
    desc: '원생 30명 이하 학원에 최적화',
    features: [
      '전체 학습 콘텐츠 이용',
      '주간 학부모 리포트 자동 발송',
      '아이별 성취도 대시보드',
      '선생님 교육 (도입 시 1회)',
      '전담 매니저 배정',
    ],
    cta: '도입 상담 신청',
    popular: false,
    color: 'bg-[var(--super-blue)]',
    rotate: '-rotate-1',
  },
  {
    name: 'Professional',
    label: '성장하는 학원',
    price: '490,000',
    period: '월',
    desc: '가장 많은 학원이 선택한 플랜',
    features: [
      'Starter의 모든 기능',
      '프리미엄 애니메이션 콘텐츠',
      '일일 상세 학습 분석',
      '학원 브랜딩 커스터마이징',
      '월간 커리큘럼 컨설팅',
      '학부모 앱 + 카카오톡 리포트',
    ],
    cta: '도입 상담 신청',
    popular: true,
    color: 'bg-[var(--super-orange)]',
    rotate: 'rotate-0',
  },
  {
    name: 'Enterprise',
    label: '다지점 · 프랜차이즈',
    price: '별도 문의',
    period: '',
    desc: '2개 이상 지점 운영 시',
    features: [
      'Professional의 모든 기능',
      '다지점 통합 대시보드',
      '지점별 성과 비교 분석',
      '본사 전용 관리자 페이지',
      '맞춤 콘텐츠 개발 협의',
      'API 연동 지원',
    ],
    cta: '별도 상담 요청',
    popular: false,
    color: 'bg-[#FFF9C4]',
    rotate: 'rotate-1',
  },
];

export default function Pricing() {
  const ref = useReveal();

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[#F4EBE1] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)'}} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] text-xs font-bold rounded-full shadow-[2px_2px_0px_0px_var(--super-text)] mb-6">
            Pricing Plans
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-4">
            학원 규모에 맞는<br />
            <span className="text-[var(--super-orange)]">합리적인 요금제</span>
          </h2>
          <p className="reveal text-[var(--warm-gray)] font-medium text-lg max-w-lg mx-auto">
            원생 수 무제한. 추가 비용 없이 모든 기능을 이용하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal ${plan.color} rounded-2xl border-[3px] border-[var(--super-text)] p-8 md:p-10 flex flex-col relative shadow-[6px_6px_0px_0px_var(--super-text)] hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--super-text)] transition-all duration-300 ${plan.rotate}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--super-text)] text-white text-xs font-bold px-5 py-1.5 rounded-full border-2 border-[var(--super-text)] shadow-[2px_2px_0px_0px_var(--super-brown)] transform -rotate-2">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <span className={`text-xs font-bold ${plan.popular ? 'text-white/80' : 'text-[var(--super-text)]/60'}`}>
                  {plan.name}
                </span>
                <h3 className={`text-2xl font-black font-serif mt-1 mb-2 ${plan.popular ? 'text-white' : 'text-[var(--super-text)]'}`}>
                  {plan.label}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-serif font-black ${plan.popular ? 'text-white' : 'text-[var(--super-text)]'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm font-bold ${plan.popular ? 'text-white/70' : 'text-[var(--super-text)]/50'}`}>
                      원 / {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-2 font-medium ${plan.popular ? 'text-white/80' : 'text-[var(--super-text)]/60'}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className={`text-sm mt-0.5 ${plan.popular ? 'text-white' : 'text-[var(--super-orange)]'}`}>✓</span>
                    <span className={`text-sm font-medium ${plan.popular ? 'text-white/90' : 'text-[var(--super-text)]/80'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-bold text-sm transition-all border-2 ${
                  plan.popular
                    ? 'bg-white text-[var(--super-text)] border-white hover:bg-[var(--cream)] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]'
                    : 'bg-[var(--super-text)] text-white border-[var(--super-text)] hover:bg-[var(--super-orange)] hover:border-[var(--super-orange)] shadow-[3px_3px_0px_0px_var(--super-brown)]'
                } hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
