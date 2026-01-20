import Link from "next/link";
import type React from "react";

import { REGISTRY_COMPONENTS } from "../registry/registry-components";

export default function MVPPage() {
  const SampleHero = (REGISTRY_COMPONENTS as any)[
    "sample-hero"
  ] as React.ComponentType | undefined;

  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">BURIOSA</span>
            <span className="text-xs text-white/50">MVP Landing</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link
              className="text-white/70 hover:text-white hover:underline"
              href="/registry"
            >
              Registry
            </Link>
            <Link
              className="text-white/70 hover:text-white hover:underline"
              href="/mvp/dashboard"
            >
              Dashboard
            </Link>
            <a
              className="text-white/70 hover:text-white hover:underline"
              href="/mvp-legacy/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Legacy
            </a>
          </div>
        </div>

        {/* Hero */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          {SampleHero ? (
            <SampleHero />
          ) : (
            <div className="rounded-xl border border-white/10 bg-[#0b0f14] p-6 text-white/70">
              sample-hero 컴포넌트를 찾지 못했어. <br />
              먼저 <code className="text-white/80">pnpm factory</code> 실행해서
              매핑 파일이 생성됐는지 확인해줘.
            </div>
          )}
        </section>

        {/* Below hero: “제품처럼 보이게” 최소 섹션 3개 */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="Log Commit"
            desc="하루 기록을 커밋처럼 남기고, 프로젝트 단위로 자산화"
          />
          <FeatureCard
            title="Heatmap"
            desc="잔디가 쌓이듯 성장 기록이 한눈에 보이게"
          />
          <FeatureCard
            title="Weekly Review"
            desc="주간 회고를 자동으로 구조화해서 다음 액션으로 연결"
          />
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold">다음 액션</div>
              <div className="mt-1 text-sm text-white/70">
                대시보드에서 실제 데이터를 붙이기 시작한다.
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/mvp/dashboard"
                className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
              >
                대시보드 보기
              </Link>
              <a
                href="/mvp-legacy/dashboard.html"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                Legacy 대시보드
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-10 text-xs text-white/40">
          이제부터는 legacy를 “참고용”으로 두고, /mvp를 React로 하나씩
          교체해나간다.
        </footer>
      </div>
    </main>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/65">{desc}</div>
    </div>
  );
}
