# ZENTURO — 3D Luxury Car Portfolio Website

## Project Overview
ZENTURO is a fictional luxury car brand showcase website built to compete at Awwwards level. It features a 3D car model (GLB) rendered via React Three Fiber, scroll-driven animations via GSAP, and a dark luxury aesthetic with gold accents.

## Tech Stack
- **Framework:** React 19 + Vite
- **3D:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation:** GSAP + `@gsap/react` (ScrollTrigger for scroll-based animations)
- **Styling:** Tailwind CSS v4 (import-based, no tailwind.config.js — config lives in `src/index.css` under `@theme`)
- **Smooth scroll:** Lenis (if integrated)
- **Fonts:** Playfair Display (headings/brand), Space Grotesk (body/UI) — loaded via Google Fonts in `index.html`

## Design System

### Colors (defined in `src/index.css` `@theme` block)
| Token | Hex | Usage |
|-------|-----|-------|
| `zenturo-black` | `#0a0a0a` | Primary background |
| `zenturo-dark` | `#111111` | Secondary background / cards |
| `zenturo-gold` | `#c9a84c` | Primary accent, brand color |
| `zenturo-gold-light` | `#e0c068` | Hover states, highlights |
| `zenturo-gold-dim` | `#8a6d2b` | Subtle accents, borders |
| `zenturo-white` | `#f5f0e8` | Primary text (warm white) |
| `zenturo-gray` | `#888888` | Secondary text, muted elements |

### Typography
- **Brand / Headings:** `Playfair Display` (serif) — weights 400–900, italic for subheadings
- **Body / UI:** `Space Grotesk` (sans-serif) — weights 300–700
- **Never use:** system fonts, Inter, Roboto, Arial

### Design Principles
- Dark luxury aesthetic — black backgrounds, gold accents, warm white text
- Editorial typography with generous tracking on uppercase elements
- Subtle animations — nothing flashy or gimmicky, everything smooth and intentional
- The 3D car is the centerpiece — UI frames it, never competes with it
- Responsive: mobile (375px) through desktop (1920px+)

## Current Project Structure
```
zenturo/
├── public/
│   └── models/
│       └── car.glb                ← 3D car model (GLB from Sketchfab)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             ← ✅ BUILT — Fixed top nav, transparent → blur on scroll
│   │   ├── Hero.jsx               ← ✅ BUILT — Fullscreen hero with 3D car + text overlay
│   │   ├── CarScene.jsx           ← ✅ BUILT — R3F Canvas with car model, lighting, shadows
│   │   └── LoadingScreen.jsx      ← ✅ BUILT — Fullscreen loader, exits after model loads
│   ├── App.jsx                    ← ✅ BUILT — Root component, loading state management
│   ├── main.jsx                   ← ✅ BUILT
│   └── index.css                  ← ✅ BUILT — Tailwind v4 @theme config + global resets
├── index.html                     ← ✅ BUILT — Google Fonts loaded here
├── vite.config.js                 ← ✅ BUILT
└── package.json
```

## Sections Plan (5 total, built incrementally)
1. **Hero** — ✅ DONE — Fullscreen 3D car scene, brand intro, GSAP stagger text reveal
2. **About** — 🔲 NEXT — Brand story / philosophy section
3. **Gallery** — 🔲 TODO — Car models showcase
4. **Services** — 🔲 TODO — What the brand offers
5. **Contact** — 🔲 TODO — Contact form / footer

## Section Build Rules
- Each section is a separate component in `src/components/`
- Sections are added to `App.jsx` sequentially below the Hero
- Every section uses GSAP ScrollTrigger for scroll-based entrance animations
- Maintain color discipline — only palette colors, no random new colors
- All text animations use transform + opacity only (GPU-accelerated, 60fps)
- Each section should have a unique layout — no two sections should feel structurally similar

## Important Technical Notes
- Tailwind v4 uses `@import "tailwindcss"` syntax, NOT the old `@tailwind base/components/utilities` directives
- Custom colors are defined in the `@theme` block in `index.css`, accessed as `bg-zenturo-gold`, `text-zenturo-white`, etc.
- GSAP ScrollTrigger must be registered: `gsap.registerPlugin(ScrollTrigger)`
- Use `useGSAP` hook from `@gsap/react` for React integration (not raw useEffect)
- 3D model loaded via `useGLTF` from Drei — preloaded at module level
- Canvas is transparent — CSS background shows through

## Quality Bar
This site targets Awwwards recognition. Every section must have:
- Intentional, editorial-quality typography
- Smooth 60fps animations
- Thoughtful spacing and visual hierarchy
- At least one memorable design detail or interaction
- Mobile responsiveness that doesn't feel like an afterthought
