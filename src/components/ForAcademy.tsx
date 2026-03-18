'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const benefits = [
  {
    num: '01',
    title: '데이터 기반 맞춤 커리큘럼',
    desc: '아이별 학습 데이터를 바탕으로 수준별 맞춤 커리큘럼을 자동 생성. 선생님의 수업 준비 시간을 획기적으로 줄여드립니다.',
  },
  {
    num: '02',
    title: '학부모 리포트 자동화',
    desc: '상담 전 학부모에게 자동 발송되는 전문적인 리포트. 상담 시간은 줄이고, 신뢰도는 높입니다.',
  },
  {
    num: '03',
    title: '브랜드 차별화',
    desc: '"그 학원은 다르더라"는 학부모들의 입소문. 프리미엄 에듀테크 도입은 학원의 브랜드 가치를 높입니다.',
  },
];

export default function ForAcademy() {
  const ref = useReveal();

  return (
    <section id="for-academy" ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-white relative overflow-hidden">
      {/* Accent shape */}
      <div className="absolute top-0 right-0 w-[45%] h-[50%] bg-[#F8F7F4] rounded-bl-[160px] -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Left — dashboard preview */}
          <div className="reveal-left md:w-1/2 w-full">
            <div className="bg-[#F8F7F4] rounded-3xl border border-[#E9E4DB] p-8 md:p-10">
              {/* Mock dashboard */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#E9E4DB]" />
                <div className="w-3 h-3 rounded-full bg-[#E9E4DB]" />
                <div className="w-3 h-3 rounded-full bg-[#E9E4DB]" />
                <div className="flex-1 h-6 bg-[#E9E4DB]/60 rounded-full ml-4" />
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 h-32 bg-white rounded-2xl border border-[#E9E4DB]/60 p-4">
                    <div className="w-8 h-2 bg-[#8C9A8B]/30 rounded mb-3" />
                    <div className="w-16 h-6 bg-[#8C9A8B]/20 rounded mb-2" />
                    <div className="w-full h-12 bg-gradient-to-r from-[#8C9A8B]/10 to-[#8C9A8B]/5 rounded-lg" />
                  </div>
                  <div className="flex-1 h-32 bg-white rounded-2xl border border-[#E9E4DB]/60 p-4">
                    <div className="w-8 h-2 bg-[#C4A265]/30 rounded mb-3" />
                    <div className="w-16 h-6 bg-[#C4A265]/20 rounded mb-2" />
                    <div className="flex gap-1 mt-2">
                      {[60, 80, 45, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#C4A265]/15 rounded-sm" style={{ height: `${h * 0.4}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="h-24 bg-white rounded-2xl border border-[#E9E4DB]/60 p-4 flex items-center gap-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex items-center gap-2 flex-1">
                      <div className="w-8 h-8 rounded-full bg-[#F2F0EC]" />
                      <div className="flex-1">
                        <div className="w-16 h-2 bg-[#E9E4DB] rounded mb-1.5" />
                        <div className="w-full h-1.5 bg-[#F2F0EC] rounded-full">
                          <div className="h-full bg-[#8C9A8B]/40 rounded-full" style={{ width: `${n * 30}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div className="reveal-right md:w-1/2">
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#C4A265] font-medium bg-[#C4A265]/10 px-4 py-1.5 rounded-full mb-5">
              For Academy Directors
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D3436] leading-tight mb-6">
              원장님의 교육 철학을<br />
              <span className="italic font-light">디지털로 완성하는 솔루션</span>
            </h2>
            <p className="text-[#636E72] font-light leading-relaxed mb-10 text-[15px]">
              단순한 학습 콘텐츠를 넘어, 학원의 커리큘럼을 더 가치 있게 만듭니다.
              선생님의 효율적인 수업 운영과 학부모의 깊은 신뢰를 동시에 잡으세요.
            </p>

            <div className="space-y-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-2xl font-serif font-light text-[#E9E4DB] flex-shrink-0 mt-0.5">{b.num}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2D3436] mb-1.5">{b.title}</h3>
                    <p className="text-[#636E72] text-[15px] leading-relaxed">{b.desc}</p>
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
