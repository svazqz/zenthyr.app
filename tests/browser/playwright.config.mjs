import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173/coverage-site/';

export default defineConfig({
  testDir: '.',
  workers: 2,
  reporter: 'list',
  use: { baseURL, browserName: 'chromium', headless: true },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173',
    cwd: new URL('../..', import.meta.url).pathname,
    url: baseURL,
    reuseExistingServer: false,
  },
});
