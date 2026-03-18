'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 xl:px-20 overflow-hidden bg-[var(--cream)]">
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pt-20">
        {/* Left Content */}
        <div className="flex flex-col items-start space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--super-brown)]/20 text-[var(--super-orange)] text-sm font-semibold tracking-wide uppercase bg-[var(--super-orange)]/10 animate-fade-in-up">
            Premium EdTech
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-[var(--super-text)] leading-[1.1] tracking-tight animate-fade-in-up delay-100">
            학부모가<br />
            먼저 알아보는<br />
            <span className="text-[var(--super-brown)]">우리 학원</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--warm-gray)] max-w-md font-light leading-relaxed animate-fade-in-up delay-200">
            똑같은 교재, 비슷한 커리큘럼 속에서 고민하시는 원장님께 학부모 신뢰와 학원 브랜드를 동시에 높이는 프리미엄 에듀테크를 소개합니다.
          </p>
          
          <div className="flex items-center gap-4 animate-fade-in-up delay-300">
            <a
              href="#final-cta"
              className="inline-flex items-center justify-center bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] px-8 py-4 rounded-full font-bold hover:bg-[var(--super-text)] hover:text-white transition-all shadow-[4px_4px_0px_0px_var(--super-text)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              무료 도입 상담 &rarr;
            </a>
          </div>
        </div>

        {/* Right Content - Visual Book */}
        <div className="relative h-[500px] w-full flex items-center justify-center animate-fade-in delay-400">
          {/* Faux Book Object */}
          <div className="relative w-[300px] h-[400px] md:w-[380px] md:h-[480px] bg-[var(--super-brown)] rounded-r-3xl rounded-l-md shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-700 ease-out cursor-pointer group">
            
            {/* Spine detail */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/10 rounded-l-md" />
            
            {/* White label on book */}
            <div className="absolute top-12 right-10 w-40 h-24 bg-white rounded-lg shadow-inner flex flex-col items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
              <span className="font-serif text-2xl text-[var(--super-text)]">Premium</span>
              <span className="text-sm text-[var(--warm-gray)]">EdTech Solution</span>
            </div>

            {/* Little sticker / accent */}
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-[var(--super-orange)] rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
              <span className="text-white font-bold text-xl">✨</span>
            </div>
            
            {/* Pencil floating */}
            <div className="absolute -right-12 top-1/3 w-6 h-48 bg-[#F2CC8F] rounded-full shadow-lg transform rotate-[20deg] flex flex-col items-center">
               <div className="w-full h-8 bg-pink-300 rounded-t-full" /> {/* eraser */}
               <div className="w-full h-2 bg-gray-300" /> {/* metal */}
               <div className="flex-1" />
               <div className="w-full h-10 bg-[#E5D4C4] style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}" /> {/* tip */}
               <div className="absolute bottom-0 w-2 h-2 bg-black rounded-full" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
