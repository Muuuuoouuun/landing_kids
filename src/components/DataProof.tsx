'use client';

import React from 'react';
import { useReveal } from '../hooks/useReveal';

const metrics = [
  {
    title: '학부모 재등록률',
    value: '94%',
    desc: '도입 학원 평균치',
    color: 'text-[var(--super-orange)]'
  },
  {
    title: '상담 시간 절감',
    value: '60%',
    desc: '리포트 자동화 효과',
    color: 'text-[var(--super-pink)]'
  },
  {
    title: '신규 원생 유입',
    value: '+35%',
    desc: '도입 6개월 후 입소문',
    color: 'text-[var(--super-brown)]'
  },
];

export default function DataProof() {
  const ref = useReveal();

  return (
    <section id="results" ref={ref} className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-white relative overflow-hidden flex flex-col items-center">
      
      {/* Handing over illustration placeholder */}
      <div className="relative w-full max-w-5xl mx-auto h-[500px] sm:h-[600px] flex items-center justify-center mb-10">
        
        {/* Abstract background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-[#E1EFF4] rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Faux Hand 1 (Left) */}
        <div className="absolute left-[-10%] sm:left-[5%] md:left-[10%] top-[60%] w-32 md:w-48 h-12 md:h-20 bg-[#D4A373] rounded-full transform rotate-[25deg] shadow-lg z-20" />
        
        {/* Faux Hand 2 (Right) */}
        <div className="absolute right-[-10%] sm:right-[5%] md:right-[10%] top-[40%] w-32 md:w-48 h-12 md:h-20 bg-[#FAEDCB] rounded-full transform -rotate-[25deg] shadow-lg z-0" />

        {/* Center Item (The 'Book' or 'Report') */}
        <div className="relative z-10 w-64 md:w-80 h-80 md:h-[400px] bg-[var(--cream)] border-4 border-[var(--super-text)] rounded-xl shadow-[12px_12px_0px_0px_var(--super-text)] transform -rotate-3 flex flex-col p-6 cursor-pointer hover:rotate-0 transition-transform duration-500">
           <div className="w-1/2 h-4 bg-[var(--super-brown)]/20 rounded-full mb-4"></div>
           <div className="w-3/4 h-8 bg-[var(--super-orange)]/20 rounded-full mb-8"></div>
           
           <h3 className="font-serif text-2xl md:text-3xl text-[var(--super-text)] font-black text-center mb-auto leading-tight mt-10">
             성장 데이터<br/>리포트
           </h3>

           {/* Floating badges around the book representing data */}
           <div className="absolute -left-12 top-10 w-24 h-24 bg-[var(--super-orange)] rounded-full border-[3px] border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center transform -rotate-12 animate-float">
             <span className="text-white font-bold text-xl">94%</span>
           </div>
           
           <div className="absolute -right-8 bottom-20 w-20 h-20 bg-[var(--super-blue)] rounded-xl border-[3px] border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] flex items-center justify-center transform rotate-12 animate-float delay-300">
             <span className="text-[var(--super-text)] font-bold text-lg">+35%</span>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-20">
        <h2 className="reveal font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-tight font-black mb-8">
          데이터가 증명하는<br />
          <span className="text-[var(--super-orange)]">명확한 변화</span>
        </h2>
        <p className="reveal text-[var(--warm-gray)] font-medium text-lg mb-16 max-w-xl mx-auto">
          도입 학원 150곳에서 확인된 수치입니다.<br />막연한 기대가 아닌 확실한 결과로 보답합니다.
        </p>

        {/* Text Metrics Below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full border-t-2 border-[var(--super-text)] pt-12">
          {metrics.map((m, i) => (
            <div key={i} className="reveal text-center" style={{transitionDelay: `${i*0.1}s`}}>
               <h4 className="text-[var(--super-text)] font-bold mb-2">{m.title}</h4>
               <div className={`font-serif text-4xl md:text-5xl font-black mb-2 ${m.color}`}>
                 {m.value}
               </div>
               <p className="text-sm text-[var(--warm-gray)] font-medium">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
