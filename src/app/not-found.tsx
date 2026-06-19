import React from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="bg-[#FDFBF7] min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
        
        {/* Subtle background texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 12px)'}} />

        <div className="relative z-10 text-center flex flex-col items-center">
          
          {/* Main 404 Text - Super chunky and playful */}
          <h1 className="font-serif text-[150px] sm:text-[200px] md:text-[250px] leading-none text-[var(--super-text)] font-black tracking-tighter mb-4 drop-shadow-[8px_8px_0_var(--super-orange)]">
            404
          </h1>
          
          <div className="bg-white border-4 border-[var(--super-text)] px-8 py-4 shadow-[6px_6px_0px_0px_var(--super-text)] transform -rotate-1 mb-10">
            <p className="text-xl md:text-2xl font-serif font-bold text-[var(--super-text)]">
              This page doesn't exist.
            </p>
          </div>
          
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center font-bold text-[var(--super-text)] text-lg hover:text-[var(--super-orange)] transition-colors"
          >
            <span className="border-b-2 border-[var(--super-text)] group-hover:border-[var(--super-orange)] pb-1 transition-colors">
              Go back to Home
            </span>
          </Link>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
