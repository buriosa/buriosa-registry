"use client";

import { useMemo } from "react";
import { useAppStore } from "@/stores/appStore";
import { CommitCard } from "@/components/commit/CommitCard";
import type { Commit } from "@/types";

interface CommitFeedProps {
  onEdit?: (commit: Commit) => void;
}

export function CommitFeed({ onEdit }: CommitFeedProps) {
  const { commits, activeRepoId, deleteCommit, toggleHighlight } =
    useAppStore();

  // Filter by active repo and sort by newest first
  const filteredCommits = useMemo(() => {
    let result = [...commits];

    if (activeRepoId) {
      result = result.filter((c) => c.repoId === activeRepoId);
    }

    // Sort by dateTime descending (newest first)
    result.sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );

    return result;
  }, [commits, activeRepoId]);

  const scopeLabel = activeRepoId
    ? `Showing commits for selected repo`
    : `Showing all commits`;

  return (
    <div className="rounded-(--radius) border border-(--border) bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-(--border) px-3.5 py-3">
        <h2 className="text-sm font-bold text-white">Recent activity</h2>
        <span className="text-xs text-(--muted)">{scopeLabel}</span>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-2.5 p-3.5">
        {filteredCommits.length === 0 ? (
          <p className="py-8 text-center text-sm text-(--muted)">
            No commits yet. Create your first commit!
          </p>
        ) : (
          filteredCommits.map((commit) => (
            <CommitCard
              key={commit.id}
              commit={commit}
              onEdit={onEdit}
              onDelete={deleteCommit}
              onToggleHighlight={toggleHighlight}
            />
          ))
        )}
      </div>
    </div>
  );
}
