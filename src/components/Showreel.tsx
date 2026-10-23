'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FadeIn, ScaleIn } from './motion';

const points = [
  { icon: '🔤', label: '알파벳 · 수학 · 과학', color: 'bg-[var(--super-pink)]' },
  { icon: '🏠', label: '온라인 · 오프라인 어디서나', color: 'bg-[var(--super-blue)]' },
  { icon: '🧒', label: '5세부터 초등까지 맞춤', color: 'bg-[#FFF9C4]' },
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
    <section id="showreel" className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 bg-[#1B1530] relative overflow-hidden border-b-4 border-[var(--super-text)]">
      {/* 픽셀 별 */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#fff 1px, transparent 1.5px), radial-gradient(#F2CC8F 1px, transparent 1.5px)',
          backgroundSize: '48px 48px, 80px 80px',
          backgroundPosition: '0 0, 24px 36px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <FadeIn direction="down">
            <span className="inline-block px-4 py-2 bg-[var(--gold-light)] text-[var(--super-text)] text-sm font-bold border-2 border-[var(--super-text)] shadow-[4px_4px_0px_0px_var(--super-orange)] mb-8 -rotate-2">
              ▶ 22초 쇼릴
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-black leading-tight mb-6">
              수업이 한 판의 게임처럼,<br />
              <span className="text-white bg-[var(--super-orange)] px-4 pb-1 inline-block border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_#000] rotate-1 mt-2">
                놀면서 배우는 픽셀 모험
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-white/80 font-bold text-lg md:text-xl max-w-2xl mx-auto">
              알파벳 블록을 박치기하고, 수식으로 다리를 놓고, 실험으로 새싹을 키웁니다.{' '}<br className="hidden md:block" />
              집에서도 학원에서도 똑같이 신나는 수업을 22초로 만나보세요.
            </p>
          </FadeIn>
        </div>

        {/* 레트로 게임기 */}
        <ScaleIn delay={0.2}>
          <div className="relative bg-[var(--super-orange)] border-4 border-[var(--super-text)] rounded-[2rem] shadow-[12px_12px_0px_0px_#000] p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full border-2 border-[var(--super-text)] ${playing ? 'bg-[#5BBF6A]' : 'bg-[#E8423F]'}`} />
                <span className="font-black text-xs sm:text-sm text-[var(--super-text)] tracking-widest">LITTLE MINDS · POWER</span>
              </div>
              <div className="hidden sm:flex gap-1" aria-hidden>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-5 rounded-full bg-[var(--super-text)]/40" />
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
                aria-label="리틀마인즈 22초 쇼릴: 알파벳, 수학, 과학을 놀면서 배우는 픽셀 모험 수업"
              >
                <source src="/showreel/little-minds-showreel.mp4" type="video/mp4" />
                <source src="/showreel/little-minds-showreel.webm" type="video/webm" />
              </video>
              {!playing && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 bg-[var(--gold-light)] border-4 border-[var(--super-text)] rounded-full shadow-[6px_6px_0px_0px_var(--super-text)] flex items-center justify-center text-3xl md:text-4xl font-black text-[var(--super-text)] hover:translate-y-1 hover:shadow-none transition-all"
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
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 w-5 h-14 bg-[var(--super-text)] rounded-sm" />
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 w-14 h-5 bg-[var(--super-text)] rounded-sm" />
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
                  className="bg-[var(--super-text)] text-white px-4 sm:px-5 py-3 text-sm sm:text-base font-black border-4 border-[var(--super-text)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:translate-y-1 hover:shadow-none transition-all"
                >
                  ↺ 처음부터
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-3" aria-hidden>
                <span className="w-10 h-10 rounded-full bg-[var(--super-pink)] border-4 border-[var(--super-text)] shadow-[3px_3px_0px_0px_var(--super-text)] flex items-center justify-center font-black text-xs">B</span>
                <span className="w-10 h-10 -mt-6 rounded-full bg-[var(--gold-light)] border-4 border-[var(--super-text)] shadow-[3px_3px_0px_0px_var(--super-text)] flex items-center justify-center font-black text-xs">A</span>
              </div>
            </div>
          </div>
        </ScaleIn>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {points.map((p, i) => (
            <FadeIn key={p.label} delay={0.1 * i}>
              <div className={`${p.color} border-4 border-[var(--super-text)] shadow-[6px_6px_0px_0px_#000] px-5 py-4 flex items-center gap-3 font-black text-[var(--super-text)]`}>
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
