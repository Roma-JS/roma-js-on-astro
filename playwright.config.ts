import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCi = process.env.CI === 'true';
const baseURL = 'http://localhost:4321/';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e-tests',
  timeout: 12 * 1_000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCi,
  /* Retry on CI only */
  retries: isCi ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCi ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    locale: 'it-IT',
    timezoneId: 'Europe/Rome',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome (android)',
      use: { ...devices['Pixel 7'], isMobile: true },
    },
    {
      name: 'Mobile Safari(iPhone)',
      use: { ...devices['iPhone 15 Pro'], isMobile: true },
    },
    {
      name: 'Firefox desktop',
      use: { ...devices['Desktop Firefox'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm run build && pnpm run preview',
    url: baseURL,
    reuseExistingServer: !isCi,
  },
});
