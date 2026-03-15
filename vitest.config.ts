import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
  },
} as Record<string, unknown>);
