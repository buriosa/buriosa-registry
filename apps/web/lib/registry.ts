import fs from "node:fs/promises";
import path from "node:path";

export type RegistryItem = {
  name: string;
  category: string;
  createdAt: string;
  status: "draft" | "stable" | "deprecated";
  images?: { preview?: string };
  description?: { short?: string; long?: string };
  freeformKeywords?: string[];
  tags?: {
    functional?: string[];
    style?: string[];
    layout?: string[];
    industry?: string[];
  };
};

function getIndexFilePath() {
  // apps/web/public/registry/index.json
  return path.join(process.cwd(), "public", "registry", "index.json");
}

export async function loadRegistryIndex(): Promise<RegistryItem[]> {
  const filePath = getIndexFilePath();
  const raw = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(raw);

  // 배열 형태 or {items:[...]} 둘 다 대응
  if (Array.isArray(data)) return data as RegistryItem[];
  if (Array.isArray(data.items)) return data.items as RegistryItem[];
  return [];
}

export async function loadRegistryItem(name: string): Promise<RegistryItem | null> {
  const items = await loadRegistryIndex();
  return items.find((x) => x.name === name) ?? null;
}
