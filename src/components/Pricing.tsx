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
    style: 'bg-white border-[#E9E4DB]/60',
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
    style: 'bg-[#2D3436] text-white border-[#2D3436]',
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
    style: 'bg-white border-[#E9E4DB]/60',
  },
];

export default function Pricing() {
  const ref = useReveal();

  return (
    <section id="pricing" ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            Pricing
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            학원 규모에 맞는<br />
            <span className="italic font-light">합리적인 요금제</span>
          </h2>
          <p className="reveal text-[#636E72] font-light text-lg max-w-lg mx-auto">
            원생 수 무제한. 추가 비용 없이 모든 기능을 이용하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal rounded-3xl border p-8 md:p-10 flex flex-col relative ${plan.style} transition-all duration-500 hover:shadow-xl`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C4A265] text-white text-[11px] uppercase tracking-wider font-medium px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <span className={`text-xs uppercase tracking-wider font-medium ${plan.popular ? 'text-[#C4A265]' : 'text-[#8C9A8B]'}`}>
                  {plan.name}
                </span>
                <h3 className={`text-lg font-semibold mt-1 mb-2 ${plan.popular ? 'text-white' : 'text-[#2D3436]'}`}>
                  {plan.label}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-serif font-semibold ${plan.popular ? 'text-white' : 'text-[#2D3436]'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.popular ? 'text-[#B2BEC3]' : 'text-[#636E72]'}`}>
                      원 / {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-2 ${plan.popular ? 'text-[#B2BEC3]' : 'text-[#636E72]'}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[#8C9A8B]' : 'text-[#8C9A8B]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className={`text-sm ${plan.popular ? 'text-[#DFE6E9]' : 'text-[#636E72]'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-medium text-sm transition-all ${
                  plan.popular
                    ? 'bg-white text-[#2D3436] hover:bg-[#F8F7F4]'
                    : 'bg-[#8C9A8B] text-white hover:bg-[#7a887a]'
                }`}
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
