import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  testMatch: /.*\.spec\.(ts|js)/,
  timeout: 60_000,
  retries: 0,
  // Limit parallelism to prevent overwhelming the standalone server
  workers: 2,
  fullyParallel: false,
  use: {
    baseURL: 'http://localhost:3010',
    ignoreHTTPSErrors: true,
    screenshot: 'off',
    video: 'off',
    trace: 'off',
  },
  webServer: {
    command: 'npm run e2e:web',
    port: 3010,
    reuseExistingServer: true,
    timeout: 180_000,
  },
  reporter: [['list']],
};

export default config;
