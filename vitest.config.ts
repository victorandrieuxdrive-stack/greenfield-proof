import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.pnpm-store/**'],
  },
  resolve: {
    alias: {
      // Ready for tsconfig path aliases — none defined at root level yet.
    },
  },
});
