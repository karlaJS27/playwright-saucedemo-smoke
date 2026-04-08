const { test } = require('@playwright/test');
const { InventoryPage } = require('../src/pages/InventoryPage');
const { CartPage } = require('../src/pages/CartPage');

test('smoke: can add a product to cart', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await inventory.goto();
  await inventory.addFirstItemToCart();
  await inventory.expectCartCount(1);

  await inventory.openCart();
  await cart.assertOnPage();
  await cart.assertHasAtLeastOneItem();
});
