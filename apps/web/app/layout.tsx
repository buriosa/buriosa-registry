import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BURIOSA",
  description: "비개발자를 위한 GitHub 스타일 기록 자산화 워크스페이스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen antialiased bg-(--bg) text-(--text)">
        {children}
      </body>
    </html>
  );
}
