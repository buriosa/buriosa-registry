"use client";

import { useMemo } from "react";
import { useAppStore } from "@/stores/appStore";
import type { ReleaseFormData } from "@/app/releases/new/page";

type PeriodPreset = "this-week" | "last-week" | "this-month" | "custom";

interface StepPeriodSelectProps {
  formData: ReleaseFormData;
  updateFormData: (updates: Partial<ReleaseFormData>) => void;
}

// Helper functions
function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getEndOfWeek(date: Date): Date {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function StepPeriodSelect({
  formData,
  updateFormData,
}: StepPeriodSelectProps) {
  const { repos, commits } = useAppStore();

  // Determine current preset based on dates
  const currentPreset = useMemo((): PeriodPreset => {
    if (!formData.periodStart || !formData.periodEnd) return "this-week";

    const now = new Date();
    const thisWeekStart = formatDateForInput(getStartOfWeek(now));
    const thisWeekEnd = formatDateForInput(getEndOfWeek(now));

    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekStart = formatDateForInput(getStartOfWeek(lastWeek));
    const lastWeekEnd = formatDateForInput(getEndOfWeek(lastWeek));

    const thisMonthStart = formatDateForInput(getStartOfMonth(now));
    const thisMonthEnd = formatDateForInput(getEndOfMonth(now));

    if (
      formData.periodStart === thisWeekStart &&
      formData.periodEnd === thisWeekEnd
    ) {
      return "this-week";
    }
    if (
      formData.periodStart === lastWeekStart &&
      formData.periodEnd === lastWeekEnd
    ) {
      return "last-week";
    }
    if (
      formData.periodStart === thisMonthStart &&
      formData.periodEnd === thisMonthEnd
    ) {
      return "this-month";
    }
    return "custom";
  }, [formData.periodStart, formData.periodEnd]);

  // Count commits in selected period
  const commitCount = useMemo(() => {
    if (!formData.repoId || !formData.periodStart || !formData.periodEnd) {
      return 0;
    }

    const start = new Date(formData.periodStart);
    start.setHours(0, 0, 0, 0);
    const end = new Date(formData.periodEnd);
    end.setHours(23, 59, 59, 999);

    return commits.filter((c) => {
      if (c.repoId !== formData.repoId) return false;
      const commitDate = new Date(c.dateTime);
      return commitDate >= start && commitDate <= end;
    }).length;
  }, [commits, formData.repoId, formData.periodStart, formData.periodEnd]);

  // Handle repo selection
  const handleRepoChange = (repoId: string) => {
    const repo = repos.find((r) => r.id === repoId);
    updateFormData({
      repoId,
      repoName: repo?.name || "",
    });
  };

  // Handle preset selection
  const handlePresetChange = (preset: PeriodPreset) => {
    const now = new Date();

    switch (preset) {
      case "this-week": {
        updateFormData({
          periodStart: formatDateForInput(getStartOfWeek(now)),
          periodEnd: formatDateForInput(getEndOfWeek(now)),
        });
        break;
      }
      case "last-week": {
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        updateFormData({
          periodStart: formatDateForInput(getStartOfWeek(lastWeek)),
          periodEnd: formatDateForInput(getEndOfWeek(lastWeek)),
        });
        break;
      }
      case "this-month": {
        updateFormData({
          periodStart: formatDateForInput(getStartOfMonth(now)),
          periodEnd: formatDateForInput(getEndOfMonth(now)),
        });
        break;
      }
      case "custom": {
        // Keep current dates or set to this week if empty
        if (!formData.periodStart || !formData.periodEnd) {
          updateFormData({
            periodStart: formatDateForInput(getStartOfWeek(now)),
            periodEnd: formatDateForInput(getEndOfWeek(now)),
          });
        }
        break;
      }
    }
  };

  // Initialize with this week if empty
  if (!formData.periodStart || !formData.periodEnd) {
    const now = new Date();
    updateFormData({
      periodStart: formatDateForInput(getStartOfWeek(now)),
      periodEnd: formatDateForInput(getEndOfWeek(now)),
    });
  }

  const presets: { id: PeriodPreset; label: string }[] = [
    { id: "this-week", label: "이번 주" },
    { id: "last-week", label: "지난 주" },
    { id: "this-month", label: "이번 달" },
    { id: "custom", label: "직접 선택" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Repo Selection */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-white">
          레포지토리
        </label>
        <select
          value={formData.repoId}
          onChange={(e) => handleRepoChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-(--border) bg-(--panel) px-3 text-sm text-white outline-none focus:border-(--link)"
        >
          <option value="">레포를 선택하세요</option>
          {repos.map((repo) => (
            <option key={repo.id} value={repo.id}>
              {repo.name}
            </option>
          ))}
        </select>
        {repos.length === 0 && (
          <p className="mt-1.5 text-xs text-(--muted)">
            먼저 대시보드에서 레포를 생성하세요.
          </p>
        )}
      </div>

      {/* Period Presets */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-white">
          기간
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetChange(preset.id)}
              className={`h-8 rounded-lg border px-3 text-sm font-medium transition-colors ${
                currentPreset === preset.id
                  ? "border-[rgba(46,160,67,0.45)] bg-[rgba(46,160,67,0.15)] text-[#3fb950]"
                  : "border-(--border) bg-(--btn) text-(--text) hover:bg-(--btn-hover)"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Date Range (always visible when custom is selected) */}
      {currentPreset === "custom" && (
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-(--muted)">
              시작일
            </label>
            <input
              type="date"
              value={formData.periodStart}
              onChange={(e) => updateFormData({ periodStart: e.target.value })}
              className="h-10 w-full rounded-lg border border-(--border) bg-(--panel) px-3 text-sm text-white outline-none focus:border-(--link)"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-(--muted)">
              종료일
            </label>
            <input
              type="date"
              value={formData.periodEnd}
              onChange={(e) => updateFormData({ periodEnd: e.target.value })}
              className="h-10 w-full rounded-lg border border-(--border) bg-(--panel) px-3 text-sm text-white outline-none focus:border-(--link)"
            />
          </div>
        </div>
      )}

      {/* Period Summary */}
      {formData.periodStart && formData.periodEnd && (
        <div className="rounded-lg border border-(--border) bg-[rgba(240,246,252,0.03)] p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">
                {formatDateDisplay(formData.periodStart)} ~{" "}
                {formatDateDisplay(formData.periodEnd)}
              </p>
              <p className="mt-0.5 text-xs text-(--muted)">
                {formData.repoName || "레포 미선택"}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  commitCount > 0 ? "text-[#3fb950]" : "text-(--muted)"
                }`}
              >
                {commitCount}
              </p>
              <p className="text-xs text-(--muted)">커밋</p>
            </div>
          </div>

          {formData.repoId && commitCount === 0 && (
            <p className="mt-2.5 text-xs text-[#f85149]">
              선택한 기간에 커밋이 없습니다. 기간을 조정하세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
