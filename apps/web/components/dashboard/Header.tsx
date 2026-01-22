"use client";

import Link from "next/link";

interface HeaderProps {
  onNewCommit?: () => void;
}

export function Header({ onNewCommit }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-[rgba(13,17,23,0.92)] backdrop-blur-[10px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3.5 px-4">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="flex min-w-38 items-center gap-2.5 hover:no-underline"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
            <span className="text-sm font-bold text-black">B</span>
          </div>
          <span className="font-bold tracking-wider text-white">BURIOSA</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-3.5 text-sm font-semibold md:flex">
          <Link
            href="/dashboard"
            className="text-(--text) hover:text-white hover:no-underline"
          >
            Dashboard
          </Link>
          <Link
            href="/releases"
            className="text-(--text) hover:text-white hover:no-underline"
          >
            Releases
          </Link>
        </nav>

        {/* Search */}
        <div className="ml-4 hidden flex-1 md:flex md:max-w-140">
          <input
            type="text"
            placeholder="Search repositories, commits, tags…"
            className="h-8.5 w-full rounded-lg border border-(--border) bg-(--panel) px-3 text-sm text-(--text) outline-none placeholder:text-(--muted)"
          />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2.5">
          {/* Notifications */}
          <button
            type="button"
            className="grid h-8.5 w-8.5 place-items-center rounded-lg border border-(--border) bg-(--btn) text-(--text) hover:bg-(--btn-hover)"
            title="Notifications"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* New Commit */}
          <button
            type="button"
            onClick={onNewCommit}
            className="grid h-8.5 w-8.5 place-items-center rounded-lg border border-(--border) bg-(--btn) text-(--text) hover:bg-(--btn-hover)"
            title="New commit"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          {/* Profile Avatar */}
          <div
            className="h-7 w-7 cursor-pointer rounded-full border border-(--border)"
            style={{
              background:
                "linear-gradient(135deg, rgba(88,166,255,0.35), rgba(57,211,83,0.28))",
            }}
            title="Profile"
          />
        </div>
      </div>
    </header>
  );
}
