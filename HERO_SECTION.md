# Hero Section Documentation

> Beautiful hero section for the Buriosa Registry homepage

---

## 🎨 Overview

The hero section is designed to make a strong first impression with:
- Large, gradient text branding
- Dynamic component count badge
- Search bar with Command+K hint
- Popular keyword tags
- Smooth animations and hover effects

---

## 📐 Layout Structure

```
Hero Section
├── Badge (Component Count with animated pulse)
├── Title (Large gradient text)
├── Subtitle (Brand tagline)
├── Search Bar (Disabled, coming soon)
│   └── Command+K Shortcut Badge
└── Popular Tags (Filter chips)
```

---

## 🎯 Key Features

### 1. Dynamic Component Count Badge

```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
  </span>
  {items.length} components available
</div>
```

**Features:**
- Live count from registry
- Animated pulse indicator
- Subtle glassmorphic background

### 2. Gradient Title

```tsx
<h1 className="mb-6 text-center text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
  <span className="bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
    BURIOSA
  </span>
  <br />
  <span className="text-white/80">Registry</span>
</h1>
```

**Features:**
- Responsive font sizes (5xl → 6xl → 7xl)
- Gradient text effect on brand name
- Tight letter spacing for impact

### 3. Search Bar (Placeholder)

```tsx
<input
  type="text"
  placeholder="Search components..."
  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-32 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-primary/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
  disabled
/>
```

**Features:**
- Left-aligned search icon
- Right-aligned Command+K badge
- Glassmorphic background
- Focus states (for future implementation)
- Disabled state with "coming soon" hint

### 4. Popular Tags

```tsx
{popularTags.map((tag) => (
  <button
    key={tag}
    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 transition-all hover:border-primary/50 hover:bg-white/10 hover:text-white"
    disabled
  >
    {tag}
  </button>
))}
```

**Features:**
- Pill-shaped buttons
- Hover effects (border + background + text)
- Currently disabled (placeholder for future filtering)

---

## 🎨 Component Cards

### Card Structure

```tsx
<Link href={`/registry/${item.name}`} className="group ...">
  {/* Category Badge */}
  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
    {item.category}
  </span>

  {/* Status Badge */}
  <span className="text-xs text-green-400/70">
    {item.status}
  </span>

  {/* Title */}
  <h3 className="text-lg font-semibold text-white group-hover:text-primary">
    {item.title || item.name}
  </h3>

  {/* Description */}
  <p className="line-clamp-2 text-sm text-white/60">
    {item.description?.short}
  </p>

  {/* Tags */}
  <div className="flex flex-wrap gap-1.5">
    {tags.map(tag => <span>{tag}</span>)}
  </div>

  {/* Hover Arrow */}
  <svg className="opacity-0 group-hover:opacity-100">...</svg>
</Link>
```

**Card Features:**
- Glassmorphic background
- Category badge with primary color
- Status badge with color coding:
  - Stable: Green
  - Draft: Yellow
  - Deprecated: Red
- Hover effects:
  - Border changes to primary
  - Background brightens
  - Title color changes
  - Arrow appears
- Tag display (max 3 tags)
- Line-clamped description (2 lines max)

---

## 📱 Responsive Design

### Breakpoints

```tsx
// Hero Section
py-20 sm:py-28           // Vertical padding
text-5xl sm:text-6xl lg:text-7xl  // Title size

// Search Bar
max-w-2xl                // Constrained width

// Grid
sm:grid-cols-2 lg:grid-cols-3  // 1 → 2 → 3 columns
```

### Mobile Optimizations

- Single column grid on mobile
- Reduced padding on small screens
- Smaller title font size
- Stack popular tags
- Touch-friendly button sizes

---

## 🎭 Animations

### Badge Pulse

```tsx
<span className="animate-ping">...</span>
```

- Infinite pulse animation
- 75% opacity
- Primary color

### Gradient Overlay

```tsx
<div className="bg-linear-to-t from-background via-transparent to-transparent"></div>
```

- Smooth fade to content
- Pointer events disabled
- Absolute positioning

### Hover States

All interactive elements have smooth transitions:
```css
transition-all
hover:border-primary/50
hover:bg-white/10
hover:text-white
```

---

## 🎨 Color Palette

### Background Layers

```css
bg-background           /* #0d1117 - Base */
bg-white/5             /* Subtle cards */
bg-white/10            /* Hover states */
border-white/10        /* Borders */
```

### Text Colors

```css
text-white             /* Primary text */
text-white/80          /* Secondary title */
text-white/70          /* Meta text */
text-white/60          /* Description */
text-white/50          /* Muted text */
text-white/40          /* Placeholder */
```

### Accent Colors

```css
bg-primary             /* Blue accent */
text-primary           /* Blue text */
border-primary/50      /* Hover borders */
text-green-400/70      /* Stable status */
text-yellow-400/70     /* Draft status */
text-red-400/70        /* Deprecated status */
```

---

## 🔧 Technical Details

### Dependencies

```json
{
  "lucide-react": "^0.x.x"  // Search & Command icons
}
```

### Icons Used

- `Search` - Search bar icon
- `Command` - Keyboard shortcut indicator
- SVG arrow - Card hover indicator

### Tailwind CSS v4 Updates

Changed gradient classes:
- `bg-gradient-to-b` → `bg-linear-to-b`
- `bg-gradient-to-r` → `bg-linear-to-r`
- `bg-gradient-to-t` → `bg-linear-to-t`

---

## 🚀 Future Enhancements

### Search Functionality

```tsx
// TODO: Implement Command+K search
import { useHotkeys } from '@mantine/hooks';

useHotkeys([
  ['mod+K', () => openSearch()],
]);
```

### Tag Filtering

```tsx
// TODO: Implement tag-based filtering
const handleTagClick = (tag: string) => {
  router.push(`/?tag=${tag}`);
};
```

### Animations

- Stagger animation for cards
- Scroll-triggered fade-in
- Parallax effect on gradient

---

## 📊 Section Metrics

### Hero Section
- Height: ~600px desktop, ~500px mobile
- Max width: 1152px (6xl)
- Padding: 80-112px vertical

### Grid Section
- Max width: 1152px (6xl)
- Gap: 24px (gap-6)
- Columns: 1 / 2 / 3 (mobile / tablet / desktop)

---

## 🎯 Best Practices Applied

### Accessibility
- ✅ Semantic HTML (`<main>`, `<section>`, `<h1>`, etc.)
- ✅ Alt text for icons via aria-label (when needed)
- ✅ Keyboard navigation (Link components)
- ✅ Focus states defined

### Performance
- ✅ Server-side rendering (Next.js)
- ✅ Optimized images (when added)
- ✅ CSS-only animations
- ✅ No layout shift (fixed dimensions)

### SEO
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Descriptive text content
- ✅ Semantic markup

---

## 📝 Code Location

**Main File:** `apps/web/app/page.tsx`

**Related Files:**
- `apps/web/app/globals.css` - Global styles
- `apps/web/app/layout.tsx` - Root layout
- `apps/web/lib/registry.ts` - Data loading

---

*Last updated: 2025-01-20*
