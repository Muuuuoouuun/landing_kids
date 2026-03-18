'use client';

import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--cream)]/95 backdrop-blur-sm shadow-[0_2px_0_0_var(--super-text)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full mx-auto px-6 lg:px-12 xl:px-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[var(--super-orange)] border-2 border-[var(--super-text)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--super-text)] group-hover:-rotate-6 transition-transform">
            <span className="text-white text-sm font-black font-serif">L</span>
          </div>
          <span className="font-serif text-xl tracking-tight text-[var(--super-text)] font-black">
            Little Minds
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#philosophy" className="text-sm text-[var(--super-text)] font-bold hover:text-[var(--super-orange)] transition-colors">교육 철학</a>
          <a href="#how-it-works" className="text-sm text-[var(--super-text)] font-bold hover:text-[var(--super-orange)] transition-colors">도입 과정</a>
          <a href="#results" className="text-sm text-[var(--super-text)] font-bold hover:text-[var(--super-orange)] transition-colors">도입 성과</a>
          <a href="#pricing" className="text-sm text-[var(--super-text)] font-bold hover:text-[var(--super-orange)] transition-colors">요금제</a>
          <a
            href="#final-cta"
            className="bg-[var(--super-text)] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[var(--super-orange)] transition-colors border-2 border-[var(--super-text)] shadow-[3px_3px_0px_0px_var(--super-brown)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            도입 상담 신청
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="메뉴"
        >
          <span className={`w-5 h-0.5 bg-[var(--super-text)] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-[var(--super-text)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-[var(--super-text)] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--cream)] border-t-2 border-b-2 border-[var(--super-text)] mt-2">
          <div className="px-6 py-6 flex flex-col gap-4">
            <a href="#philosophy" onClick={() => setMenuOpen(false)} className="text-[var(--super-text)] font-bold py-2 hover:text-[var(--super-orange)] transition-colors">교육 철학</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-[var(--super-text)] font-bold py-2 hover:text-[var(--super-orange)] transition-colors">도입 과정</a>
            <a href="#results" onClick={() => setMenuOpen(false)} className="text-[var(--super-text)] font-bold py-2 hover:text-[var(--super-orange)] transition-colors">도입 성과</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-[var(--super-text)] font-bold py-2 hover:text-[var(--super-orange)] transition-colors">요금제</a>
            <a
              href="#final-cta"
              onClick={() => setMenuOpen(false)}
              className="bg-[var(--super-text)] text-white px-6 py-3 rounded-full text-sm font-bold text-center mt-2 border-2 border-[var(--super-text)]"
            >
              도입 상담 신청
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
