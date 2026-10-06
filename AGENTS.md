# Horizon Properties — Dubai Luxury Real Estate

## Tech Stack
- **Vite + React 18 + TypeScript** — frontend framework
- **Tailwind CSS 3** — styling (custom navy/gold theme in `tailwind.config.js`)
- **React Router DOM v6** — client-side routing
- **Framer Motion** — animations (currently using CSS transitions + IntersectionObserver)
- **Lucide React** — icons

## Development
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The app runs on port 3000 via Vite dev server with live reload. Dependencies install on container startup (`npm install` in the command).

## Project Structure
- `src/data/` — demo data (properties, communities, agents, services, testimonials, articles)
- `src/components/` — shared UI components (Header, Footer, Hero, PropertyCard, etc.)
- `src/pages/` — route pages (Home, Properties, PropertyDetail, Communities, etc.)
- `src/context/FavoritesContext.tsx` — favorites state (in-memory)

## Key Design Decisions
- All property/community images use Unsplash URLs (no local image assets)
- Favorites are stored in-memory (React context) — not persisted
- Property search filters pass via URL query params from hero → properties page
- The floating search bar on the hero uses `translate-y-1/2` to overlap sections — a spacer div follows the hero
- Home hero is a scroll-scrubbed video (`public/videos/hero.mp4`, 4.1s): a 320vh section pins a sticky 100vh viewport; scroll progress drives `video.currentTime` via rAF + smoothing in `src/components/Hero.tsx` (never `video.play()`). `prefers-reduced-motion` users get the static image hero. Fallback: Unsplash image layer under the video

## Color System
- Navy: `#082B4C` (primary), `#051A2E` (deep/footer)
- Gold: `#C9A45C` (accent)
- Mist: `#EEF4F8` (soft background)
- Off-white: `#F7F8FA`

## Routes
- `/` — Home
- `/properties` — Property listing with filters
- `/properties/:slug` — Property detail
- `/communities` — Community grid
- `/communities/:slug` — Community detail
- `/about` — About page
- `/services` — Services page
- `/calculator` — Investment calculator
- `/insights` — Blog/listing
- `/insights/:slug` — Article detail (handled in Insights component via state)
- `/contact` — Contact form
