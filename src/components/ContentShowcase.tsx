'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const features = [
  { title: '프리미엄 2D/3D 학습 애니메이션', desc: '전문 애니메이터가 제작한 고퀄리티 영상으로 아이들의 몰입도를 극대화' },
  { title: '인터랙티브 터치 기반 학습', desc: '직접 만지고 움직이며 원리를 체험 — 수동적 시청이 아닌 능동적 참여' },
  { title: '학원 브랜딩 커스터마이징', desc: '학원 로고와 캐릭터 적용으로 "우리 학원만의 콘텐츠"라는 학부모 인식 형성' },
];

export default function ContentShowcase() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-[#2D3436] text-white relative overflow-hidden grain-overlay">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[35%] h-[50%] bg-[#8C9A8B]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Video area */}
          <div className="reveal-left md:w-1/2 w-full">
            <div className="aspect-video bg-[#1E2325] rounded-3xl border border-[#444]/50 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8C9A8B]/15 to-[#C4A265]/5" />
              {/* Play button */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all cursor-pointer">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="absolute bottom-4 left-4 text-xs text-white/40">학원 수업 적용 데모 영상</p>
            </div>
          </div>

          {/* Content */}
          <div className="reveal-right md:w-1/2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
              Premium Content
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
              아이들이 스스로<br />
              <span className="italic font-light text-[#E9E4DB]">&ldquo;또 하고 싶어요!&rdquo; 하는 콘텐츠</span>
            </h2>
            <p className="text-[#B2BEC3] font-light leading-relaxed mb-10 text-[15px]">
              지루한 학습지 대신, 아이가 직접 참여하는 프리미엄 인터랙티브 콘텐츠.
              수업의 몰입도가 달라지면, 학부모의 평가도 달라집니다.
            </p>

            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#8C9A8B]/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-[#8C9A8B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{f.title}</h4>
                    <p className="text-[#B2BEC3] text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
