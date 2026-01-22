# Buriosa Registry Scripts Guide

> 업데이트된 빌드 스크립트 및 워크플로우 가이드

---

## 📦 Available Scripts

### Root Package Scripts

```bash
# Development
npm run dev              # Start Next.js dev server (no turbo)

# Build
npm run build            # Build for production (runs prebuild automatically)
npm run prebuild         # Auto-run before build (generates registry)
npm start               # Start production server
npm run lint            # Run ESLint

# Metadata & Registry (TypeScript)
npm run metadata:validate  # Validate all metadata.yaml files
npm run metadata:build     # Generate registry JSON files
npm run factory           # Full build: validate → build → sync

# Legacy (Python - deprecated)
npm run registry:build    # Old Python registry builder
npm run create           # Old Python component creator

# Registry Sync
npm run registry:sync    # Sync registry to web app

# Web App (Showroom)
npm run web:install      # Install web app dependencies
npm run web:dev         # Start web app dev server
npm run web:build       # Build web app
npm run web:start       # Start web app production server
```

### Web App Scripts (apps/web)

```bash
cd apps/web

npm run dev             # Start Next.js dev server (no turbo via cross-env)
npm run build           # Build for production
npm start              # Start production server
npm run lint           # Run ESLint
```

---

## 🔧 Workflow

### Development Workflow

```bash
# 1. Validate metadata
npm run metadata:validate

# 2. Generate registry
npm run metadata:build

# 3. Start development
npm run dev
# or for web app
npm run web:dev
```

### Production Build Workflow

```bash
# Single command (includes validation + build + sync)
npm run factory

# Or step by step
npm run metadata:validate
npm run metadata:build
npm run registry:sync
npm run build
```

### Quick Development

```bash
# prebuild runs automatically before build
npm run build

# Or just
npm run dev
```

---

## 📋 Script Details

### `metadata:validate`

**Command:** `tsx scripts/validate-metadata.ts`

**Purpose:** Validates all `metadata.yaml` files using Zod schemas

**Output:**
- ✓ Lists valid files
- ✗ Lists invalid files with detailed error messages
- Summary statistics

**Exit codes:**
- `0` - All files valid
- `1` - One or more files invalid

**Example:**
```bash
$ npm run metadata:validate

🔍 Validating Component Metadata

Found 1 metadata file(s)

Valid Files:
✓ sample-hero (d:\buriosa\src\components\registry\sample-hero\metadata.yaml)

Summary:
  ✓ Valid:   1/1
  ✗ Invalid: 0/1

✓ All metadata files are valid!
```

---

### `metadata:build`

**Command:** `tsx scripts/generate-registry.ts`

**Purpose:** Generates registry JSON files from metadata

**Output Files:**
- `public/generated/registry.json` - Component registry (Object format)
- `public/generated/page-registry.json` - Page registry
- `public/generated/category-index.json` - Category → component IDs
- `public/generated/tag-index.json` - Tag indices (4 categories)
- `public/generated/page-index.json` - Page → section IDs
- `public/generated/section-to-page.json` - Section → page mapping

**Features:**
- Validates metadata using Zod schemas
- Skips `draft: true` components
- Generates `searchableText` for search functionality
- Color-coded terminal output
- Comprehensive statistics

**Example:**
```bash
$ npm run metadata:build

📦 Building Registry

✓ Created output directory: d:\buriosa\public\generated

Found 1 component directories

✓ sample-hero

Building indices...
✓ Component registry: registry.json
✓ Page registry: page-registry.json
✓ Category index: category-index.json
✓ Tag index: tag-index.json
✓ Page index: page-index.json
✓ Section to page mapping: section-to-page.json

Summary:
  Components: 1
  Pages:      0
  Drafts:     0 (excluded)
  Skipped:    0 (invalid/missing metadata)
  Categories: 1
  Tags:       12

✓ Registry build complete!
```

---

### `prebuild`

**Command:** `pnpm metadata:build`

