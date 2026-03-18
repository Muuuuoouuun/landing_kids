'use client';

import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const faqs = [
  {
    q: '도입 절차는 어떻게 되나요?',
    a: '무료 상담 신청 → 학원 분석 → 맞춤 커리큘럼 세팅 → 선생님 교육 → 수업 적용의 순서로 진행됩니다. 전담 매니저가 전 과정을 함께하며, 세팅까지 약 1~2주 소요됩니다.',
  },
  {
    q: '기존 커리큘럼과 병행할 수 있나요?',
    a: '네, 기존 수업 커리큘럼을 대체하는 것이 아니라 보완하는 구조입니다. 원장님의 교육 방향에 맞춰 콘텐츠를 조정할 수 있으며, 수업 시간 내 15~20분 활용이 가장 효과적입니다.',
  },
  {
    q: '학부모 리포트는 어떻게 발송되나요?',
    a: '주간/월간 학습 리포트가 학부모 앱 또는 카카오톡으로 자동 발송됩니다. 아이별 성취도, 집중 패턴, 강약점 분석이 포함되며, 학원 로고와 브랜딩이 적용됩니다.',
  },
  {
    q: '원생 수에 제한이 있나요?',
    a: 'Academy 플랜은 원생 수 무제한입니다. 학원 규모에 관계없이 동일한 프리미엄 서비스를 제공하며, 원생 수가 늘어도 추가 비용이 발생하지 않습니다.',
  },
  {
    q: '선생님들이 사용하기 어렵지 않나요?',
    a: '도입 시 선생님 대상 1:1 교육을 진행하며, 이후에도 전담 매니저를 통해 언제든 지원받으실 수 있습니다. 대부분의 선생님들이 1주일 내에 능숙하게 활용하십니다.',
  },
  {
    q: '계약 기간과 해지 조건은 어떻게 되나요?',
    a: '최소 계약 기간은 3개월이며, 이후 월 단위로 자동 연장됩니다. 위약금 없이 언제든 해지 가능하며, 해지 요청 후 당월 말까지 이용하실 수 있습니다.',
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#E9E4DB] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-[#2D3436] font-medium pr-8 group-hover:text-[#8C9A8B] transition-colors">
          {item.q}
        </span>
        <span className={`w-8 h-8 rounded-full border border-[#E9E4DB] flex-shrink-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#8C9A8B] border-[#8C9A8B] rotate-45' : 'group-hover:border-[#8C9A8B]'}`}>
          <svg className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-[#636E72]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-[#636E72] leading-relaxed text-[15px] pr-12">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-[#FDFBF7] relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            FAQ
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            원장님들이 가장 많이<br />
            <span className="italic font-light">물어보시는 질문</span>
          </h2>
        </div>

        <div className="reveal">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              item={faq}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
