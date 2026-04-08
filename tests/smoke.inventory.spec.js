const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../src/pages/InventoryPage');

test('smoke: inventory page is visible for authenticated user', async ({ page }) => {
  const inventory = new InventoryPage(page);

  await inventory.goto();
  await inventory.assertOnPage();
  await inventory.assertHasItems();

  await expect(page.locator('.shopping_cart_link')).toBeVisible();
});
