# Aura

Static e-commerce landing page (Astro 5 + React 19 + Tailwind CSS 4).

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm astro check` | Run Astro type-checking |
| `pnpm test:e2e` | Run Playwright end-to-end tests against the production build |

Requires **Node >=22.12**.

## Architecture

- **Pages** (`src/pages/`): `index.astro` (main SPA-like page), `ComingSoon.astro`, `404.astro`.
- **Components** split at two levels:
  - `src/components/` — page-level sections (Navbar, Hero, ShopGrid, Custom, Footer, ProductPreview).
  - `src/components/ui/` — smaller reusable pieces (FooterBarcode, FooterBatchInfo, FooterLinkGrid, FooterTicker, FooterCutLine, FooterLegalLine, ProtocolHaltModal, GlichLetters, Product3d, ComingSoon, 404).
- **Interactive components** use `client:load` for eager hydration (Navbar, Hero, ShopGrid, Custom, Footer). A component without a `client:*` directive renders as static HTML, so its event handlers never run.
- **Smooth scrolling**: Lenis initialized in `src/layouts/Layout.astro` inline `<script>`.
- Layout mounts Lenis `raf` loop and handles `href^="#"` anchor scroll.

## Conventions

- **Package manager**: pnpm only. Lockfile is `pnpm-lock.yaml`.
- **Vite 6** is forced with the pnpm override `vite: ^6.4.5` in `package.json`. Astro uses its own Vite 8 internally.
- **Tailwind 4** native mode: `@import "tailwindcss"` (no PostCSS config). Uses `@theme` for custom fonts and `@utility` for custom utilities (e.g. `scrollbar-hidden`).
- **Custom fonts** (Montserrat, Syne) declared via `@font-face` in `src/styles/global.css`, assigned to Tailwind theme as `font-montserrat` / `font-syne`.
- **CSS**: Brutalist aesthetic — paper texture overlay, `mix-blend-mode: multiply`, all-caps headings with tight tracking.
- **TypeScript**: extends `astro/tsconfigs/strict`. JSX is `react-jsx`.
- **Tests**: Playwright end-to-end specs in `e2e/` (desktop and mobile projects). No unit tests and no lint/formatter config.
- **CI**: `.github/workflows/ci.yml` runs `pnpm install --frozen-lockfile`, `pnpm build` and `pnpm test:e2e` (job `check`) on pull requests to `dev` and `main`.

## Generated / ignored

- `dist/` — build output (gitignored)
- `.astro/` — generated Astro types (gitignored)
- `playwright-report/`, `test-results/`, `blob-report/` — Playwright output (gitignored)
- `.env`, `.env.production` — environment files (gitignored)
