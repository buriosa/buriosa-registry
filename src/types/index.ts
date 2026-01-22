// ============================================================================
// Barrel file for type exports
// ============================================================================

// Re-export all categories and tags
export {
  ComponentCategory,
  ComponentStatus,
  Language,
  FunctionalTags,
  StyleTags,
  LayoutTags,
  IndustryTags,
  type ComponentCategoryType,
  type ComponentStatusType,
  type LanguageType,
  type FunctionalTag,
  type StyleTag,
  type LayoutTag,
  type IndustryTag,
  type ComponentTags,
  isValidCategory,
  isValidStatus,
  isValidLanguage,
  isValidFunctionalTag,
  isValidStyleTag,
  isValidLayoutTag,
  isValidIndustryTag,
} from "./categories";

// Re-export all metadata schemas and types
export {
  ComponentMetadataSchema,
  PageMetadataSchema,
  RegistryEntrySchema,
  PageRegistryEntrySchema,
  type ComponentMetadata,
  type PageMetadata,
  type RegistryEntry,
  type PageRegistryEntry,
  type RegistryIndex,
  type CategoryIndex,
  type TagIndex,
  type PageIndex,
  type SectionToPageIndex,
  validateComponentMetadata,
  validatePageMetadata,
  validateRegistryEntry,
  isPageMetadata,
  isPageRegistryEntry,
} from "./metadata";
