"use client";

import { useMemo } from "react";
import { useAppStore } from "@/stores/appStore";

const WEEKS = 52;
const DAYS = 7;
const TOTAL_CELLS = WEEKS * DAYS;

// CSS 변수로 정의된 색상 사용
const COLORS = [
  "var(--g0)", // 0 commits
  "var(--g1)", // 1 commit
  "var(--g2)", // 2 commits
  "var(--g3)", // 3 commits
  "var(--g4)", // 4+ commits
];

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function clampIntensity(n: number): number {
  return Math.min(4, Math.max(0, n));
}

export function Heatmap() {
  const { commits, activeRepoId, heatmapMode, setHeatmapMode, repos } =
    useAppStore();

  // 현재 모드에 따른 커밋 필터링
  const filteredCommits = useMemo(() => {
    if (heatmapMode === "repo" && activeRepoId) {
      return commits.filter((c) => c.repoId === activeRepoId);
    }
    return commits;
  }, [commits, heatmapMode, activeRepoId]);

  // 히트맵 강도 계산
  const intensity = useMemo(() => {
    const arr = Array.from({ length: TOTAL_CELLS }, () => 0);

    const today = startOfDay(new Date());
    const start = new Date(today);
    start.setDate(start.getDate() - (TOTAL_CELLS - 1));

    for (const commit of filteredCommits) {
      const dt = new Date(commit.dateTime);
      const day = startOfDay(dt);
      const diffDays = Math.floor(
        (day.getTime() - start.getTime()) / 86400000
      );
      if (diffDays < 0 || diffDays >= TOTAL_CELLS) continue;
      arr[diffDays] = clampIntensity(arr[diffDays] + 1);
    }

    return arr;
  }, [filteredCommits]);

  const activeRepoName = repos.find((r) => r.id === activeRepoId)?.name;

  return (
    <div className="rounded-(--radius) border border-(--border) bg-(--panel)">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-(--border) px-3.5 py-3">
        <h2 className="text-sm font-bold text-white">Activity</h2>
      </div>

      {/* Body */}
      <div className="p-3.5">
        {/* Title & Toggle */}
        <div className="mb-2.5 flex flex-wrap items-start justify-between gap-3.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-bold tracking-tight text-white">
              {filteredCommits.length} commits in the last {WEEKS} weeks
            </span>
            <span className="text-xs text-(--muted)">
              Non-code contributions · commit history · weekly review
            </span>

            {/* Toggle Buttons */}
            <div className="mt-2.5 inline-flex overflow-hidden rounded-[10px] border border-(--border) bg-(--panel2)">
              <button
                type="button"
                onClick={() => setHeatmapMode("all")}
                className={`h-7 px-2.5 text-xs font-bold ${
                  heatmapMode === "all"
                    ? "bg-[rgba(88,166,255,0.18)] text-white"
                    : "text-(--text) hover:bg-[rgba(240,246,252,0.06)]"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setHeatmapMode("repo")}
                className={`h-7 px-2.5 text-xs font-bold ${
                  heatmapMode === "repo"
                    ? "bg-[rgba(88,166,255,0.18)] text-white"
                    : "text-(--text) hover:bg-[rgba(240,246,252,0.06)]"
                }`}
              >
                This repo
              </button>
            </div>

            {/* Active Repo Label */}
            <span className="mt-1.5 text-xs text-(--muted)">
              Active repo:{" "}
              <span className="font-bold text-white">
                {activeRepoName || "None selected"}
              </span>
            </span>
          </div>

          {/* Heatmap Grid */}
          <div>
            <div className="overflow-x-auto pb-1.5">
              <div
                className="grid gap-[3px] rounded-(--radius) border border-(--border) bg-[#0b0f14] p-2.5"
                style={{
                  gridAutoFlow: "column",
                  gridTemplateRows: `repeat(${DAYS}, 1fr)`,
                }}
              >
                {intensity.map((level, i) => (
                  <div
                    key={i}
                    className="h-[11px] w-[11px] rounded-[2px] border border-black/[0.06]"
                    style={{ background: COLORS[level] }}
                    title={`${level} commit(s)`}
                  />
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-2.5 flex items-center gap-2 text-xs text-(--muted)">
              <span>Less</span>
              {COLORS.map((color, i) => (
                <span
                  key={i}
                  className="h-[11px] w-[11px] rounded-[2px] border border-white/[0.06]"
                  style={{ background: color }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
