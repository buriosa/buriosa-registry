"use client";

import { useState } from "react";
import { useAppStore } from "@/stores/appStore";

interface RepoListProps {
  onNewRepo?: () => void;
}

export function RepoList({ onNewRepo }: RepoListProps) {
  const [search, setSearch] = useState("");
  const { repos, activeRepoId, setActiveRepo } = useAppStore();

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-(--radius) border border-(--border) bg-(--panel)">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-(--border) px-3.5 py-3">
        <h2 className="text-sm font-bold text-white">Repositories</h2>
        <button
          onClick={onNewRepo}
          className="h-7 rounded-lg border border-(--border) bg-(--btn) px-2.5 text-xs font-semibold text-(--text) hover:bg-(--btn-hover)"
        >
          New
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5">
        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Find a repository…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-[34px] w-full rounded-lg border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none placeholder:text-(--muted)"
          />
        </div>

        {/* Repo List */}
        <div className="flex flex-col gap-1.5">
          {filteredRepos.length === 0 ? (
            <p className="py-4 text-center text-sm text-(--muted)">
              {repos.length === 0
                ? "No repositories yet"
                : "No matching repositories"}
            </p>
          ) : (
            filteredRepos.map((repo) => (
              <button
                key={repo.id}
                onClick={() =>
                  setActiveRepo(activeRepoId === repo.id ? null : repo.id)
                }
                className={`flex items-center justify-between gap-2.5 rounded-[10px] border px-2.5 py-2 text-left transition-colors ${
                  activeRepoId === repo.id
                    ? "border-[rgba(88,166,255,0.18)] bg-[rgba(88,166,255,0.10)]"
                    : "border-transparent hover:border-[rgba(240,246,252,0.06)] hover:bg-[rgba(240,246,252,0.04)]"
                }`}
              >
                <span className="truncate text-[13px] font-semibold text-white">
                  {repo.name}
                </span>
                {repo.tag && (
                  <span className="whitespace-nowrap rounded-full border border-[rgba(240,246,252,0.12)] bg-[rgba(240,246,252,0.03)] px-2 py-0.5 text-[11px] text-(--muted)">
                    {repo.tag}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Tip */}
        <p className="mt-3 text-xs text-(--muted)">
          Tip: squares grow only when you{" "}
          <span className="font-bold text-white">commit</span> (not when you
          just type).
        </p>
      </div>
    </div>
  );
}
