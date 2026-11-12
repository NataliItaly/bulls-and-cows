import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/bulls-and-cows/',
  test: {
    environment: 'jsdom',
  },
});
