const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');
const { getEnv } = require('../utils/env');
const { LoginPage } = require('../pages/LoginPage');

/**
 * Global setup: logs in once and saves storageState to reuse across tests.
 * https://playwright.dev/docs/test-global-setup-teardown
 */
module.exports = async () => {
  const env = getEnv();

  const authDir = path.join(process.cwd(), '.auth');
  const storageStatePath = path.join(authDir, 'storageState.json');

  fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.goto(env.BASE_URL);
  await loginPage.login(env.SAUCE_USERNAME, env.SAUCE_PASSWORD);
  await loginPage.assertLoggedIn();

  await page.context().storageState({ path: storageStatePath });
  await browser.close();
};
