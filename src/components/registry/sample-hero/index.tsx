export default function SampleHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
      {/* subtle glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          Registry Component
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          기록을 자산으로 바꾸는
          <span className="text-white/70"> GitHub-like Workspace</span>
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-white/70 leading-relaxed">
          하루 로그를 커밋처럼 남기고, 프로젝트 단위로 모아 포트폴리오로
          전환한다. “쌓이는 기록”이 곧 실력 증명.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/mvp/dashboard"
            className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            대시보드 체험
          </a>
          <a
            href="/registry"
            className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm text-white/70 hover:text-white"
          >
            컴포넌트 구경
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
            Log Commit
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
            Heatmap
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
            Weekly Review
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
            Share/Export
          </span>
        </div>
      </div>
    </div>
  );
}
