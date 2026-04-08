const { expect } = require('@playwright/test');

class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.locator('span.title');
    this.cartItems = page.locator('.cart_item');
  }

  async assertOnPage() {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async assertHasAtLeastOneItem() {
    await expect(this.cartItems).toHaveCount(1);
  }
}

module.exports = { CartPage };
