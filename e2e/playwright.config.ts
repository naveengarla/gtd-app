import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'pnpm --filter @apps/web dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  testDir: '.',
});
