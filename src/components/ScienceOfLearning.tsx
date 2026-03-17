import React from 'react';

export default function ScienceOfLearning() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <span className="text-[#8C9A8B] font-medium tracking-widest uppercase text-sm mb-4 block">
              Pedagogical Excellence
            </span>
            <h2 className="text-4xl font-serif text-[#2D3436] mb-8 leading-tight">
              단순한 디지털 놀이가 아닌<br />
              <span className="italic font-light">뇌과학적 학습 설계</span>
            </h2>
            <p className="text-lg text-[#636E72] leading-relaxed mb-8">
              아이들의 두뇌 발달 단계에 맞춘 체계적인 커리큘럼입니다. 
              단순한 암기가 아닌, 아이 스스로 원리를 깨닫고 
              지식을 확장해 나가는 '능동적 학습 구조'를 설계했습니다.
            </p>
          </div>
          
          <div className="md:w-1/2 grid gap-6">
            {[
              { label: 'Neuro-Development', title: '두뇌 발달 기반', text: '연령별 인지 능력에 맞춘 최적화된 자극으로 학습 효율 극대화' },
              { label: 'Active Inquiry', title: '능동적 탐구 학습', text: '질문을 던지고 스스로 해결하며 창의적 사고를 기르는 구조' },
              { label: 'Progressive Flow', title: '점진적 성취 모델', text: '적절한 도전 과제로 몰입감을 높여 학습의 성취감을 일상화' }
            ].map((pillar, i) => (
              <div key={i} className="border-l-2 border-[#E9E4DB] pl-6 hover:border-[#8C9A8B] transition-colors">
                <span className="text-[#8C9A8B] text-xs font-bold tracking-wider">{pillar.label}</span>
                <h4 className="text-lg font-semibold text-[#2D3436] mt-1 mb-2">{pillar.title}</h4>
                <p className="text-sm text-[#636E72]">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
