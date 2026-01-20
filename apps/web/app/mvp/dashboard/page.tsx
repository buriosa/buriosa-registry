import Link from "next/link";

export default function MVPDashboard() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">MVP Dashboard</h1>
          <Link className="text-sm text-white/70 hover:text-white hover:underline" href="/mvp">
            ← MVP 홈
          </Link>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/70">
            다음 단계에서 legacy-mvp 대시보드 UI를 이 페이지로 “그대로 옮긴 뒤”,
            기능(편집/삭제/최근 활동/heatmap)을 localStorage로 붙인다.
          </p>

          <div className="mt-6 rounded-lg border border-white/10 bg-[#0b0f14] p-6 text-white/60">
            (여기에 legacy-mvp 대시보드 UI를 포팅할 예정)
          </div>
        </div>
      </div>
    </main>
  );
}
