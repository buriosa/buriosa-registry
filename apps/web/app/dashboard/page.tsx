"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { RepoList } from "@/components/dashboard/RepoList";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { CommitFeed } from "@/components/dashboard/CommitFeed";
import { RepoModal } from "@/components/repository/RepoModal";
import { CommitModal } from "@/components/commit/CommitModal";
import { useAppStore } from "@/stores/appStore";
import type { Commit } from "@/types";

export default function DashboardPage() {
  const [repoModalOpen, setRepoModalOpen] = useState(false);
  const [commitModalOpen, setCommitModalOpen] = useState(false);
  const [editingCommit, setEditingCommit] = useState<Commit | null>(null);

  const { loadDemoData, repos } = useAppStore();

  const handleNewCommit = () => {
    setEditingCommit(null);
    setCommitModalOpen(true);
  };

  const handleEditCommit = (commit: Commit) => {
    setEditingCommit(commit);
    setCommitModalOpen(true);
  };

  return (
    <>
      <Header onNewCommit={handleNewCommit} />

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-4.5 grid-cols-1 md:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr_320px]">
        {/* Left: RepoList */}
        <section className="hidden md:block">
          <RepoList onNewRepo={() => setRepoModalOpen(true)} />
        </section>

        {/* Center: Heatmap + Feed */}
        <section className="flex flex-col gap-4">
          {/* Demo Data Button */}
          {repos.length === 0 && (
            <div className="rounded-(--radius) border border-(--border) bg-(--panel) p-3.5">
              <div className="flex flex-col items-center gap-2.5 py-4">
                <p className="text-sm text-(--muted)">
                  데이터가 없습니다. 데모 데이터를 추가해보세요.
                </p>
                <button
                  onClick={loadDemoData}
                  className="h-8.5 rounded-lg border border-(--border) bg-(--btn) px-3 text-[13px] font-semibold text-(--text) hover:bg-(--btn-hover)"
                >
                  Add demo data
                </button>
              </div>
            </div>
          )}

          {/* Heatmap */}
          <Heatmap />

          {/* Feed */}
          <CommitFeed onEdit={handleEditCommit} />
        </section>

        {/* Right: Weekly Preview */}
        <section className="hidden xl:block">
          <div className="rounded-(--radius) border border-(--border) bg-(--panel)">
            <div className="flex items-center justify-between border-b border-(--border) px-3.5 py-3">
              <h2 className="text-sm font-bold text-white">Quick start</h2>
            </div>
            <div className="p-3.5">
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-2.5 rounded-xl border border-[rgba(240,246,252,0.08)] bg-[rgba(240,246,252,0.03)] p-2.5">
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[rgba(46,160,67,0.55)] bg-[rgba(46,160,67,0.12)]" />
                  <div>
                    <p className="text-[13px] font-bold text-white">Create a repo</p>
                    <p className="text-xs text-(--muted)">Baby · Career · Investing · Fitness</p>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-xl border border-[rgba(240,246,252,0.08)] bg-[rgba(240,246,252,0.03)] p-2.5">
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[rgba(46,160,67,0.55)] bg-[rgba(46,160,67,0.12)]" />
                  <div>
                    <p className="text-[13px] font-bold text-white">Write a log</p>
                    <p className="text-xs text-(--muted)">30 seconds. Keep it raw.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-xl border border-[rgba(240,246,252,0.08)] bg-[rgba(240,246,252,0.03)] p-2.5">
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[rgba(46,160,67,0.55)] bg-[rgba(46,160,67,0.12)]" />
                  <div>
                    <p className="text-[13px] font-bold text-white">Commit</p>
                    <p className="text-xs text-(--muted)">Make it official. History starts here.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-xl border border-[rgba(240,246,252,0.08)] bg-[rgba(240,246,252,0.03)] p-2.5">
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[rgba(46,160,67,0.55)] bg-[rgba(46,160,67,0.12)]" />
                  <div>
                    <p className="text-[13px] font-bold text-white">Release</p>
                    <p className="text-xs text-(--muted)">Publish a shareable summary.</p>
                  </div>
                </div>
              </div>

              <p className="mt-3.5 text-xs text-(--muted)">
                Tip: squares grow only when you{" "}
                <span className="font-bold text-white">commit</span>.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <RepoModal
        isOpen={repoModalOpen}
        onClose={() => setRepoModalOpen(false)}
      />
      <CommitModal
        isOpen={commitModalOpen}
        onClose={() => {
          setCommitModalOpen(false);
          setEditingCommit(null);
        }}
        editCommit={editingCommit}
      />
    </>
  );
}
