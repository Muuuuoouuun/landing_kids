'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem, Parallax } from './motion';

const gallery = [
  { src: '/images/references/class-01.png', alt: '수업 현장 — 아이들이 태블릿으로 참여 중', span: 'col-span-2 row-span-2' },
  { src: '/images/references/class-02.png', alt: '퀴즈 대결 중 환호하는 아이들', span: 'col-span-1 row-span-1' },
  { src: '/images/references/class-03.png', alt: '선생님과 함께하는 인터랙티브 수업', span: 'col-span-1 row-span-1' },
  { src: '/images/references/report-01.png', alt: '학부모에게 발송되는 성장 리포트', span: 'col-span-1 row-span-1' },
  { src: '/images/references/class-04.png', alt: '발표하는 아이의 자신감 있는 모습', span: 'col-span-1 row-span-2' },
  { src: '/images/references/academy-01.png', alt: '도입 학원 외관', span: 'col-span-1 row-span-1' },
  { src: '/images/references/class-05.png', alt: '미션 클리어 후 기뻐하는 아이들', span: 'col-span-1 row-span-1' },
];

const logos = [
  { name: '키즈아카데미', location: '서울 강남' },
  { name: '리틀스타학원', location: '경기 분당' },
  { name: '해피러닝센터', location: '부산 해운대' },
  { name: '스마트키즈', location: '대전 유성' },
  { name: '꿈나무학원', location: '인천 송도' },
  { name: '브라이트에듀', location: '서울 마포' },
];

export default function References() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[var(--super-text)] relative overflow-hidden border-b-4 border-[var(--super-text)]">

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--super-orange)] text-white text-sm font-bold border-2 border-white/30 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] mb-8 transform -rotate-2">
              In Action
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-black leading-tight mb-6">
              실제 교실에서<br />
              <span className="text-[var(--super-orange)]">일어나는 변화</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-white/60 font-bold text-lg max-w-xl mx-auto">
              150개 학원, 12,000명의 아이들이 경험하고 있는 수업 현장입니다.
            </p>
          </FadeIn>
        </div>

        {/* Photo Grid — Masonry-style */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4 mb-20" stagger={0.08}>
          {gallery.map((photo, i) => (
            <StaggerItem key={i}>
              <div className={`${photo.span} relative overflow-hidden border-4 border-white/20 hover:border-[var(--super-orange)] transition-colors duration-300 group cursor-pointer`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--super-text)]/0 group-hover:bg-[var(--super-text)]/60 transition-colors duration-300 flex items-end p-4">
                  <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Academy Logos / Names */}
        <div className="border-t-2 border-white/10 pt-12">
          <FadeIn>
            <p className="text-center text-white/40 font-bold text-sm uppercase tracking-widest mb-10">
              도입 학원 일부
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.06}>
            {logos.map((logo, i) => (
              <StaggerItem key={i}>
                <div className="bg-white/5 border-2 border-white/10 hover:border-[var(--super-orange)]/50 transition-colors duration-300 p-5 text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 bg-white/10 border-2 border-white/20 rounded-lg flex items-center justify-center group-hover:bg-[var(--super-orange)]/20 transition-colors">
                    <span className="font-serif font-black text-white text-lg">{logo.name.charAt(0)}</span>
                  </div>
                  <p className="text-white font-bold text-sm">{logo.name}</p>
                  <p className="text-white/40 text-xs font-bold mt-1">{logo.location}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>

      <Parallax speed={0.3} className="absolute top-20 left-[3%] z-0 opacity-[0.05] pointer-events-none">
        <div className="w-40 h-40 border-4 border-white rounded-full" />
      </Parallax>
      <Parallax speed={-0.2} className="absolute bottom-16 right-[5%] z-0 opacity-[0.05] pointer-events-none">
        <div className="w-24 h-24 border-4 border-white rotate-45" />
      </Parallax>
    </section>
  );
}
