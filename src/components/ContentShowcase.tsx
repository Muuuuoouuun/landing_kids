'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const features = [
  { 
    title: '프리미엄 2D/3D 애니메이션', 
    desc: '전문 애니메이터가 제작한 고퀄리티 영상으로 몰입도 극대화',
    bgColor: 'bg-[#B4E4D3]',
    illustration: (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="w-16 h-16 bg-[#FF5A1F] rounded-2xl transform rotate-12 flex items-center justify-center shadow-md">
           <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
      </div>
    )
  },
  { 
    title: '인터랙티브 터치 학습', 
    desc: '직접 만지고 움직이며 원리를 체험하는 능동적 참여',
    bgColor: 'bg-[#FFD1DC]',
    illustration: (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="w-16 h-16 bg-[#9E7453] rounded-full transform -rotate-12 flex items-center justify-center shadow-md">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.546l-1.59-1.59" />
          </svg>
        </div>
      </div>
    )
  },
  { 
    title: '학원 커스터마이징', 
    desc: '원장님 학원만의 특별한 브랜드 콘텐츠 프레임 제공',
    bgColor: 'bg-[#CDE4F7]',
    illustration: (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="w-16 h-16 bg-[#E5A344] rounded-lg transform rotate-6 flex items-center justify-center shadow-md">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M15.17 11.42L21 5.58A2.652 2.652 0 0017.25 1.83l-5.83 5.83m-3.75 3.75l-5.83 5.83A2.652 2.652 0 005.58 21l5.83-5.83m-3.75-3.75l-5.83-5.83A2.652 2.652 0 005.58 1.83l5.83 5.83" />
          </svg>
        </div>
      </div>
    )
  },
];

export default function ContentShowcase() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-white relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* Playful Header */}
        <div className="text-center mb-16 relative">
             <span className="inline-block px-4 py-2 bg-[var(--super-orange)] text-white text-sm font-bold rounded-full shadow-lg transform -rotate-3 mb-6 relative z-10">
               Premium Content!
               <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[var(--super-orange)] transform rotate-45"></div>
             </span>
          <h2 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-4">
            아이들이 스스로<br />
            <span className="text-[var(--super-orange)]">&ldquo;또 하고 싶어요!&rdquo;</span><br />
            하는 콘텐츠
          </h2>
          <p className="reveal text-[var(--warm-gray)] font-medium text-lg">
            지루한 학습지 대신, 직접 참여하는 즐거움.
          </p>
        </div>

        {/* 3-Panel Comic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="reveal flex flex-col items-center w-full"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Illustration Block */}
              <div className={`w-full ${f.bgColor} rounded-xl border-[3px] border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] mb-6 overflow-hidden relative group cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--super-text)] transition-all`}>
                  {/* Decorative dashed line inside */}
                  <div className="absolute inset-2 border-2 border-dashed border-[var(--super-text)]/20 rounded-lg pointer-events-none"></div>
                  {f.illustration}
              </div>
              
              {/* Text Block */}
              <div className="text-center px-2">
                <h3 className="font-serif font-bold text-xl text-[var(--super-text)] mb-2 inline-block relative">
                   {f.title}
                   {/* highlight stroke */}
                   <span className="absolute bottom-1 left-0 w-full h-2 bg-[var(--gold-light)]/40 -z-10 transform -rotate-1"></span>
                </h3>
                <p className="text-[var(--warm-gray)] font-medium leading-relaxed mt-2">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
