import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소중한 아이의 첫 번째 디지털 학습 파트너',
  description: '엄마의 안심과 아이의 즐거움이 공존하는 프리미엄 에듀테크',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[#FDFBF7] text-[#2D3436] antialiased">
        {children}
      </body>
    </html>
  );
}
