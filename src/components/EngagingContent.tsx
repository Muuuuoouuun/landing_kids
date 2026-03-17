import React from 'react';

export default function EngagingContent() {
  return (
    <section className="py-24 bg-[#2D3436] px-6 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-16 items-center">
        <div className="md:w-1/2">
          <span className="text-[#8C9A8B] font-medium tracking-widest uppercase text-sm mb-4 block">
            Visual Storytelling
          </span>
          <h2 className="text-4xl font-serif text-white mb-8 leading-tight">
            아이의 눈을 사로잡는<br />
            <span className="italic font-light">프리미엄 학습 애니메이션</span>
          </h2>
          <p className="text-lg text-[#B2BEC3] leading-relaxed mb-8">
            지루한 강의식 수업 대신, 고퀄리티 애니메이션과 인터랙티브 요소로 수업의 몰입도를 극대화합니다. 
            원장님이 수업 중 이 자료를 실행하는 순간, 아이들의 눈이 반짝이는 변화를 경험하세요.
          </p>
        </div>
        
        <div className="md:w-1/2 w-full">
          <div className="aspect-video bg-[#1E2325] rounded-2xl border border-[#444] flex items-center justify-center p-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#8C9A8B]/20 to-transparent"></div>
             <p className="text-[#8C9A8B] font-serif text-lg italic text-center">
               [아이들이 화면에 푹 빠져드는<br />
               인터랙티브 학습 애니메이션 시연 영상]
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
