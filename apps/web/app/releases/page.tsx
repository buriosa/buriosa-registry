"use client";

import Link from "next/link";
import { useAppStore } from "@/stores/appStore";
import { ReleaseCard } from "@/components/release/ReleaseCard";
import { Header } from "@/components/dashboard/Header";

export default function ReleasesPage() {
  const { releases } = useAppStore();

  // Sort: drafts first, then by publishedAt/createdAt desc
  const sortedReleases = [...releases].sort((a, b) => {
    // Drafts first
    if (a.status === "draft" && b.status !== "draft") return -1;
    if (a.status !== "draft" && b.status === "draft") return 1;

    // Then by date (newest first)
    const dateA = a.publishedAt || a.createdAt;
    const dateB = b.publishedAt || b.createdAt;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const handleShare = (release: (typeof releases)[0]) => {
    const url = `${window.location.origin}/r/${release.shareSlug}`;
    navigator.clipboard.writeText(url);
    alert(`링크가 복사되었습니다: ${url}`);
  };

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">📦 Releases</h1>
            <p className="mt-1 text-sm text-(--muted)">
              커밋을 정리해서 공유 가능한 산출물로 만드세요
            </p>
          </div>
          <Link
            href="/releases/new"
            className="inline-flex h-8.5 items-center rounded-lg border border-[rgba(46,160,67,0.45)] bg-(--accent) px-3 text-[13px] font-semibold text-white hover:bg-(--accent-hover)"
          >
            + New Release
          </Link>
        </div>

        {/* Empty State */}
        {releases.length === 0 && (
          <div className="rounded-(--radius) border border-(--border) bg-(--panel) p-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-4xl">📦</div>
              <h2 className="text-lg font-bold text-white">
                아직 Release가 없습니다
              </h2>
              <p className="max-w-sm text-sm text-(--muted)">
                커밋이 쌓이면 Release로 정리해서 경력기술서, 회고록, 포트폴리오
                등으로 공유할 수 있어요.
              </p>
              <Link
                href="/releases/new"
                className="mt-2 inline-flex h-8.5 items-center rounded-lg border border-[rgba(46,160,67,0.45)] bg-(--accent) px-4 text-[13px] font-semibold text-white hover:bg-(--accent-hover)"
              >
                첫 Release 만들기
              </Link>
            </div>
          </div>
        )}

        {/* Release List */}
        {releases.length > 0 && (
          <div className="flex flex-col gap-3">
            {sortedReleases.map((release) => (
              <ReleaseCard
                key={release.id}
                release={release}
                onShare={handleShare}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
