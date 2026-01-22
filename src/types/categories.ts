// ============================================================================
// Component Categories
// ============================================================================

export const ComponentCategory = [
  "hero",
  "stats",
  "testimonial",
  "pricing",
  "cta",
  "contact",
  "faq",
  "how-it-works",
  "biography",
  "before-after",
  "feature-showcase",
  "header",
  "footer",
  "gallery",
  "team",
  "logo-cloud",
  "newsletter",
  "waitlist",
  "page",
  "other",
] as const;

export type ComponentCategoryType = (typeof ComponentCategory)[number];

// ============================================================================
// Functional Tags (기능/인터랙션)
// ============================================================================

export const FunctionalTags = [
  "carousel",
  "slider",
  "tabs",
  "accordion",
  "modal",
  "dropdown",
  "toggle",
  "counter",
  "progress",
  "animation",
  "hover-effect",
  "scroll-animation",
  "auto-play",
  "email-capture",
  "lead-capture",
  "newsletter",
  "contact-form",
  "search",
  "filter",
  "pagination",
  "infinite-scroll",
  "drag-drop",
  "video",
  "audio",
  "map",
] as const;

export type FunctionalTag = (typeof FunctionalTags)[number];

// ============================================================================
// Style Tags (시각적 스타일)
// ============================================================================

export const StyleTags = [
  "dark-theme",
  "light-theme",
  "minimal",
  "modern",
  "retro",
  "elegant",
  "playful",
  "corporate",
  "bold",
  "gradient",
  "glassmorphism",
  "neumorphism",
  "glow",
  "shadow",
  "blur",
  "monochrome",
  "colorful",
  "neon",
  "pastel",
  "serif",
  "sans-serif",
  "handwritten",
] as const;

export type StyleTag = (typeof StyleTags)[number];

// ============================================================================
// Layout Tags (레이아웃)
// ============================================================================

export const LayoutTags = [
  "single-column",
  "two-column",
  "three-column",
  "four-column",
  "centered",
  "left-aligned",
  "right-aligned",
  "split-layout",
  "card-grid",
  "masonry",
  "bento",
  "stack",
  "inline",
  "full-width",
  "contained",
  "asymmetric",
  "responsive",
  "mobile-first",
] as const;

export type LayoutTag = (typeof LayoutTags)[number];

// ============================================================================
// Industry Tags (산업/용도)
// ============================================================================

export const IndustryTags = [
  "saas",
  "fintech",
  "e-commerce",
  "healthcare",
  "education",
  "creative",
  "portfolio",
  "agency",
  "startup",
  "enterprise",
  "personal",
  "blog",
  "news",
  "social",
  "gaming",
  "real-estate",
  "travel",
  "food",
  "fashion",
  "music",
  "ai",
  "crypto",
  "nft",
] as const;

export type IndustryTag = (typeof IndustryTags)[number];

// ============================================================================
// Component Status
// ============================================================================

export const ComponentStatus = ["draft", "stable", "deprecated"] as const;

export type ComponentStatusType = (typeof ComponentStatus)[number];

// ============================================================================
// Language
// ============================================================================

export const Language = ["en", "ko"] as const;

export type LanguageType = (typeof Language)[number];

// ============================================================================
// Combined Tags Type
// ============================================================================

export interface ComponentTags {
  functional?: FunctionalTag[];
  style?: StyleTag[];
  layout?: LayoutTag[];
  industry?: IndustryTag[];
}

// ============================================================================
// Helper Functions
// ============================================================================

export function isValidCategory(
  category: string
): category is ComponentCategoryType {
  return ComponentCategory.includes(category as ComponentCategoryType);
}

export function isValidStatus(
  status: string
): status is ComponentStatusType {
  return ComponentStatus.includes(status as ComponentStatusType);
}

export function isValidLanguage(language: string): language is LanguageType {
  return Language.includes(language as LanguageType);
}

export function isValidFunctionalTag(tag: string): tag is FunctionalTag {
  return FunctionalTags.includes(tag as FunctionalTag);
}

export function isValidStyleTag(tag: string): tag is StyleTag {
  return StyleTags.includes(tag as StyleTag);
}

export function isValidLayoutTag(tag: string): tag is LayoutTag {
  return LayoutTags.includes(tag as LayoutTag);
}

export function isValidIndustryTag(tag: string): tag is IndustryTag {
  return IndustryTags.includes(tag as IndustryTag);
}
