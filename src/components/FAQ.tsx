'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, ScaleIn } from './motion';

const faqs = [
  {
    q: '스크린타임이 걱정돼요.',
    a: '솔직히 말씀드립니다. "오래 보는 화면"이 아니라 "수업 중 15~20분, 선생님과 함께 보는 화면"입니다. 유아는 더 짧은 세션으로 설계했고, 끝나면 손으로 하는 오프라인 활동으로 자연스럽게 넘어갑니다. 무한 스크롤·자동재생·외부 영상이 없어, 집에서 혼자 보는 영상과는 완전히 다릅니다.',
  },
  {
    q: '안전한가요? 개인정보는 괜찮나요?',
    a: '외부 광고 0%, 외부 링크 0%입니다. 아이가 엉뚱한 곳으로 빠져나갈 화면 자체가 없습니다. 개인정보는 COPPA·GDPR-K 국제 아동보호 기준을 준수하며, 학습 데이터는 오직 교육 분석에만 쓰고 제3자에게 판매하지 않습니다. 활동 사진은 학부모 동의 후에만 발송됩니다.',
  },
  {
    q: '아이가 너무 어린데 괜찮을까요?',
    a: '네, 만 5세부터 안전하게 시작할 수 있습니다. 유아교육학자·발달심리학자 자문단이 연령별로 콘텐츠를 검증했고, 글을 못 읽어도 그림·소리·터치만으로 따라올 수 있게 설계했습니다. 어린 친구일수록 더 짧고, 더 쉽고, 더 안전하게 — 발달 단계에 맞춰 난이도가 자동 조절됩니다.',
  },
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
    <div className="border-b-4 border-[var(--super-text)] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full border-4 border-[var(--super-text)] flex items-center justify-center font-bold text-sm transition-colors duration-300 ${isOpen ? 'bg-[var(--super-orange)] text-white' : 'bg-[#E5D4C4] text-[var(--super-text)]'}`}>
            Q
          </div>
          <span className="text-[var(--super-text)] font-black text-xl md:text-2xl pr-8 font-serif group-hover:text-[var(--super-orange)] transition-colors">
            {item.q}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-10 h-10 flex-shrink-0 flex items-center justify-center border-4 border-[var(--super-text)] rounded-full transition-colors duration-300 ${isOpen ? 'bg-[var(--super-text)] text-white' : 'bg-white text-[var(--super-text)]'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-14 pb-8 flex items-start gap-4">
              <span className="w-10 h-10 rounded-full border-4 border-[var(--super-text)] bg-[var(--super-blue)] flex items-center justify-center font-bold text-sm text-[var(--super-text)] flex-shrink-0 transform rotate-6">
                A
              </span>
              <p className="text-[var(--super-text)]/90 leading-relaxed font-bold text-lg pt-1">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative border-b-4 border-[var(--super-text)] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg/faq-bg.png" alt="" fill className="object-cover opacity-15" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--super-blue)] border-4 border-[var(--super-text)] text-[var(--super-text)] text-sm font-bold shadow-[4px_4px_0px_0px_var(--super-text)] mb-8 transform -rotate-2">
              FAQ &amp; Answers
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black">
              자주 묻는 질문
            </h2>
          </FadeIn>
        </div>

        <ScaleIn>
          <div className="bg-white rounded-[2rem] border-4 border-[var(--super-text)] p-6 md:p-10 shadow-[12px_12px_0px_0px_var(--super-text)]">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                item={faq}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
