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
    q: '선생님들이 사용하기 어렵지 않나요?',
    a: '도입 시 선생님 대상 1:1 교육을 진행하며, 이후에도 전담 매니저를 통해 언제든 지원받으실 수 있습니다. 직관적인 UI로 대부분 1주일 내 능숙하게 활용하십니다.',
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b-2 border-[var(--super-text)]/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <div className="flex items-center gap-4">
           {/* Funny little speech bubble icon placeholder */}
           <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isOpen ? 'bg-[var(--super-orange)] text-white' : 'bg-[#E5D4C4] text-[var(--super-text)]'}`}>
             Q
           </div>
           <span className="text-[var(--super-text)] font-bold text-lg md:text-xl pr-8 font-serif group-hover:text-[var(--super-orange)] transition-colors">
             {item.q}
           </span>
        </div>
        
        <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-[var(--super-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pl-12 flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[var(--super-blue)] flex items-center justify-center font-bold text-sm text-[var(--super-text)] flex-shrink-0">
              A
            </span>
            <p className="text-[var(--super-text)]/80 leading-relaxed font-medium">
              {item.a}
            </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[var(--cream)] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] text-xs font-bold rounded-full shadow-[2px_2px_0px_0px_var(--super-text)] mb-6">
            FAQ & Answers
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black">
            자주 묻는 질문
          </h2>
        </div>

        <div className="reveal bg-white rounded-2xl border-[3px] border-[var(--super-text)] p-6 md:p-10 shadow-[8px_8px_0px_0px_var(--super-text)]">
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