**Purpose:** Automatically runs before `npm run build`

**When it runs:**
- Automatically before `npm run build`
- Ensures registry is always up-to-date in production builds

---

### `factory`

**Command:** `pnpm metadata:validate && pnpm metadata:build && pnpm registry:sync`

**Purpose:** Complete build pipeline

**Steps:**
1. Validate all metadata files
2. Generate registry JSON files
3. Sync registry to web app

**Use case:** Manual full rebuild during development

---

## 📁 Generated Files Structure

```
public/generated/
├── registry.json              # Main component registry
│   └── { [name]: RegistryEntry }
├── page-registry.json         # Page components
│   └── { [name]: PageRegistryEntry }
├── category-index.json        # Category grouping
│   └── { [category]: string[] }
├── tag-index.json            # Tag indices
│   ├── functional: { [tag]: string[] }
│   ├── style: { [tag]: string[] }
│   ├── layout: { [tag]: string[] }
│   └── industry: { [tag]: string[] }
├── page-index.json           # Page → sections
│   └── { [pageName]: string[] }
└── section-to-page.json      # Section → page
    └── { [sectionName]: string }
```

---

## 🔍 Example Registry Entry

```json
{
  "sample-hero": {
    "id": "sample-hero",
    "name": "sample-hero",
    "category": "hero",
    "images": {
      "preview": "registry/preview/sample-hero.png"
    },
    "title": "Sample Hero",
    "description": {
      "short": "GitHub 스타일 워크스페이스를 위한 다크 테마 히어로 섹션",
      "detailed": "..."
    },
    "tags": {
      "functional": ["lead-capture", "hover-effect"],
      "style": ["dark-theme", "modern", "glow", "sans-serif"],
      "layout": ["centered", "full-width", "responsive"],
      "industry": ["saas", "startup", "personal"]
    },
    "freeformKeywords": ["github", "workspace", "log commit", "heatmap", "weekly review"],
    "searchableText": "sample-hero hero sample hero github ...",
    "fontFamily": ["system-ui"],
    "componentPath": "@/components/registry/sample-hero",
    "source": {
      "type": "manual"
    },
    "createdAt": "2025-01-20T00:00:00Z",
    "status": "stable",
    "language": "ko"
  }
}
```

---

## 🛠️ Dependencies

### Root Package

**devDependencies:**
- `tsx` - TypeScript execution
- `@types/js-yaml` - YAML type definitions
- `@types/node` - Node.js type definitions
- `typescript` - TypeScript compiler
- `tailwindcss`, `postcss`, `autoprefixer` - Styling

**dependencies:**
- `js-yaml` - YAML parsing
- `zod` - Schema validation
- `next-themes` - Theme management
- `tw-animate-css` - Animation utilities

### Web App (apps/web)

**dependencies:**
- `next` - Next.js framework
- `react`, `react-dom` - React
- `next-themes` - Theme management

**devDependencies:**
- `@tailwindcss/postcss` - Tailwind CSS v4
- `typescript` - TypeScript compiler
- `cross-env` - Cross-platform env vars
- `eslint`, `eslint-config-next` - Linting

---

## 🚀 Migration from Python to TypeScript

### Old (Python)
```bash
npm run registry:build    # py -3.13 scripts/registry-build.py
```

### New (TypeScript)
```bash
npm run metadata:build    # tsx scripts/generate-registry.ts
```

### Benefits of TypeScript Version:
- ✅ Type safety with Zod validation
- ✅ Better error messages
- ✅ Consistent tooling (no Python required)
- ✅ Faster execution
- ✅ Rich terminal output with colors
- ✅ More comprehensive index generation

---

## 📝 Notes

1. **prebuild hook** ensures registry is always built before production builds
2. **draft: true** components are automatically excluded from builds
3. **Zod validation** ensures metadata integrity
4. **searchableText** enables full-text search across all metadata
5. **Color-coded output** makes it easy to spot issues during development

---

*Last updated: 2025-01-20*
