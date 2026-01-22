# Buriosa Registry Styling Guide

> Global styles and design system documentation

---

## 🎨 Design Philosophy

Buriosa Registry follows the **monet.design** aesthetic:
- Dark theme by default (#0d1117 background)
- System font stack for optimal readability
- Smooth scrolling and subtle animations
- Minimal, professional UI

---

## 🌗 Color System

### Dark Theme (Default)

```css
--background: #0d1117     /* Main background */
--foreground: #f8fafc     /* Text color */
--card: #161b22          /* Card backgrounds */
--border: rgba(255,255,255,0.1)  /* Borders */
--primary: #3b82f6       /* Blue accent */
```

**Color Palette:**
- Background: `hsl(220 13% 7%)`  - #0d1117
- Foreground: `hsl(210 40% 98%)` - #f8fafc
- Card: `hsl(220 13% 9%)`        - #161b22
- Border: `hsl(217 10% 18%)`     - rgba(255,255,255,0.1)
- Primary: `hsl(217 91% 60%)`    - #3b82f6

### Light Theme (Optional)

```css
--background: #ffffff     /* White */
--foreground: #0a0a0a    /* Near black */
--card: #ffffff          /* White */
--border: #e5e5e5        /* Light gray */
```

---

## 📝 Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

**System fonts provide:**
- Native OS appearance
- Better performance (no web font loading)
- Optimal readability
- Consistent rendering

### Type Scale

```css
body: 16px / 1.6
h1: 2rem (32px)
h2: 1.5rem (24px)
h3: 1.25rem (20px)
```

---

## 🎯 Global Styles

### CSS Reset

```css
/* Box sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Remove default margins */
h1, h2, h3, h4, h5, h6, p, ul, ol {
  margin: 0;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Body defaults */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
}
```

### Responsive Design

```css
/* Container utility */
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
  max-width: 1400px;
}

/* Breakpoints */
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1400px
```

---

## 🔧 Tailwind Configuration

### Custom Theme Tokens

```css
@theme {
  --color-border: hsl(var(--border));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --radius-lg: 0.75rem;
  --radius-md: 0.5rem;
  --radius-sm: 0.25rem;

  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.15);
}
```

### Custom Variants

```css
/* Dark mode variant */
@custom-variant dark (&:is(.dark *));

/* Usage */
<div class="bg-white dark:bg-gray-900">
```

---

## 📦 Component Patterns

### Card Component

```tsx
<div className="rounded-xl border border-white/10 bg-white/5 p-6">
  <h2 className="text-lg font-medium">Title</h2>
  <p className="mt-2 text-sm text-white/70">Description</p>
</div>
```

### Button Styles

```tsx
/* Primary */
<button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
  Click me
</button>

/* Secondary */
<button className="rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5">
  Cancel
</button>
```

### Link Styles

```tsx
<a className="text-white/70 hover:text-white hover:underline">
  Learn more
</a>
```

---

## 🌐 Layout Structure

### Root Layout

```tsx
<html lang="ko" suppressHydrationWarning>
  <body className="antialiased">
    <ThemeProvider defaultTheme="dark">
      <div className="relative min-h-screen">
        {children}
      </div>
    </ThemeProvider>
  </body>
</html>
```

**Key features:**
- `antialiased` - Smooth font rendering
- `suppressHydrationWarning` - Prevents hydration warnings with theme
- `relative min-h-screen` - Full viewport height container

---

## 🎭 Theme Provider

### Configuration

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem
  disableTransitionOnChange
>
```

**Options:**
- `attribute="class"` - Uses class-based theme switching
- `defaultTheme="dark"` - Dark theme by default
- `enableSystem` - Respects OS preference
- `disableTransitionOnChange` - Prevents flash of unstyled content

### Usage

```tsx
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  )
}
```

---

## 📐 Spacing System

Tailwind's default spacing scale:

```
0: 0px
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
```

**Common patterns:**
- `p-6` - Padding all sides 24px
- `px-4 py-2` - Horizontal 16px, vertical 8px
- `gap-4` - Grid/flex gap 16px
- `space-y-4` - Vertical spacing between children 16px

---

## 🎨 Color Usage Guidelines

### Text Colors

```tsx
/* Primary text */
<p className="text-foreground">Main content</p>

/* Secondary text */
<p className="text-white/70">Supporting text</p>

/* Muted text */
<p className="text-white/50">Subtle text</p>

/* Accent text */
<a className="text-primary">Link</a>
```

### Background Colors

```tsx
/* Main background */
<div className="bg-background">

/* Card backgrounds */
<div className="bg-white/5">

/* Hover states */
<button className="hover:bg-white/10">
```

### Border Colors

```tsx
/* Subtle borders */
<div className="border border-white/10">

/* Stronger borders */
<div className="border border-white/20">
```

---

## 🔍 Best Practices

### Do's ✅

- Use system font stack for body text
- Maintain consistent spacing (multiples of 4px)
- Use semantic color tokens (e.g., `bg-background` not `bg-[#0d1117]`)
- Keep border radius consistent (0.75rem)
- Use opacity for text hierarchy (100%, 70%, 50%)

### Don'ts ❌

- Don't mix HSL and RGB color formats
- Don't use arbitrary values unless necessary
- Don't override global styles in components
- Don't use `!important` unless absolutely needed
- Don't forget hover/focus states

---

## 📱 Responsive Design

### Mobile-First Approach

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Breakpoint Usage

```tsx
/* Base: mobile */
className="text-base"

/* Tablet and up */
className="md:text-lg"

/* Desktop and up */
className="lg:text-xl"
```

---

## 🚀 Performance

### Optimizations

1. **System fonts** - No web font loading
2. **CSS-in-CSS** - No runtime CSS-in-JS overhead
3. **Tailwind purging** - Only used classes in production
4. **Smooth scrolling** - Hardware accelerated

### Metrics to watch

- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

---

## 📚 Related Files

- [apps/web/app/globals.css](apps/web/app/globals.css) - Global styles
- [apps/web/app/layout.tsx](apps/web/app/layout.tsx) - Root layout
- [tailwind.config.ts](apps/web/tailwind.config.ts) - Tailwind configuration
- [apps/web/components/theme-provider.tsx](apps/web/components/theme-provider.tsx) - Theme context

---

*Last updated: 2025-01-20*
