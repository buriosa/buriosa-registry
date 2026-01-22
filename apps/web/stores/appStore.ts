"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppStore, Repository, Commit, Release } from "@/types";
import { generateId, generateShareSlug, getISODate } from "@/lib/utils";
import { generateDemoData } from "@/lib/demoData";

const initialState = {
  repos: [],
  commits: [],
  releases: [],
  activeRepoId: null,
  heatmapMode: "all" as const,
  hasCompletedOnboarding: false,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Repo Actions
      addRepo: (repo) => {
        const now = getISODate();
        const newRepo: Repository = {
          ...repo,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ repos: [...state.repos, newRepo] }));
      },

      updateRepo: (id, data) => {
        set((state) => ({
          repos: state.repos.map((r) =>
            r.id === id ? { ...r, ...data, updatedAt: getISODate() } : r
          ),
        }));
      },

      deleteRepo: (id) => {
        set((state) => ({
          repos: state.repos.filter((r) => r.id !== id),
          commits: state.commits.filter((c) => c.repoId !== id),
          releases: state.releases.filter((r) => r.repoId !== id),
          activeRepoId: state.activeRepoId === id ? null : state.activeRepoId,
        }));
      },

      // Commit Actions
      addCommit: (commit) => {
        const now = getISODate();
        const newCommit: Commit = {
          ...commit,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ commits: [...state.commits, newCommit] }));
      },

      updateCommit: (id, data) => {
        set((state) => ({
          commits: state.commits.map((c) =>
            c.id === id ? { ...c, ...data, updatedAt: getISODate() } : c
          ),
        }));
      },

      deleteCommit: (id) => {
        set((state) => ({
          commits: state.commits.filter((c) => c.id !== id),
        }));
      },

      toggleHighlight: (id) => {
        set((state) => ({
          commits: state.commits.map((c) =>
            c.id === id
              ? { ...c, isHighlighted: !c.isHighlighted, updatedAt: getISODate() }
              : c
          ),
        }));
      },

      // Release Actions
      addRelease: (release) => {
        const now = getISODate();
        const newRelease: Release = {
          ...release,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ releases: [...state.releases, newRelease] }));
      },

      updateRelease: (id, data) => {
        set((state) => ({
          releases: state.releases.map((r) =>
            r.id === id ? { ...r, ...data, updatedAt: getISODate() } : r
          ),
        }));
      },

      deleteRelease: (id) => {
        set((state) => ({
          releases: state.releases.filter((r) => r.id !== id),
        }));
      },

      publishRelease: (id) => {
        const now = getISODate();
        const { releases } = get();
        const release = releases.find((r) => r.id === id);
        if (!release) return;

        // Update isLatest for all releases in this repo
        set((state) => ({
          releases: state.releases.map((r) => {
            if (r.id === id) {
              return {
                ...r,
                status: "published",
                publishedAt: now,
                isLatest: true,
                shareSlug: r.shareSlug || generateShareSlug(),
                updatedAt: now,
              };
            }
            if (r.repoId === release.repoId && r.isLatest) {
              return { ...r, isLatest: false, updatedAt: now };
            }
            return r;
          }),
        }));
      },

      // UI Actions
      setActiveRepo: (repoId) => {
        set({ activeRepoId: repoId });
      },

      setHeatmapMode: (mode) => {
        set({ heatmapMode: mode });
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      loadDemoData: () => {
        const { repos, commits } = generateDemoData();
        set({ repos, commits, activeRepoId: repos[0]?.id || null });
      },
    }),
    {
      name: "buriosa-storage",
    }
  )
);
