'use client';

import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (el) {
      const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      targets.forEach((t) => observer.observe(t));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
