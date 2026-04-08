// @ts-check

const { defineConfig, devices } = require('@playwright/test');
const { getEnv } = require('./src/utils/env');

const env = getEnv();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: 0,

  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Reuse authenticated state for most specs.
    storageState: '.auth/storageState.json'
  },

  // Creates .auth/storageState.json before the test run.
  globalSetup: require.resolve('./src/fixtures/auth.setup'),

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  outputDir: 'test-results/'
});
