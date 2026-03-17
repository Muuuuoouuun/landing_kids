import React from 'react';

export const LuxuryBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Warm Soft Gradient Orbs (Organic Growth) */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#E9E4DB]/40 rounded-full blur-[140px]"></div>
      <div className="absolute top-[20%] right-[5%] w-[45%] h-[45%] bg-[#8C9A8B]/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-[#D4CFC6]/30 rounded-full blur-[100px]"></div>
      
      {/* 2. Soft Grain Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }}
      ></div>
    </div>
  );
};
