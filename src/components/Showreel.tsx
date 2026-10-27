'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FadeIn, ScaleIn } from './motion';

const points = [
  { icon: '⏱️', label: '타이머 퀴즈 · 개인 칠판 · 랜덤 선택', color: 'bg-white' },
  { icon: '🔬', label: '가상 실험 · AI 스피킹 따라 읽기', color: 'bg-[#C6EBA4]' },
  { icon: '🏠', label: '집에서도 학원에서도 실시간으로', color: 'bg-white' },
];

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // 화면에 들어오면 처음부터 재생, 벗어나면 일시정지. 움직임 줄이기 설정이면 자동재생하지 않음
  useEffect(() => {
    const v = videoRef.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!seen) {
            v.currentTime = 0;
            seen = true;
          }
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  const replay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section id="showreel" className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[#EAF8DC] relative overflow-hidden border-b-4 border-[var(--super-text)]">
      {/* 픽셀 점 무늬 (클래스인 파스텔 연두) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#C6EBA4 2px, transparent 2.5px), radial-gradient(#9ED77A 1.5px, transparent 2px)',
          backgroundSize: '48px 48px, 80px 80px',
          backgroundPosition: '0 0, 24px 36px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-white text-[var(--super-text)] text-sm font-bold border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_#5FAE45] mb-8 -rotate-2">
              ▶ ClassIn 22초 쇼릴
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--super-text)] font-black leading-tight mb-6">
              온라인 수업도 교실처럼,<br />
              <span className="text-white bg-[#5FAE45] px-4 pb-1 inline-block border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] rotate-1 mt-2">
                실시간으로 함께 노는 수업
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[var(--super-text)]/80 font-bold text-lg md:text-xl max-w-2xl mx-auto">
              타이머 퀴즈, 개인 칠판, 랜덤 선택과 트로피, 가상 실험, AI 스피킹 따라 읽기까지.{' '}<br className="hidden md:block" />
              집에서 접속한 아이도 학원 교실의 아이도 한 수업에서 실시간으로 함께합니다.
            </p>
          </FadeIn>
        </div>

        {/* 레트로 게임기 */}
        <ScaleIn delay={0.2}>
          <div className="relative bg-[#C6EBA4] border-4 border-[var(--super-text)] rounded-[2rem] shadow-[12px_12px_0px_0px_var(--super-text)] p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full border-2 border-[var(--super-text)] ${playing ? 'bg-[#5BBF6A]' : 'bg-[#E8423F]'}`} />
                <span className="font-black text-xs sm:text-sm text-[var(--super-text)] tracking-widest">ClassIn · POWER</span>
              </div>
              <div className="hidden sm:flex gap-1" aria-hidden>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-5 rounded-full bg-[#2F6B2E]/40" />
                ))}
              </div>
            </div>

            <div className="relative bg-[var(--super-text)] border-4 border-[var(--super-text)] rounded-xl overflow-hidden aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/showreel/poster.png"
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onClick={togglePlay}
                aria-label="클래스인(ClassIn) 22초 쇼릴: 타이머 퀴즈, 개인 칠판, 랜덤 선택, 트로피, 가상 실험, AI 스피킹이 있는 실시간 온라인 수업"
              >
                <source src="/showreel/classin-showreel.mp4" type="video/mp4" />
                <source src="/showreel/classin-showreel.webm" type="video/webm" />
              </video>
              {!playing && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 bg-[#C6EBA4] border-4 border-[var(--super-text)] rounded-full shadow-[6px_6px_0px_0px_var(--super-text)] flex items-center justify-center text-3xl md:text-4xl font-black text-[var(--super-text)] hover:translate-y-1 hover:shadow-none transition-all"
                  aria-label="쇼릴 재생"
                >
                  ▶
                </button>
              )}
            </div>

            {/* 조작부 */}
            <div className="flex items-center justify-center sm:justify-between gap-4 mt-5 md:mt-6 px-1">
              <div className="hidden sm:flex items-center gap-4" aria-hidden>
                <div className="relative w-14 h-14">
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 w-5 h-14 bg-[#2F6B2E] rounded-sm" />
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 w-14 h-5 bg-[#2F6B2E] rounded-sm" />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="bg-white text-[var(--super-text)] px-4 sm:px-5 py-3 text-sm sm:text-base font-black border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] hover:translate-y-1 hover:shadow-none transition-all"
                  aria-pressed={!muted}
                >
                  {muted ? '🔊 사운드 켜기' : '🔇 소리 끄기'}
                </button>
                <button
                  type="button"
                  onClick={replay}
                  className="bg-[#2F6B2E] text-white px-4 sm:px-5 py-3 text-sm sm:text-base font-black border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-text)] hover:translate-y-1 hover:shadow-none transition-all"
                >
                  ↺ 처음부터
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-3" aria-hidden>
                <span className="w-10 h-10 rounded-full bg-[var(--super-pink)] border-4 border-[var(--super-text)] shadow-[3px_3px_0px_0px_var(--super-text)] flex items-center justify-center font-black text-xs">B</span>
                <span className="w-10 h-10 -mt-6 rounded-full bg-[#5FAE45] text-white border-4 border-[var(--super-text)] shadow-[3px_3px_0px_0px_var(--super-text)] flex items-center justify-center font-black text-xs">A</span>
              </div>
            </div>
          </div>
        </ScaleIn>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {points.map((p, i) => (
            <FadeIn key={p.label} delay={0.1 * i}>
              <div className={`${p.color} border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_var(--super-text)] px-5 py-4 flex items-center gap-3 font-black text-[var(--super-text)]`}>
                <span className="text-2xl" aria-hidden>{p.icon}</span>
                {p.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
