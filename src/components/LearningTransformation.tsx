import React from 'react';

export default function LearningTransformation() {
  return (
    <section className="py-24 bg-[#F8F7F4] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#2D3436] mb-4">데이터로 확인하는 학습의 변화</h2>
          <p className="text-slate-500 italic">학부모님들께서 가장 먼저 감동하는, 우리 학원만의 특별한 리포트</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: '학습 성취도', desc: '우리 아이가 무엇을 이해하고 무엇을 어려워하는지 매주 정밀하게 분석합니다.' },
            { title: '학습 습관 분석', desc: '아이의 학습 태도와 집중 시간을 수치화하여 상담의 질을 높입니다.' },
            { title: '성장 리포트', desc: '학부모님께 즉시 공유 가능한, 정성스럽고 전문적인 결과지를 제공합니다.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E9E4DB] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#F2F4F2] rounded-full flex items-center justify-center mb-6 text-[#8C9A8B] font-serif text-xl">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-[#2D3436] mb-4">{item.title}</h3>
              <p className="text-[#636E72] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
