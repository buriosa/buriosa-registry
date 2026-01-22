# AGENTS.md

## Project Snapshot
- Repo: buriosa-registry (factory + showroom)
- Stack: Next.js (apps/web), TypeScript, Tailwind CSS, Zod
- Package manager: pnpm (Node 20 in CI)
- Python 3.13 used for legacy scripts
- Registry artifacts live in `public/generated/` and `public/registry/`

## Commands

### Install
- Root deps: `pnpm install`
- Web app deps: `pnpm -C apps/web install`
- Python deps (legacy scripts): `py -3.13 -m pip install -r requirements.txt`

### Dev
- Root dev server: `pnpm dev`
- Web app dev server: `pnpm web:dev`

### Build
- Root build (runs prebuild): `pnpm build`
- Web app build: `pnpm web:build`
- Full factory pipeline: `pnpm factory`

### Registry + Metadata
- Validate metadata: `pnpm metadata:validate`
- Build registry JSON: `pnpm metadata:build`
- Sync registry to web app: `pnpm registry:sync`
- Legacy Python registry build: `pnpm registry:build`

### Lint
- Root lint (Next lint): `pnpm lint`
- Web app lint: `pnpm -C apps/web lint`

### Tests
- Automated test runner: none configured
- Single test: not available (no test framework yet)
- Manual checks: run the dev server and validate metadata

### CI parity (Windows)
- `pnpm install && pnpm -C apps/web install && pnpm factory && pnpm -C apps/web build`

## File Generation Rules
- Do not hand-edit generated artifacts in `public/generated/`
- Do not hand-edit `apps/web/app/registry/registry-components.ts`
- Generated registry data comes from `scripts/generate-registry.ts`
- Use `pnpm metadata:build` to regenerate outputs

## Repository Structure
- `src/components/registry/[name]/index.tsx` component source
- `src/components/registry/[name]/metadata.yaml` registry metadata
- `scripts/` contains TS build/validate utilities
- `apps/web/` Next.js showroom (reads registry JSON)

## Code Style Guide

### Formatting
- Indentation: 2 spaces (4 spaces in Python)
- Line endings: LF, final newline required
- Quotes: double quotes in TS/JS
- Semicolons: use them consistently (current codebase does)
- Keep lines readable; wrap long chains for clarity

### Imports
- Order: built-ins, external packages, local modules
- Prefer `node:` prefix for Node built-ins in ESM scripts
- Use named imports for types and schemas
- Avoid unused imports; keep import groups tight

### TypeScript
- Default to TypeScript (scripts + app code)
- Prefer explicit types at module boundaries
- Use `as const` for literal arrays (see `src/types/categories.ts`)
- Keep Zod schemas authoritative for metadata validation
- Avoid `any`; use unions and inferred types where possible

### Naming
- Component folders: kebab-case (e.g., `sample-hero`)
- Metadata `name`: kebab-case, unique, schemaVersion "2.0"
- React components: PascalCase
- Functions/variables: camelCase
- Constants: SCREAMING_SNAKE_CASE or PascalCase object maps

### Metadata Conventions
- Use `schemaVersion: "2.0"`
- Tags are structured: `functional`, `style`, `layout`, `industry`
- Use enums from `src/types/categories.ts` for tags/categories
- `draft: true` excludes a component from registry builds
- Keep `description.short` <= 150 chars

### Error Handling
- Use `try/catch` for file IO and validation
- Emit concise warnings; use `DEBUG=1` for verbose output
- On fatal errors, log and exit with non-zero (`process.exit(1)`)
- Return `null` for invalid metadata in helper validators

### React/Next.js
- Add "use client" for client-only components
- Keep server components pure; do data loading in server layers
- Prefer `next-themes` theme provider patterns per `STYLING.md`

### Styling
- Follow design tokens and color system in `STYLING.md`
- Prefer Tailwind utility classes over custom CSS
- Use semantic tokens (e.g., `bg-background` not hex)
- Keep spacing on Tailwind’s scale (multiples of 4px)

### Registry Build Script Patterns
- Registry builders live in `scripts/` and use `tsx`
- Index generators normalize tags to arrays
- Searchable text combines name, category, description, tags
- Skip folders without `metadata.yaml`

## Operational Notes
- `pnpm metadata:build` writes to `public/generated/`
- `pnpm registry:sync` copies to `apps/web/public/registry/`
- CI runs on Windows; keep paths compatible
- Use `pnpm` (not npm/yarn) unless a script requires otherwise

## References
- `SCRIPTS.md` for detailed script behavior
- `STYLING.md` for UI style tokens
- `src/types/metadata.ts` for schema and validation rules

## Cursor/Copilot Rules
- No `.cursorrules`, `.cursor/rules/`, or `.github/copilot-instructions.md` found
