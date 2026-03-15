import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://trust.fimil.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
