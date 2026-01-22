import fs from "node:fs/promises";
import path from "node:path";

// ============================================================================
// Types (aligned with src/types/metadata.ts)
// ============================================================================

export type RegistryItem = {
  id: string;
  name: string;
  category: string;
  images: { preview?: string; thumbnail?: string };
  title?: string;
  description?: { short?: string; detailed?: string };
  tags: {
    functional: string[];
    style: string[];
    layout: string[];
    industry: string[];
  };
  freeformKeywords: string[];
  searchableText: string;
  fontFamily: string[];
  componentPath: string;
  parentPage?: string;
  source?: {
    type: "url" | "image" | "manual" | "framer";
    url?: string;
    scrapedAt?: string;
    sectionIndex?: number;
  };
  createdAt?: string;
  status: "draft" | "stable" | "deprecated";
  language: "en" | "ko";
};

export type PageRegistryItem = RegistryItem & {
  category: "page";
  pageType: "landing" | "lead-capture" | "auth" | "other";
  sections: Array<{
    id: string;
    category: string;
    order: number;
  }>;
  pageInfo?: {
    totalSections: number;
    estimatedHeight?: number;
    primaryColors?: string[];
    typography?: {
      headingFont: string;
      bodyFont: string;
    };
  };
};

export type RegistryIndex = Record<string, RegistryItem>;
export type CategoryIndex = Record<string, string[]>;
export type TagIndex = {
  functional: Record<string, string[]>;
  style: Record<string, string[]>;
  layout: Record<string, string[]>;
  industry: Record<string, string[]>;
};

// ============================================================================
// File Path Helpers
// ============================================================================

function getRegistryFilePath() {
  // Root: public/generated/registry.json
  return path.join(process.cwd(), "..", "..", "public", "generated", "registry.json");
}

function getPageRegistryFilePath() {
  // Root: public/generated/page-registry.json
  return path.join(process.cwd(), "..", "..", "public", "generated", "page-registry.json");
}

function getCategoryIndexFilePath() {
  // Root: public/generated/category-index.json
  return path.join(process.cwd(), "..", "..", "public", "generated", "category-index.json");
}

function getTagIndexFilePath() {
  // Root: public/generated/tag-index.json
  return path.join(process.cwd(), "..", "..", "public", "generated", "tag-index.json");
}

// ============================================================================
// Registry Loaders
// ============================================================================

/**
 * Load the main registry (Object format: { [name]: RegistryItem })
 */
export async function loadRegistryIndex(): Promise<RegistryIndex> {
  const filePath = getRegistryFilePath();
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as RegistryIndex;
}

/**
 * Load registry as array (for compatibility)
 */
export async function loadRegistryArray(): Promise<RegistryItem[]> {
  const registry = await loadRegistryIndex();
  return Object.values(registry);
}

/**
 * Load a single registry item by name
 */
export async function loadRegistryItem(name: string): Promise<RegistryItem | null> {
  const registry = await loadRegistryIndex();
  return registry[name] ?? null;
}

/**
 * Load page registry
 */
export async function loadPageRegistry(): Promise<Record<string, PageRegistryItem>> {
  const filePath = getPageRegistryFilePath();
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, PageRegistryItem>;
}

/**
 * Load category index
 */
export async function loadCategoryIndex(): Promise<CategoryIndex> {
  const filePath = getCategoryIndexFilePath();
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as CategoryIndex;
}

/**
 * Load tag index
 */
export async function loadTagIndex(): Promise<TagIndex> {
  const filePath = getTagIndexFilePath();
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as TagIndex;
}

// ============================================================================
// Query Helpers
// ============================================================================

/**
 * Get all components in a category
 */
export async function getComponentsByCategory(category: string): Promise<RegistryItem[]> {
  const registry = await loadRegistryIndex();
  const categoryIndex = await loadCategoryIndex();

  const componentNames = categoryIndex[category] || [];
  return componentNames
    .map(name => registry[name])
    .filter(Boolean);
}

/**
 * Get all components with a specific tag
 */
export async function getComponentsByTag(
  tagType: "functional" | "style" | "layout" | "industry",
  tag: string
): Promise<RegistryItem[]> {
  const registry = await loadRegistryIndex();
  const tagIndex = await loadTagIndex();

  const componentNames = tagIndex[tagType]?.[tag] || [];
  return componentNames
    .map(name => registry[name])
    .filter(Boolean);
}

/**
 * Search components by text (searches in searchableText field)
 */
export async function searchComponents(query: string): Promise<RegistryItem[]> {
  const registry = await loadRegistryArray();
  const lowerQuery = query.toLowerCase();

  return registry.filter(item =>
    item.searchableText.includes(lowerQuery)
  );
}
