#!/usr/bin/env tsx

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import {
  ComponentMetadata,
  PageMetadata,
  RegistryEntry,
  PageRegistryEntry,
  RegistryIndex,
  CategoryIndex,
  TagIndex,
  PageIndex,
  SectionToPageIndex,
  ComponentMetadataSchema,
  PageMetadataSchema,
} from "../src/types/metadata";

// ============================================================================
// Colors for terminal output
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

// ============================================================================
// Helper Functions
// ============================================================================

function buildSearchableText(metadata: ComponentMetadata | PageMetadata): string {
  const parts: string[] = [
    metadata.name,
    metadata.category,
    metadata.title || "",
    metadata.description?.short || "",
    metadata.description?.detailed || "",
    ...(metadata.tags?.functional || []),
    ...(metadata.tags?.style || []),
    ...(metadata.tags?.layout || []),
    ...(metadata.tags?.industry || []),
    ...(metadata.freeformKeywords || []),
    ...(metadata.fontFamily || []),
  ];
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function parseMetadataFile(
  componentName: string,
  metadataPath: string
): { metadata: ComponentMetadata | PageMetadata; isPage: boolean } | null {
  try {
    const content = fs.readFileSync(metadataPath, "utf-8");
    const data = yaml.load(content);

    if (!data || typeof data !== "object") {
      console.warn(
        `${colors.yellow}⚠${colors.reset} Skipping ${componentName}: Invalid YAML format`
      );
      return null;
    }

    // Determine if it's a page or component
    const isPage = (data as any).category === "page";

    // Validate with appropriate schema
    try {
      if (isPage) {
        const metadata = PageMetadataSchema.parse(data);
        return { metadata, isPage: true };
      } else {
        const metadata = ComponentMetadataSchema.parse(data);
        return { metadata, isPage: false };
      }
    } catch (error) {
      console.warn(
        `${colors.yellow}⚠${colors.reset} Skipping ${componentName}: Validation failed`
      );
      if (process.env.DEBUG) {
        console.error(error);
      }
      return null;
    }
  } catch (error) {
    console.warn(
      `${colors.yellow}⚠${colors.reset} Skipping ${componentName}: Failed to read file`
    );
    if (process.env.DEBUG && error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

function buildRegistryEntry(
  componentName: string,
  metadata: ComponentMetadata
): RegistryEntry {
  return {
    id: componentName,
    name: metadata.name,
    category: metadata.category,
    images: metadata.images || {},
    title: metadata.title,
    description: metadata.description,
    tags: {
      functional: metadata.tags?.functional || [],
      style: metadata.tags?.style || [],
      layout: metadata.tags?.layout || [],
      industry: metadata.tags?.industry || [],
    },
    freeformKeywords: metadata.freeformKeywords || [],
    searchableText: buildSearchableText(metadata),
    fontFamily: metadata.fontFamily || [],
    componentPath: `@/components/registry/${componentName}`,
    parentPage: metadata.parentPage,
    source: metadata.source,
    createdAt: metadata.createdAt,
    status: metadata.status,
    language: metadata.language,
  };
}

function buildPageRegistryEntry(
  componentName: string,
  metadata: PageMetadata
): PageRegistryEntry {
  return {
    id: componentName,
    name: metadata.name,
    category: "page",
    pageType: metadata.pageType,
    images: metadata.images || {},
    title: metadata.title,
    description: metadata.description,
    tags: {
      functional: metadata.tags?.functional || [],
      style: metadata.tags?.style || [],
      layout: metadata.tags?.layout || [],
      industry: metadata.tags?.industry || [],
    },
    freeformKeywords: metadata.freeformKeywords || [],
    searchableText: buildSearchableText(metadata),
    fontFamily: metadata.fontFamily || [],
    componentPath: `@/components/registry/${componentName}`,
    sections: metadata.sections || [],
    pageInfo: metadata.pageInfo,
    source: metadata.source,
    createdAt: metadata.createdAt,
    status: metadata.status,
    language: metadata.language,
  };
}

// ============================================================================
// Index Builders
// ============================================================================

function buildCategoryIndex(
  registry: RegistryIndex,
  pageRegistry: Record<string, PageRegistryEntry>
): CategoryIndex {
  const categoryIndex: CategoryIndex = {};

  // Add components
  for (const [name, entry] of Object.entries(registry)) {
    if (!categoryIndex[entry.category]) {
      categoryIndex[entry.category] = [];
    }
    categoryIndex[entry.category].push(name);
  }

  // Add pages
  for (const [name, entry] of Object.entries(pageRegistry)) {
    if (!categoryIndex[entry.category]) {
      categoryIndex[entry.category] = [];
    }
    categoryIndex[entry.category].push(name);
  }

  return categoryIndex;
}

function buildTagIndex(
  registry: RegistryIndex,
  pageRegistry: Record<string, PageRegistryEntry>
): TagIndex {
  const tagIndex: TagIndex = {
    functional: {},
    style: {},
    layout: {},
    industry: {},
  };

  // Process components
  for (const [name, entry] of Object.entries(registry)) {
    // Functional tags
    for (const tag of entry.tags.functional) {
      if (!tagIndex.functional[tag]) {
        tagIndex.functional[tag] = [];
      }
      tagIndex.functional[tag].push(name);
    }

    // Style tags
    for (const tag of entry.tags.style) {
      if (!tagIndex.style[tag]) {
        tagIndex.style[tag] = [];
      }
      tagIndex.style[tag].push(name);
    }

    // Layout tags
    for (const tag of entry.tags.layout) {
      if (!tagIndex.layout[tag]) {
        tagIndex.layout[tag] = [];
      }
      tagIndex.layout[tag].push(name);
    }

    // Industry tags
    for (const tag of entry.tags.industry) {
      if (!tagIndex.industry[tag]) {
        tagIndex.industry[tag] = [];
      }
      tagIndex.industry[tag].push(name);
    }
  }

  // Process pages
  for (const [name, entry] of Object.entries(pageRegistry)) {
    // Functional tags
    for (const tag of entry.tags.functional) {
      if (!tagIndex.functional[tag]) {
        tagIndex.functional[tag] = [];
      }
      tagIndex.functional[tag].push(name);
    }

    // Style tags
    for (const tag of entry.tags.style) {
      if (!tagIndex.style[tag]) {
        tagIndex.style[tag] = [];
      }
      tagIndex.style[tag].push(name);
    }

    // Layout tags
    for (const tag of entry.tags.layout) {
      if (!tagIndex.layout[tag]) {
        tagIndex.layout[tag] = [];
      }
      tagIndex.layout[tag].push(name);
    }

    // Industry tags
    for (const tag of entry.tags.industry) {
      if (!tagIndex.industry[tag]) {
        tagIndex.industry[tag] = [];
      }
      tagIndex.industry[tag].push(name);
    }
  }

  return tagIndex;
}

function buildPageIndex(
  pageRegistry: Record<string, PageRegistryEntry>
): PageIndex {
  const pageIndex: PageIndex = {};

  for (const [name, entry] of Object.entries(pageRegistry)) {
    pageIndex[name] = entry.sections.map((section) => section.id);
  }

  return pageIndex;
}

function buildSectionToPageIndex(
  pageRegistry: Record<string, PageRegistryEntry>
): SectionToPageIndex {
  const sectionToPageIndex: SectionToPageIndex = {};

  for (const [pageName, entry] of Object.entries(pageRegistry)) {
    for (const section of entry.sections) {
      sectionToPageIndex[section.id] = pageName;
    }
  }

  return sectionToPageIndex;
}

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  console.log(
    `${colors.bright}${colors.blue}📦 Building Registry${colors.reset}\n`
  );

  const registryDir = path.join(process.cwd(), "src/components/registry");
  const outputDir = path.join(process.cwd(), "public/generated");

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`${colors.green}✓${colors.reset} Created output directory: ${outputDir}\n`);
  }

  // Find all component directories
  if (!fs.existsSync(registryDir)) {
    console.error(
      `${colors.red}✗${colors.reset} Registry directory not found: ${registryDir}`
    );
    process.exit(1);
  }

  const componentDirs = fs
    .readdirSync(registryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  console.log(
    `Found ${colors.cyan}${componentDirs.length}${colors.reset} component directories\n`
  );

  // Build registries
  const registry: RegistryIndex = {};
  const pageRegistry: Record<string, PageRegistryEntry> = {};
  let skippedCount = 0;
  let draftCount = 0;

  for (const name of componentDirs) {
    const metadataPath = path.join(registryDir, name, "metadata.yaml");

    if (!fs.existsSync(metadataPath)) {
      console.log(
        `${colors.dim}⊘${colors.reset} ${name} ${colors.dim}(no metadata.yaml)${colors.reset}`
      );
      skippedCount++;
      continue;
    }

    const result = parseMetadataFile(name, metadataPath);

    if (!result) {
      skippedCount++;
      continue;
    }

    const { metadata, isPage } = result;

    // Skip drafts
    if (metadata.draft === true) {
      console.log(
        `${colors.dim}⊘${colors.reset} ${name} ${colors.yellow}(draft)${colors.reset}`
      );
      draftCount++;
      continue;
    }

    // Build entry
    if (isPage) {
      const entry = buildPageRegistryEntry(name, metadata as PageMetadata);
      pageRegistry[name] = entry;
      console.log(
        `${colors.green}✓${colors.reset} ${name} ${colors.cyan}(page)${colors.reset}`
      );
    } else {
      const entry = buildRegistryEntry(name, metadata as ComponentMetadata);
      registry[name] = entry;
      console.log(`${colors.green}✓${colors.reset} ${name}`);
    }
  }

  console.log();

  // Build indices
  console.log(`${colors.bright}Building indices...${colors.reset}`);

  const categoryIndex = buildCategoryIndex(registry, pageRegistry);
  const tagIndex = buildTagIndex(registry, pageRegistry);
  const pageIndex = buildPageIndex(pageRegistry);
  const sectionToPageIndex = buildSectionToPageIndex(pageRegistry);

  // Write output files
  const outputFiles = [
    {
      name: "registry.json",
      data: registry,
      description: "Component registry",
    },
    {
      name: "page-registry.json",
      data: pageRegistry,
      description: "Page registry",
    },
    {
      name: "category-index.json",
      data: categoryIndex,
      description: "Category index",
    },
    {
      name: "tag-index.json",
      data: tagIndex,
      description: "Tag index",
    },
    {
      name: "page-index.json",
      data: pageIndex,
      description: "Page index",
    },
    {
      name: "section-to-page.json",
      data: sectionToPageIndex,
      description: "Section to page mapping",
    },
  ];

  for (const file of outputFiles) {
    const filePath = path.join(outputDir, file.name);
    fs.writeFileSync(filePath, JSON.stringify(file.data, null, 2));
    console.log(
      `${colors.green}✓${colors.reset} ${file.description}: ${colors.dim}${file.name}${colors.reset}`
    );
  }

  // Summary
  console.log(`\n${colors.bright}Summary:${colors.reset}`);
  console.log(
    `  ${colors.green}Components:${colors.reset} ${Object.keys(registry).length}`
  );
  console.log(
    `  ${colors.cyan}Pages:${colors.reset}      ${Object.keys(pageRegistry).length}`
  );
  console.log(
    `  ${colors.yellow}Drafts:${colors.reset}     ${draftCount} (excluded)`
  );
  console.log(
    `  ${colors.dim}Skipped:${colors.reset}    ${skippedCount} (invalid/missing metadata)`
  );
  console.log(
    `  ${colors.blue}Categories:${colors.reset} ${Object.keys(categoryIndex).length}`
  );

  const totalTags =
    Object.keys(tagIndex.functional).length +
    Object.keys(tagIndex.style).length +
    Object.keys(tagIndex.layout).length +
    Object.keys(tagIndex.industry).length;
  console.log(`  ${colors.blue}Tags:${colors.reset}       ${totalTags}`);

  console.log(
    `\n${colors.green}${colors.bright}✓ Registry build complete!${colors.reset}`
  );
}

// ============================================================================
// Run
// ============================================================================

main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
