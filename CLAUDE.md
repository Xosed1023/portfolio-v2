# Portfolio v3 — Project Rules

## Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion v11
- Fonts: Poppins (headings) + Nunito (body) via `next/font/google`
- Images: use Next.js `<Image>` with WebP format. PNG originals exist but WebP versions are in `public/`
- Notion API (`@notionhq/client`) for project data in `/servicios` and `WebSection` 

## Architecture

### Pages
- `/` — single-page portfolio with custom scroll container (`#scroll-container`, `overflow: scroll`, scroll-snap)
  - All in-page navigation uses `scrollTo({ top: N })` on `#scroll-container`, NOT `window.scrollTo`
- `/servicios` — standalone services page, normal document scroll (no snap, no overflow:hidden)

### Navigation between pages
- Use `<TransitionLink href="...">` instead of `<Link>` or `<a>` for internal navigation
- `TransitionLink` prefetches on hover + triggers the black-overlay page transition
- Never use `<Link>` from next/link for cross-page navigation — it bypasses the transition

### Page transition system (`components/PageTransition.tsx`)
- Provider wraps the whole app in `layout.tsx`
- Instant cut to black (no fade-in) → `router.push` → 150ms hold → 420ms fade-out
- Uses imperative CSS on a plain `div` ref — do NOT switch to Framer Motion (causes re-render conflicts)
- `getBoundingClientRect()` forces a browser repaint so black frame paints before navigation

## Performance rules
- No `backdropFilter: blur(...)` on cards/panels — kills GPU performance
- Aurora canvas: mobile and desktop gets ≤8 orbs this for better performance; Resize is debounced 200ms
- Mousemove handlers must use RAF throttling (`rafPending` ref pattern in HeroSection)
- Notion API calls have a 3s timeout via `Promise.race`
- All images: `loading="lazy" decoding="async"` except hero/LCP images which use `priority`
- IntroLoader duration: 1200ms (not longer)

## Image paths
- Portrait: `/portrait.webp` (149 KB)
- Web project screenshots: `/websites-previews/ipm.webp`, `/websites-previews/betplay.webp`
- Notion API returns PNG paths — `lib/notion.ts` normalizes them to `.webp` via `.replace(/\.png$/i, ".webp")`

## Project data
- Static web projects: `lib/web-projects.ts` — source of truth for `/servicios` project cards
- Dynamic projects (from Notion): fetched in `app/page.tsx` via `lib/notion.ts` with ISR

## Styling conventions
- Design: dark SpaceX-inspired aesthetic, background `#0a0a0a`
- Gold accent: `#c9a84c` (used for CTAs, highlights)
- Tailwind classes preferred; inline styles only for dynamic/animated values
- No `overflow: hidden` on section wrappers in `/servicios` — content is taller than viewport

## Do not
- Add `body { overflow: hidden }` in `/servicios` — breaks natural scroll
- Use `window.scrollTo` in the portfolio — always target `#scroll-container`
- Add `backdropFilter` to card components
- Use `<Link>` for cross-page navigation (use `TransitionLink`)
- Commit `tsconfig.tsbuildinfo`
- No commit changes without user confirmation