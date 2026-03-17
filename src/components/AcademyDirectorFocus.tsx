import React from 'react';

export default function AcademyDirectorFocus() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-serif text-[#2D3436] mb-8 leading-tight">
            원장님의 교육 철학을<br />
            <span className="italic font-light">디지털로 완성하는 프리미엄 솔루션</span>
          </h2>
          <p className="text-lg text-[#636E72] leading-relaxed mb-8">
            단순한 학습 콘텐츠를 넘어, 학원의 커리큘럼을 더 가치 있게 만듭니다.<br />
            선생님의 효율적인 수업 운영과 학부모의 깊은 신뢰를 동시에 잡는<br />
            가장 스마트한 파트너가 되어드리겠습니다.
          </p>
          <ul className="space-y-4">
            {['학습 데이터 기반의 수준별 맞춤 커리큘럼', '학부모 상담 시간을 단축하는 리포트 기능', '차별화된 브랜드 경험 제공'].map((item) => (
              <li key={item} className="flex items-center text-[#2D3436] font-medium">
                <span className="w-2 h-2 bg-[#8C9A8B] rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#FDFBF7] h-[400px] rounded-2xl border border-[#E9E4DB] flex items-center justify-center p-8">
          <p className="text-[#8C9A8B] font-serif text-xl italic">
            [학원의 성장이 데이터로 증명되는<br />대시보드 미리보기 이미지]
          </p>
        </div>
      </div>
    </section>
  );
}
