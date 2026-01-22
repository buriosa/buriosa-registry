// Repository
export interface Repository {
  id: string;
  name: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

// Commit
export interface Commit {
  id: string;
  repoId: string;
  repoName: string;
  title: string;
  body: string;
  tags: string[];
  dateTime: string;
  isHighlighted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Attachment
export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "other";
  fileSize: number;
  uploadedAt: string;
}

// Release
export interface Release {
  id: string;
  repoId: string;
  repoName: string;
  version: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  commitIds: string[];
  summary: string;
  changelog: string;
  attachments: Attachment[];
  status: "draft" | "published";
  isPublic: boolean;
  shareSlug: string;
  isLatest: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// App State
export interface AppState {
  repos: Repository[];
  commits: Commit[];
  releases: Release[];
  activeRepoId: string | null;
  heatmapMode: "all" | "repo";
  hasCompletedOnboarding: boolean;
}

// Store Actions
export interface AppActions {
  addRepo: (repo: Omit<Repository, "id" | "createdAt" | "updatedAt">) => void;
  updateRepo: (id: string, data: Partial<Repository>) => void;
  deleteRepo: (id: string) => void;

  addCommit: (commit: Omit<Commit, "id" | "createdAt" | "updatedAt">) => void;
  updateCommit: (id: string, data: Partial<Commit>) => void;
  deleteCommit: (id: string) => void;
  toggleHighlight: (id: string) => void;

  addRelease: (release: Omit<Release, "id" | "createdAt" | "updatedAt">) => void;
  updateRelease: (id: string, data: Partial<Release>) => void;
  deleteRelease: (id: string) => void;
  publishRelease: (id: string) => void;

  setActiveRepo: (repoId: string | null) => void;
  setHeatmapMode: (mode: "all" | "repo") => void;
  completeOnboarding: () => void;

  loadDemoData: () => void;
}

export type AppStore = AppState & AppActions;
