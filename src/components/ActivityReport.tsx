'use client';

import React from 'react';
import { FadeIn, Float, Tilt3D, Parallax } from './motion';

const highlights = [
  { icon: '⏱️', label: '실시간', text: '수업 끝나면 바로 알림' },
  { icon: '📸', label: '사진', text: '활동하는 우리 아이 모습' },
  { icon: '💬', label: '한 줄', text: '선생님이 직접 남긴 코멘트' },
];

export default function ActivityReport() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative border-b-4 border-[var(--super-text)] overflow-hidden bg-[var(--super-blue)]">
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div>
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--super-orange)] text-white border-4 border-[var(--super-text)] text-sm font-bold shadow-[4px_4px_0px_0px_var(--super-text)] mb-8 transform -rotate-2">
              Activity Report
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] leading-[1.1] font-black mb-6">
              수업이 끝나면,<br />
              <span className="text-white bg-[var(--super-orange)] px-3 inline-block -rotate-1 shadow-[4px_4px_0px_0px_var(--super-text)] leading-[1.3]">
                부모님 폰으로
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[var(--super-text)] font-bold text-xl leading-relaxed border-l-4 border-[var(--super-text)] pl-6 mb-10">
              오늘 우리 아이가 뭘 했는지. 사진 한 장, 선생님 한 줄, 그리고 작은 성장 그래프로.
              <br />
              궁금해하지 않아도 먼저 알려드립니다.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="space-y-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-4 bg-white border-4 border-[var(--super-text)] p-4 shadow-[6px_6px_0px_0px_var(--super-text)] hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 shrink-0 bg-[var(--gold-light)] border-4 border-[var(--super-text)] flex items-center justify-center text-2xl transform -rotate-6">
                    {h.icon}
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-[var(--super-text)] text-white text-xs font-bold mb-1 uppercase">
                      {h.label}
                    </span>
                    <p className="font-black text-[var(--super-text)]">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right — phone mockup */}
        <FadeIn direction="right" delay={0.25} className="flex justify-center">
          <Tilt3D intensity={6} className="relative">
            <Float duration={6} distance={8}>
              {/* Phone frame */}
              <div className="relative w-[300px] sm:w-[340px] bg-[var(--super-text)] border-4 border-[var(--super-text)] rounded-[2.5rem] p-3 shadow-[14px_14px_0px_0px_var(--super-text)] transform rotate-2">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[var(--super-text)] rounded-b-2xl z-20" />
                {/* Screen */}
                <div className="bg-[#FDFBF7] rounded-[2rem] overflow-hidden border-2 border-[var(--super-text)]">
                  {/* App header */}
                  <div className="bg-[var(--super-orange)] px-5 pt-8 pb-4 border-b-4 border-[var(--super-text)]">
                    <p className="text-white/90 text-xs font-bold uppercase tracking-wider">오늘의 활동 리포트</p>
                    <div className="flex items-center justify-between mt-1">
                      <h3 className="text-white font-black font-serif text-2xl">민준이 🦊</h3>
                      <span className="bg-white border-2 border-[var(--super-text)] text-[var(--super-text)] text-xs font-bold px-2 py-1 rounded-full">
                        6세
                      </span>
                    </div>
                    <p className="text-white/90 text-xs font-bold mt-1">2026.06.15 · 오후 4:30 수업</p>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Photo placeholder */}
                    <div className="relative h-36 bg-[var(--super-pink)] border-4 border-[var(--super-text)] rounded-2xl shadow-[4px_4px_0px_0px_var(--super-text)] flex flex-col items-center justify-center">
                      <span className="text-4xl mb-1">📸</span>
                      <span className="text-[var(--super-text)] font-black text-sm">오늘의 활동 사진</span>
                      <span className="absolute top-2 right-2 bg-white border-2 border-[var(--super-text)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    </div>

                    {/* Today's activity */}
                    <div className="bg-white border-4 border-[var(--super-text)] rounded-2xl p-3 shadow-[4px_4px_0px_0px_var(--super-text)]">
                      <p className="text-[10px] font-bold uppercase text-[var(--super-text)]/60 mb-1">오늘 한 활동</p>
                      <p className="font-black text-[var(--super-text)] text-sm leading-snug">
                        🎨 색깔 알파벳 놀이 · 🔤 파닉스 A~E
                      </p>
                    </div>

                    {/* Teacher feedback */}
                    <div className="bg-[var(--super-blue)] border-4 border-[var(--super-text)] rounded-2xl p-3 shadow-[4px_4px_0px_0px_var(--super-text)]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-[var(--gold-light)] border-2 border-[var(--super-text)] flex items-center justify-center text-xs">
                          👩‍🏫
                        </div>
                        <p className="text-[10px] font-bold uppercase text-[var(--super-text)]/70">담임 선생님 한 줄</p>
                      </div>
                      <p className="font-bold text-[var(--super-text)] text-sm leading-snug">
                        &ldquo;오늘 A 소리를 제일 먼저 맞혔어요! 자신감이 부쩍 늘었어요 👏&rdquo;
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="bg-white border-4 border-[var(--super-text)] rounded-2xl p-3 shadow-[4px_4px_0px_0px_var(--super-text)]">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold uppercase text-[var(--super-text)]/60">이번 주 진도</p>
                        <p className="font-black text-[var(--super-orange)] text-sm">80%</p>
                      </div>
                      <div className="h-4 bg-[var(--cream)] border-2 border-[var(--super-text)] rounded-full overflow-hidden">
                        <div className="h-full w-[80%] bg-[var(--super-orange)] border-r-2 border-[var(--super-text)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Float>

            {/* Decorative floater */}
            <Float className="absolute -top-6 -left-8 z-30" duration={5} distance={10} delay={0.5}>
              <div className="w-16 h-16 bg-[var(--gold-light)] border-4 border-[var(--super-text)] rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_var(--super-text)]">
                💛
              </div>
            </Float>
          </Tilt3D>
        </FadeIn>
      </div>

      <Parallax speed={0.3} className="absolute -bottom-8 left-[4%] z-0 opacity-10 pointer-events-none">
        <div className="w-32 h-32 border-4 border-[var(--super-text)] rounded-full" />
      </Parallax>
    </section>
  );
}
