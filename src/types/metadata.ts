import { z } from "zod";
import {
  ComponentCategory,
  ComponentStatus,
  Language,
  FunctionalTags,
  StyleTags,
  LayoutTags,
  IndustryTags,
} from "./categories";

// ============================================================================
// Base Schemas
// ============================================================================

const ImagesSchema = z.object({
  preview: z.string().optional(),
  thumbnail: z.string().optional(),
});

const DescriptionSchema = z.object({
  short: z.string().max(150).optional(),
  detailed: z.string().optional(),
});

const TagsSchema = z.object({
  functional: z.array(z.enum(FunctionalTags)).optional(),
  style: z.array(z.enum(StyleTags)).optional(),
  layout: z.array(z.enum(LayoutTags)).optional(),
  industry: z.array(z.enum(IndustryTags)).optional(),
});

const SourceSchema = z.object({
  type: z.enum(["url", "image", "manual", "framer"]),
  url: z.string().url().optional(),
  scrapedAt: z.string().datetime().optional(),
  sectionIndex: z.number().int().nonnegative().optional(),
});

// ============================================================================
// Section Component Metadata Schema
// ============================================================================

export const ComponentMetadataSchema = z.object({
  // Required fields
  schemaVersion: z.literal("2.0"),
  name: z.string().regex(/^[a-z0-9-]+$/, "Must be kebab-case"),
  category: z.enum(ComponentCategory),

  // Images
  images: ImagesSchema.optional(),

  // Optional fields
  title: z.string().optional(),
  description: DescriptionSchema.optional(),

  // Structured tags
  tags: TagsSchema.optional(),

  // Freeform keywords for search
  freeformKeywords: z.array(z.string()).optional(),

  // Font families used
  fontFamily: z.array(z.string()).optional(),

  // Parent page (for sections)
  parentPage: z.string().optional(),

  // Source information
  source: SourceSchema.optional(),

  // Metadata
  createdAt: z.string().datetime().optional(),
  status: z.enum(ComponentStatus).default("draft"),
  language: z.enum(Language).default("ko"),
  draft: z.boolean().default(false),
});

export type ComponentMetadata = z.infer<typeof ComponentMetadataSchema>;

// ============================================================================
// Page Component Metadata Schema
// ============================================================================

const PageSectionSchema = z.object({
  id: z.string(),
  category: z.enum(ComponentCategory),
  order: z.number().int().nonnegative(),
});

const PageInfoSchema = z.object({
  totalSections: z.number().int().positive(),
  estimatedHeight: z.number().int().positive().optional(),
  primaryColors: z.array(z.string()).optional(),
  typography: z
    .object({
      headingFont: z.string(),
      bodyFont: z.string(),
    })
    .optional(),
});

export const PageMetadataSchema = z.object({
  // Required fields
  schemaVersion: z.literal("2.0"),
  name: z.string().regex(/^[a-z0-9-]+$/, "Must be kebab-case"),
  category: z.literal("page"),
  pageType: z.enum(["landing", "lead-capture", "auth", "other"]),

  // Images
  images: ImagesSchema.optional(),

  // Optional fields
  title: z.string().optional(),
  description: DescriptionSchema.optional(),

  // Sections in this page
  sections: z.array(PageSectionSchema).optional(),

  // Page information
  pageInfo: PageInfoSchema.optional(),

  // Source information
  source: SourceSchema.optional(),

  // Structured tags
  tags: TagsSchema.optional(),

  // Metadata
  createdAt: z.string().datetime().optional(),
  status: z.enum(ComponentStatus).default("draft"),
  language: z.enum(Language).default("ko"),
  draft: z.boolean().default(false),
});

export type PageMetadata = z.infer<typeof PageMetadataSchema>;

// ============================================================================
// Registry Entry (Build Output)
// ============================================================================

export const RegistryEntrySchema = z.object({
  // Identity
  id: z.string(),
  name: z.string(),
  category: z.enum(ComponentCategory),

  // Images
  images: ImagesSchema,

  // Content
  title: z.string().optional(),
  description: DescriptionSchema.optional(),

  // Tags (normalized - always present with arrays)
  tags: z.object({
    functional: z.array(z.enum(FunctionalTags)),
    style: z.array(z.enum(StyleTags)),
    layout: z.array(z.enum(LayoutTags)),
    industry: z.array(z.enum(IndustryTags)),
  }),

  // Keywords and search
  freeformKeywords: z.array(z.string()),
  searchableText: z.string(),

  // Fonts
  fontFamily: z.array(z.string()),

  // Component path
  componentPath: z.string(),

  // Parent page (for sections)
  parentPage: z.string().optional(),

  // Source
  source: SourceSchema.optional(),

  // Metadata
  createdAt: z.string().datetime().optional(),
  status: z.enum(ComponentStatus),
  language: z.enum(Language),
});

export type RegistryEntry = z.infer<typeof RegistryEntrySchema>;

// ============================================================================
// Page Registry Entry
// ============================================================================

export const PageRegistryEntrySchema = RegistryEntrySchema.extend({
  category: z.literal("page"),
  pageType: z.enum(["landing", "lead-capture", "auth", "other"]),
  sections: z.array(PageSectionSchema),
  pageInfo: PageInfoSchema.optional(),
});

export type PageRegistryEntry = z.infer<typeof PageRegistryEntrySchema>;

// ============================================================================
// Index Types (Build Output)
// ============================================================================

export type RegistryIndex = Record<string, RegistryEntry>;

export type CategoryIndex = Record<string, string[]>;

export type TagIndex = {
  functional: Record<string, string[]>;
  style: Record<string, string[]>;
  layout: Record<string, string[]>;
  industry: Record<string, string[]>;
};

export type PageIndex = Record<string, string[]>; // page-name -> section IDs

export type SectionToPageIndex = Record<string, string>; // section-name -> page-name

// ============================================================================
// Validation Helpers
// ============================================================================

export function validateComponentMetadata(
  data: unknown
): ComponentMetadata | null {
  try {
    return ComponentMetadataSchema.parse(data);
  } catch (error) {
    console.error("Component metadata validation failed:", error);
    return null;
  }
}

export function validatePageMetadata(data: unknown): PageMetadata | null {
  try {
    return PageMetadataSchema.parse(data);
  } catch (error) {
    console.error("Page metadata validation failed:", error);
    return null;
  }
}

export function validateRegistryEntry(data: unknown): RegistryEntry | null {
  try {
    return RegistryEntrySchema.parse(data);
  } catch (error) {
    console.error("Registry entry validation failed:", error);
    return null;
  }
}

// ============================================================================
// Type Guards
// ============================================================================

export function isPageMetadata(
  metadata: ComponentMetadata | PageMetadata
): metadata is PageMetadata {
  return metadata.category === "page";
}

export function isPageRegistryEntry(
  entry: RegistryEntry | PageRegistryEntry
): entry is PageRegistryEntry {
  return entry.category === "page";
}
