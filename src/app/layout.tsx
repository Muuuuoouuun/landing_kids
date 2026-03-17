import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[#FDFBF7] text-[#2D3436]">
        {children}
      </body>
    </html>
  );
}
