'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

export default function FinalCTA() {
  const ref = useReveal();

  return (
    <section id="final-cta" ref={ref} className="py-28 md:py-40 px-6 lg:px-12 xl:px-20 bg-[#2D3436] text-white relative overflow-hidden grain-overlay">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[60%] bg-[#8C9A8B]/6 rounded-full blur-[180px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[40%] h-[50%] bg-[#C4A265]/4 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="reveal mb-8">
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#8C9A8B] font-medium border border-[#636E72] rounded-full px-5 py-2">
            Start Today
          </span>
        </div>

        <h2 className="reveal font-serif text-3xl sm:text-4xl md:text-6xl text-white leading-[1.3] mb-8">
          학부모가 먼저 찾는 학원,<br />
          <span className="italic font-light text-[#C4A265]">지금 시작하세요</span>
        </h2>

        <p className="reveal text-lg text-[#B2BEC3] font-light leading-relaxed max-w-xl mx-auto mb-12">
          무료 상담으로 우리 학원에 맞는 도입 방안을 확인하세요.<br />
          전담 매니저가 학원 분석부터 세팅까지 함께합니다.
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group bg-white text-[#2D3436] px-12 py-4 rounded-full font-semibold hover:bg-[#F8F7F4] transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5">
            무료 도입 상담 신청
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
          <button className="border border-[#636E72] text-[#B2BEC3] px-12 py-4 rounded-full font-medium hover:bg-white/5 hover:text-white hover:border-[#8C9A8B] transition-all">
            도입 사례 더 보기
          </button>
        </div>

        {/* Trust badges */}
        <div className="reveal flex flex-wrap items-center justify-center gap-6 text-[#636E72] text-xs">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            개인정보 보호 인증
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            150+ 학원 도입
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
            위약금 없는 해지
          </span>
        </div>
      </div>
    </section>
  );
}
