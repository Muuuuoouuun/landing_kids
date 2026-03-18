'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const reviews = [
  {
    quote: '솔직히 처음엔 또 하나의 학습 앱이겠거니 했어요. 그런데 학부모 리포트가 나가기 시작하니까 상담 분위기가 완전히 달라졌습니다. 데이터로 보여주니까 학부모님들이 먼저 "감사하다"고 하시더라고요.',
    name: '박지영 원장',
    role: '영어학원 · 원생 45명',
    badge: '도입 8개월',
  },
  {
    quote: '주변 학원이랑 뭐가 다르냐는 질문을 제일 많이 받았는데, 이제는 자신 있게 대답해요. "저희는 아이별 성장 데이터를 매주 드립니다." 이 한마디가 등록 전환율을 확 올렸어요.',
    name: '김수진 원장',
    role: '유아학원 · 원생 60명',
    badge: '도입 1년',
  },
  {
    quote: '가장 좋은 건 선생님들 업무가 줄었다는 거예요. 예전엔 학부모 보고서 만드느라 야근했는데, 이제 자동으로 나가니까 수업 준비에 더 집중할 수 있게 됐어요. 선생님들 만족도가 진짜 높아요.',
    name: '이현아 원장',
    role: '어학원 · 원생 80명',
    badge: '도입 6개월',
  },
];

export default function Testimonials() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 lg:px-12 xl:px-20 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="reveal text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium block mb-5">
            Director Stories
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl text-[#2D3436] leading-tight mb-6">
            먼저 도입하신<br />
            <span className="italic font-light">원장님들의 이야기</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="reveal bg-[#FDFBF7] rounded-3xl p-8 md:p-10 border border-[#E9E4DB]/60 flex flex-col justify-between hover:shadow-lg hover:shadow-[#8C9A8B]/5 transition-all duration-500"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Stars */}
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#C4A265]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#2D3436] leading-relaxed mb-8 text-[15px]">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#F2F0EC]">
                <div>
                  <p className="font-medium text-[#2D3436] text-sm">{r.name}</p>
                  <p className="text-[#636E72] text-xs mt-0.5">{r.role}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C9A8B] bg-[#F2F4F2] px-3 py-1.5 rounded-full">
                  {r.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
