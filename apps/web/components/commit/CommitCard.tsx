"use client";

import { useState, useRef, useEffect } from "react";
import type { Commit } from "@/types";

interface CommitCardProps {
  commit: Commit;
  onEdit?: (commit: Commit) => void;
  onDelete?: (id: string) => void;
  onToggleHighlight?: (id: string) => void;
}

export function CommitCard({
  commit,
  onEdit,
  onDelete,
  onToggleHighlight,
}: CommitCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid gap-2 rounded-xl border border-(--border) bg-[rgba(11,15,20,0.55)] p-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {commit.isHighlighted && (
            <span className="text-sm" title="Highlighted">
              ⭐
            </span>
          )}
          <span className="text-[13px] font-bold text-white">
            {commit.repoName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-xs text-(--muted)">
            {formatDate(commit.dateTime)}
          </span>

          {/* Kebab menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-7 w-7 place-items-center rounded-lg border border-[rgba(240,246,252,0.10)] bg-[rgba(240,246,252,0.02)] text-[rgba(240,246,252,0.85)] hover:bg-[rgba(240,246,252,0.06)]"
              aria-label="More options"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <circle cx="8" cy="3" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="8" cy="13" r="1.5" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-50 min-w-[150px] rounded-xl border border-(--border) bg-(--panel) p-1.5 shadow-(--shadow)">
                <button
                  type="button"
                  onClick={() => {
                    onToggleHighlight?.(commit.id);
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-2.5 py-2.5 text-left text-xs font-bold text-(--text) hover:bg-[rgba(240,246,252,0.06)]"
                >
                  {commit.isHighlighted ? "Remove ⭐" : "Add ⭐"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onEdit?.(commit);
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-2.5 py-2.5 text-left text-xs font-bold text-(--text) hover:bg-[rgba(240,246,252,0.06)]"
                >
                  Edit
                </button>
                <div className="mx-1.5 my-1.5 h-px bg-[rgba(240,246,252,0.08)]" />
                <button
                  type="button"
                  onClick={() => {
                    onDelete?.(commit.id);
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-2.5 py-2.5 text-left text-xs font-bold text-[#ff7b72] hover:bg-[rgba(240,246,252,0.06)]"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title / Body */}
      <pre className="m-0 whitespace-pre-wrap rounded-lg border border-[rgba(240,246,252,0.08)] bg-[rgba(240,246,252,0.04)] p-2.5 font-mono text-[12.5px] text-[rgba(240,246,252,0.92)]">
        {commit.title}
        {commit.body && `\n\n${commit.body}`}
      </pre>

      {/* Tags */}
      {commit.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {commit.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(240,246,252,0.12)] bg-[rgba(240,246,252,0.03)] px-2.5 py-0.5 text-[11px] text-[rgba(240,246,252,0.78)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
