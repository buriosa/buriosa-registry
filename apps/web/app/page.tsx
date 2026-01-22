import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">BURIOSA</h1>
      <p className="text-(--muted) mb-8">
        기록을 자산으로 바꾸는 워크스페이스
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-(--accent) text-(--accent-foreground) rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        시작하기
      </Link>
    </main>
  );
}
