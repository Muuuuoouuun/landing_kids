import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1E2325] text-[#636E72] px-6 lg:px-12 xl:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="md:max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#8C9A8B] flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
              <span className="font-serif text-white text-lg tracking-tight">Little Minds</span>
            </div>
            <p className="text-sm leading-relaxed">
              학원의 교육 철학을 디지털로 완성하는 프리미엄 에듀테크.<br />
              데이터 기반 학습 관리로 학부모 신뢰를 높입니다.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white text-sm font-medium mb-4">서비스</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#philosophy" className="hover:text-[#8C9A8B] transition-colors">교육 철학</a></li>
                <li><a href="#how-it-works" className="hover:text-[#8C9A8B] transition-colors">도입 과정</a></li>
                <li><a href="#results" className="hover:text-[#8C9A8B] transition-colors">도입 성과</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">도입 안내</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#pricing" className="hover:text-[#8C9A8B] transition-colors">요금제</a></li>
                <li><a href="#final-cta" className="hover:text-[#8C9A8B] transition-colors">상담 신청</a></li>
                <li><a href="#" className="hover:text-[#8C9A8B] transition-colors">파트너십</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">고객지원</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-[#8C9A8B] transition-colors">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-[#8C9A8B] transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-[#8C9A8B] transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2D3436] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; 2026 Little Minds. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-[#8C9A8B] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#8C9A8B] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#8C9A8B] transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
