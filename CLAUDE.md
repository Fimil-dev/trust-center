# trust-center

Astro static site. Single page, config-driven.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- `npm run check` — Astro type checking

## Architecture

All content comes from `trust.config.ts` at the project root. **Never hardcode company-specific content in components.** The config is validated with Zod (from `astro/zod`) at build time — see `src/config/schema.ts`.

Components are `.astro` files. No React. No client-side JS except the theme toggle and mobile nav (use `<script is:inline>` for those).

## Styling

Tailwind CSS v4 via `@tailwindcss/vite`. Theme tokens go in `src/styles/global.css` using the `@theme` directive. Dark mode uses `@custom-variant dark` with class-based toggling (`.dark` on `<html>`).

## Key Rules

- Config schema changes go in `src/config/schema.ts` — keep Zod schema and TypeScript types in sync
- All interactive elements must be keyboard navigable
- Status badges must have `aria-label`
- Color is never the sole indicator of status — always pair with text
- Keep the site under 100KB gzipped (excluding fonts)
