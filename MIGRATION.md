# Registry Structure Migration Guide

> Migration from `public/registry/index.json` (array) to `public/generated/` (multiple indices)

---

## 📋 What Changed

### Old Structure (Deprecated)

```
public/registry/
└── index.json          # Single array file
```

**Format:**
```json
[
  {
    "name": "sample-hero",
    "category": "hero",
    // ... other fields
  }
]
```

### New Structure (Current)

```
public/generated/
├── registry.json              # Object format: { [name]: RegistryEntry }
├── page-registry.json         # Pages only
├── category-index.json        # { [category]: string[] }
├── tag-index.json            # Structured tag indices
├── page-index.json           # { [pageName]: sectionIds[] }
└── section-to-page.json      # { [sectionId]: pageName }
```

**Format:**
```json
{
  "sample-hero": {
    "id": "sample-hero",
    "name": "sample-hero",
    "category": "hero",
    // ... other fields
  }
}
```

---

## 🔧 Code Changes

### 1. Web App Library (`apps/web/lib/registry.ts`)

**Before:**
```typescript
export async function loadRegistryIndex(): Promise<RegistryItem[]> {
  const filePath = path.join(process.cwd(), "public", "registry", "index.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(raw);

  if (Array.isArray(data)) return data as RegistryItem[];
  return [];
}
```

**After:**
```typescript
export async function loadRegistryIndex(): Promise<RegistryIndex> {
  const filePath = path.join(process.cwd(), "..", "..", "public", "generated", "registry.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as RegistryIndex;
}

// For backward compatibility
export async function loadRegistryArray(): Promise<RegistryItem[]> {
  const registry = await loadRegistryIndex();
  return Object.values(registry);
}
```

### 2. Page Components

**Before:**
```typescript
import { loadRegistryIndex } from "../lib/registry";

const items = await loadRegistryIndex(); // Returns array
items.map(item => ...)
```

**After:**
```typescript
import { loadRegistryArray } from "../lib/registry";

const items = await loadRegistryArray(); // Returns array
items.map(item => ...)

// OR use the new index format directly
import { loadRegistryIndex } from "../lib/registry";

const registry = await loadRegistryIndex(); // Returns object
Object.values(registry).map(item => ...)
```

### 3. Updated Files

- ✅ `apps/web/lib/registry.ts` - Complete rewrite with new structure
- ✅ `apps/web/app/page.tsx` - Changed to use `loadRegistryArray()`
- ✅ `apps/web/app/registry/[name]/page.tsx` - Already using `loadRegistryItem()` (no change needed)
- ✅ `apps/web/.gitignore` - Commented out old path
- ✅ `.gitignore` - Added `public/generated/`

---

## 🆕 New Features

### Enhanced Type Definitions

```typescript
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
  searchableText: string;        // NEW: for search
  fontFamily: string[];
  componentPath: string;
  parentPage?: string;
  source?: { ... };
  createdAt?: string;
  status: "draft" | "stable" | "deprecated";
  language: "en" | "ko";
};
```

### New Query Functions

```typescript
// Load by category
const heroComponents = await getComponentsByCategory("hero");

// Load by tag
const darkThemeComponents = await getComponentsByTag("style", "dark-theme");

// Search
const searchResults = await searchComponents("github workspace");

// Load indices directly
const categoryIndex = await loadCategoryIndex();
const tagIndex = await loadTagIndex();
const pageRegistry = await loadPageRegistry();
```

---

## 🚀 Benefits

### Performance
- **Faster lookups** - Object access O(1) vs Array search O(n)
- **Pre-built indices** - No runtime filtering/grouping
- **Smaller payloads** - Load only what you need

### Features
- **Full-text search** - `searchableText` field combines all metadata
- **Tag filtering** - Direct access via tag indices
- **Category grouping** - Pre-built category index
- **Page support** - Separate page registry with sections

### Developer Experience
- **Type safety** - Comprehensive TypeScript types
- **Better API** - Query functions for common operations
- **Validation** - Zod schemas ensure data integrity
- **Documentation** - JSDoc comments on all functions

---

## 📦 Build Process

### Old (Python)
```bash
npm run registry:build  # py -3.13 scripts/registry-build.py
# → public/registry/index.json (array)
```

### New (TypeScript)
```bash
npm run metadata:build  # tsx scripts/generate-registry.ts
# → public/generated/*.json (6 files)
```

**Automatic build:**
```bash
npm run build  # Runs prebuild automatically
```

---

## 🔄 Migration Checklist

- [x] Create new `public/generated/` structure
- [x] Update `scripts/generate-registry.ts` to generate all indices
- [x] Rewrite `apps/web/lib/registry.ts` with new API
- [x] Update all pages using registry (`page.tsx`, etc.)
- [x] Update `.gitignore` files
- [x] Add `prebuild` script to package.json
- [x] Test all registry loading functions
- [x] Document new structure

---

## 📝 Example: Loading Registry

### Basic Usage

```typescript
import { loadRegistryArray } from "@/lib/registry";

export default async function Page() {
  const items = await loadRegistryArray();

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h2>{item.title || item.name}</h2>
          <p>{item.description?.short}</p>
        </div>
      ))}
    </div>
  );
}
```

### Advanced Usage

```typescript
import {
  getComponentsByCategory,
  getComponentsByTag,
  searchComponents
} from "@/lib/registry";

// By category
const heros = await getComponentsByCategory("hero");

// By tag
const darkTheme = await getComponentsByTag("style", "dark-theme");
const saas = await getComponentsByTag("industry", "saas");

// Search
const results = await searchComponents("github dark theme");
```

---

## 🔍 Debugging

### Check Generated Files
```bash
ls -la public/generated/
# Should show 6 JSON files
```

### Verify Registry Format
```bash
cat public/generated/registry.json
# Should be Object format: { "name": { ... } }
```

### Test Loading
```bash
cd apps/web
npm run dev
# Visit http://localhost:3000
```

---

## 📚 Related Documentation

- [SCRIPTS.md](SCRIPTS.md) - Build scripts reference
- [CLAUDE.md](CLAUDE.md) - Monet Registry analysis
- [src/types/metadata.ts](src/types/metadata.ts) - Type definitions
- [scripts/generate-registry.ts](scripts/generate-registry.ts) - Build script

---

*Migration completed: 2025-01-20*
