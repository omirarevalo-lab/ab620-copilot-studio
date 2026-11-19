import { defineConfig } from '@playwright/test';

const common = { baseURL: 'http://localhost:4620', locale: 'en-US' };
const phone = { ...common, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
const desktop = { ...common, viewport: { width: 1280, height: 800 } };

export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'tests/.results/artifacts',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.PW_WORKERS ? +process.env.PW_WORKERS : 4,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'tests/.results/report.json' }]],
  use: { channel: 'msedge',   // Edge ships H.264/AAC (lesson videos); Playwright's own Chromium does not
    launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] }, trace: 'off', screenshot: 'off' },
  webServer: { command: 'node tools/serve.mjs 4620', url: 'http://localhost:4620', reuseExistingServer: true, timeout: 20_000 },
  projects: [
    { name: 'phone-light', use: { ...phone, colorScheme: 'light' } },
    { name: 'phone-dark', use: { ...phone, colorScheme: 'dark' } },
    { name: 'desktop-light', use: { ...desktop, colorScheme: 'light' } },
    { name: 'desktop-dark', use: { ...desktop, colorScheme: 'dark' } },
  ],
});
