"use client";

import Link from "next/link";
import type { Release } from "@/types";

interface ReleaseCardProps {
  release: Release;
  onShare?: (release: Release) => void;
}

export function ReleaseCard({ release, onShare }: ReleaseCardProps) {
  const commitCount = release.commitIds.length;
  const fileCount = release.attachments.length;

  const formatPeriod = () => {
    const start = new Date(release.periodStart).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
    const end = new Date(release.periodEnd).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
    return `${start} ~ ${end}`;
  };

  const isDraft = release.status === "draft";

  return (
    <div className="rounded-(--radius) border border-(--border) bg-(--panel) p-3.5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex flex-col gap-1">
          {/* Version & Title */}
          <div className="flex items-center gap-2">
            {isDraft ? (
              <span className="rounded bg-[rgba(240,246,252,0.08)] px-1.5 py-0.5 text-xs font-bold text-(--muted)">
                Draft
              </span>
            ) : (
              <span className="text-sm font-bold text-white">
                {release.version}
              </span>
            )}
            <span className="text-sm font-semibold text-white">
              {release.title}
            </span>
            {release.isLatest && (
              <span className="rounded bg-[rgba(46,160,67,0.15)] px-1.5 py-0.5 text-xs font-bold text-[#3fb950]">
                ✨ Latest
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-(--muted)">
            <span>{release.repoName}</span>
            <span>·</span>
            <span>{commitCount} commits</span>
            {fileCount > 0 && (
              <>
                <span>·</span>
                <span>{fileCount} files</span>
              </>
            )}
          </div>

          {/* Period */}
          <span className="text-xs text-(--muted)">{formatPeriod()}</span>
        </div>

        {/* Public badge */}
        {!isDraft && release.isPublic && (
          <span className="whitespace-nowrap text-xs text-(--link)">
            🔗 Public
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center justify-end gap-2">
        {isDraft ? (
          <Link
            href={`/releases/${release.id}/edit`}
            className="h-7 rounded-lg border border-(--border) bg-(--btn) px-2.5 text-xs font-semibold text-(--text) hover:bg-(--btn-hover) inline-flex items-center"
          >
            이어서 작성
          </Link>
        ) : (
          <>
            <Link
              href={`/releases/${release.id}`}
              className="h-7 rounded-lg border border-(--border) bg-(--btn) px-2.5 text-xs font-semibold text-(--text) hover:bg-(--btn-hover) inline-flex items-center"
            >
              View
            </Link>
            {release.isPublic && (
              <button
                type="button"
                onClick={() => onShare?.(release)}
                className="h-7 rounded-lg border border-(--border) bg-(--btn) px-2.5 text-xs font-semibold text-(--text) hover:bg-(--btn-hover)"
              >
                Share
              </button>
            )}
          </>
        )}
        <button
          type="button"
          className="grid h-7 w-7 place-items-center rounded-lg border border-(--border) bg-(--btn) text-(--muted) hover:bg-(--btn-hover)"
          aria-label="More options"
        >
          ⋯
        </button>
      </div>
    </div>
  );
}
