import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  testMatch: /.*\.spec\.(ts|js)/,
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3010',
    ignoreHTTPSErrors: true,
    screenshot: 'off',
    video: 'off',
    trace: 'off',
  },
  webServer: {
    command: 'npx next start -p 3010',
    port: 3010,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  reporter: [['list']],
};

export default config;
