# Aura

Static e-commerce landing page (Astro 5 + React 19 + Tailwind CSS 4).

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm astro check` | Run Astro type-checking |

Requires **Node >=22.12**.

## Architecture

- **Pages** (`src/pages/`): `index.astro` (main SPA-like page), `ComingSoon.astro`, `404.astro`.
- **Components** split at two levels:
  - `src/components/` — page-level sections (Navbar, Hero, ShopGrid, Custom, About, Footer, ProductPreview).
  - `src/components/ui/` — smaller reusable pieces (FooterBarcode, FooterBatchInfo, FooterLinkGrid, FooterTicker, FooterCutLine, FooterLegalLine, ProtocolHaltModal, GlichLetters, Product3d, ComingSoon, 404).
- **Interactive components** use `client:load` for eager hydration (ShopGrid, Custom, Footer).
- **Smooth scrolling**: Lenis initialized in `src/layouts/Layout.astro` inline `<script>`.
- Layout mounts Lenis `raf` loop and handles `href^="#"` anchor scroll.

## Conventions

- **Package manager**: pnpm only. Lockfile is `pnpm-lock.yaml`.
- **Vite pinned** to 6.0.11 via pnpm overrides in `package.json`.
- **Tailwind 4** native mode: `@import "tailwindcss"` (no PostCSS config). Uses `@theme` for custom fonts and `@utility` for custom utilities (e.g. `scrollbar-hidden`).
- **Custom fonts** (Montserrat, Syne) declared via `@font-face` in `src/styles/global.css`, assigned to Tailwind theme as `font-montserrat` / `font-syne`.
- **CSS**: Brutalist aesthetic — paper texture overlay, `mix-blend-mode: multiply`, all-caps headings with tight tracking.
- **TypeScript**: extends `astro/tsconfigs/strict`. JSX is `react-jsx`.
- **No tests, no lint/formatter config, no CI** in this repo.

## Generated / ignored

- `dist/` — build output (gitignored)
- `.astro/` — generated Asto types (gitignored)
- `.env`, `.env.production` — environment files (gitignored)
