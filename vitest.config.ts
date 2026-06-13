import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    // Playwright e2e specs live in e2e/ and use @playwright/test, not vitest.
    exclude: ['**/node_modules/**', '**/dist/**', '**/.astro/**', 'e2e/**'],
  },
} as Record<string, unknown>);
