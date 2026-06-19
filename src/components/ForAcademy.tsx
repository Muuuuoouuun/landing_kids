'use client';

import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem, Parallax, CountUp } from './motion';

const benefits = [
  {
    num: '01',
    icon: '✨',
    tag: '차별화',
    title: '"그 학원은 다르더라"',
    desc: '프리미엄 에듀테크 수업과 학부모 리포트는 옆 학원이 못 따라오는 무기입니다. 등록 상담에서 보여주는 것만으로 차이가 납니다.',
    color: 'bg-[var(--gold-light)]',
  },
  {
    num: '02',
    icon: '📈',
    tag: '재원율',
    title: '나가던 아이가 남습니다',
    desc: '아이는 "또 가고 싶다", 부모는 매주 성장을 눈으로 확인. 만족이 쌓이면 퇴원이 줄고, 입소문으로 신규가 들어옵니다.',
    color: 'bg-white',
  },
  {
    num: '03',
    icon: '⚙️',
    tag: '운영 편의',
    title: '선생님 일이 줄어듭니다',
    desc: '수업 준비·채점·학부모 리포트가 자동화. 상담 자료가 알아서 만들어지니, 선생님은 아이에게 더 집중할 수 있습니다.',
    color: 'bg-[var(--super-blue)]',
  },
];

const stats = [
  { value: 93, suffix: '%', label: '재원 유지율' },
  { value: 150, suffix: '+', label: '도입 학원' },
  { value: 4, suffix: '시간', label: '주당 절감 업무' },
];

export default function ForAcademy() {
  return (
    <section
      id="for-academy"
      className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative border-b-4 border-[var(--super-text)] overflow-hidden bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--super-text)] text-white border-4 border-[var(--super-text)] text-sm font-bold shadow-[4px_4px_0px_0px_var(--super-orange)] mb-8 transform -rotate-2">
              For Academy Owners
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-[1.1] font-black mb-5">
              원장님께 남는 건,<br />
              <span className="text-[var(--super-orange)]">결국 숫자입니다.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-[var(--super-text)]/80 font-bold text-lg max-w-2xl mx-auto">
              학부모가 먼저 찾는 학원을 만듭니다. 차별화로 끌어오고, 재원율로 지키고, 운영 편의로 남깁니다.
            </p>
          </FadeIn>
        </div>

        {/* Stats strip */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-white border-4 border-[var(--super-text)] p-8 text-center shadow-[8px_8px_0px_0px_var(--super-text)] ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              >
                <CountUp
                  target={s.value}
                  suffix={s.suffix}
                  className="font-serif text-5xl md:text-6xl font-black text-[var(--super-orange)] block"
                />
                <p className="font-black text-[var(--super-text)] mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Benefit cards */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8" stagger={0.15}>
          {benefits.map((b) => (
            <StaggerItem key={b.num}>
              <div
                className={`${b.color} border-4 border-[var(--super-text)] p-8 h-full shadow-[8px_8px_0px_0px_var(--super-text)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--super-text)] transition-transform duration-300`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center text-3xl transform -rotate-6">
                    {b.icon}
                  </div>
                  <span className="font-serif text-4xl font-black text-[var(--super-text)]/20">{b.num}</span>
                </div>
                <div className="inline-block px-2 py-1 bg-[var(--super-text)] text-white text-xs font-bold mb-3 uppercase tracking-wider">
                  {b.tag}
                </div>
                <h3 className="text-2xl font-black font-serif text-[var(--super-text)] mb-3 leading-tight">{b.title}</h3>
                <p className="text-[var(--super-text)]/80 font-bold leading-relaxed">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Parallax speed={0.3} className="absolute top-20 right-[3%] z-0 opacity-10 pointer-events-none">
        <div className="w-32 h-32 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
