export const APP_NAME = "BURIOSA";

export const DEFAULT_REPOS = [
  { name: "Career", tag: "resume · impact" },
  { name: "Baby", tag: "growth · milestone" },
  { name: "Investing", tag: "journal · insight" },
  { name: "Fitness", tag: "workout · diet" },
  { name: "Ideas", tag: "thoughts · notes" },
] as const;

export const HEATMAP_COLORS = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const SUPPORTED_FILE_TYPES = {
  pdf: ["application/pdf"],
  image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
} as const;
