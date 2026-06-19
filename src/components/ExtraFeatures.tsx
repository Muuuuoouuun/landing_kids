'use client';

import React from 'react';
import Image from 'next/image';
import { StaggerContainer, StaggerItem, FadeIn } from './motion';

const features = [
  { img: '/images/doodles/backpack.png', title: '모든 원생 학습 관리', w: 50, h: 50 },
  { img: '/images/doodles/paper.png', title: '클릭 한 번 리포트 출력', w: 40, h: 45 },
  { img: '/images/doodles/tape.png', title: '언제든 유연한 스케줄', w: 55, h: 40 },
  { img: '/images/doodles/tools.png', title: '학원만의 맞춤 설정', w: 45, h: 50 },
  { img: '/images/doodles/checkbox.png', title: '다양한 평가 도구 지원', w: 45, h: 45 },
  { img: '/images/doodles/books.png', title: '무제한 프리미엄 콘텐츠', w: 60, h: 45 },
  { img: '/images/doodles/sparkles.png', title: '반 편성도 마법처럼', w: 45, h: 45 },
  { img: '/images/doodles/library.png', title: '방대한 디지털 교재함', w: 65, h: 40 },
];

export default function ExtraFeatures() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAF8] relative overflow-hidden border-b-4 border-[var(--super-text)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8 items-center text-center" stagger={0.08}>

          {features.slice(0, 4).map((f, i) => (
            <StaggerItem key={i}>
              <div className="flex flex-col items-center justify-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                <Image src={f.img} alt={f.title} width={f.w} height={f.h} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                <p className="font-bold text-sm text-[var(--super-text)]">{f.title}</p>
              </div>
            </StaggerItem>
          ))}

          {/* CENTER TEXT */}
          <FadeIn>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-[var(--super-orange)] font-bold text-lg -rotate-2 mb-2 bg-white px-2 py-1 border-2 border-[var(--super-orange)]/30 rounded shadow-sm">더 많은 기능!</span>
              <h3 className="font-serif text-3xl font-black text-[var(--super-text)] leading-tight">원장님을 위한<br/>든든한 지원군</h3>
            </div>
          </FadeIn>

          {features.slice(4).map((f, i) => (
            <StaggerItem key={i + 4}>
              <div className="flex flex-col items-center justify-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                <Image src={f.img} alt={f.title} width={f.w} height={f.h} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                <p className="font-bold text-sm text-[var(--super-text)]">{f.title}</p>
              </div>
            </StaggerItem>
          ))}

        </StaggerContainer>
      </div>
    </section>
  );
}
