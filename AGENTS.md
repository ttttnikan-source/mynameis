# AGENTS.md

## What this app is
HORIZON PROPERTIES — a premium real estate marketing site (React 18 + Vite + react-router v6, plain CSS).
No backend, no database, no external-service credentials required. All property/agent/team data lives in
`src/data.js` (single source of truth, easy to move to a real backend later).

## How to run
`docker compose -f docker-compose.base44.yml up -d` — the `web` service installs deps and runs `vite`
dev server on port 5173, mapped to host port 3000 (the preview entry point). Healthcheck probes `/`.
No migrations or seeds are needed.

## Verify the app works
- `curl http://localhost:3000/` returns the index.html shell (Vite serves source modules — live reload is on).
- `docker compose -f docker-compose.base44.yml ps` shows `web` as healthy.

## Quirks & conventions
- Styling: one global stylesheet `src/styles.css` with CSS custom properties as the design token system
  (navy `--navy`, champagne gold `--gold`, ivory, mist). Keep new styles there; no CSS framework.
- Fonts: Manrope via Google Fonts, loaded in `index.html`.
- Images: Unsplash-hosted photography via the `img()` helper in `src/data.js`.
- Components: `src/components/` (Header, Footer, Hero, About, FeaturedCarousel, Carousel, PropertyCard,
  Gallery, Services, Team, WhyChoose, CTA, Reveal). Pages: `src/pages/`.
- Reveal-on-scroll is `useReveal()` / `<Reveal>` (IntersectionObserver, adds `.in` class).
- Favorites persist in `localStorage` key `hp_favs`.
- The carousel is a custom drag-to-scroll implementation in `components/Carousel.jsx` — no carousel lib.
- `.gitignore` originally came from an Android template; `node_modules/`, `dist/` and `.base44/`-adjacent
  entries were appended — keep them.
