const { test, expect } = require('@playwright/test');
const { getEnv } = require('../src/utils/env');
const { LoginPage } = require('../src/pages/LoginPage');

// This spec validates the login flow itself, so we do NOT reuse storageState.
test.use({ storageState: undefined });

test('smoke: login works', async ({ page }) => {
  const env = getEnv();
  const loginPage = new LoginPage(page);

  await loginPage.goto(env.BASE_URL);
  await loginPage.login(env.SAUCE_USERNAME, env.SAUCE_PASSWORD);
  await loginPage.assertLoggedIn();

  await expect(page.locator('.inventory_item')).toHaveCount(6);
});
