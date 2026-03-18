import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[var(--super-orange)] text-[var(--super-text)] px-6 lg:px-12 xl:px-20 pt-10 pb-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto border-t-2 border-[var(--super-text)]/20 pt-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand/Links */}
          <div className="flex-1">
            <div className="font-serif font-black text-2xl mb-4 text-white drop-shadow-[2px_2px_0_rgba(45,35,26,1)]">Little Minds.</div>
            <p className="font-medium text-[var(--super-text)]/80 max-w-xs mb-6">
              원장님의 교육 철학을 가장 완벽하게 담아내는 프리미엄 에듀테크.
            </p>
            <div className="flex gap-4 font-bold text-sm text-[var(--super-text)]">
              <a href="#" className="hover:text-white transition-colors">인스타그램</a>
              <a href="#" className="hover:text-white transition-colors">블로그</a>
              <a href="#" className="hover:text-white transition-colors">유튜브</a>
            </div>
          </div>

          {/* Nav */}
          <div className="flex gap-12 font-bold text-[var(--super-text)]">
            <div className="flex flex-col gap-3">
              <a href="#philosophy" className="hover:opacity-70 transition-opacity">교육 철학</a>
              <a href="#how-it-works" className="hover:opacity-70 transition-opacity">도입 과정</a>
              <a href="#results" className="hover:opacity-70 transition-opacity">도입 성과</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:opacity-70 transition-opacity">이용약관</a>
              <a href="#" className="hover:opacity-70 transition-opacity">개인정보방침</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Massive Bottom Text */}
      <div className="w-full text-center mt-10">
        <h1 className="font-serif font-black text-[#FF703B] text-[15vw] leading-none select-none tracking-tighter" style={{WebkitTextStroke: '2px rgba(255,255,255,0.2)'}}>
          littleminds
        </h1>
      </div>
      
      <div className="text-center mt-4">
        <span className="text-[var(--super-text)]/50 font-bold text-xs uppercase">&copy; 2026 Little Minds. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
