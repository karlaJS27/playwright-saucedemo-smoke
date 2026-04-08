const { expect } = require('@playwright/test');

class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.locator('span.title');
    this.items = page.locator('.inventory_item');
    this.firstAddToCartButton = page
      .locator('button[data-test^="add-to-cart"]')
      .first();
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');

    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async assertOnPage() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  async assertHasItems() {
    await expect(this.items).toHaveCount(6);
  }

  async addFirstItemToCart() {
    await this.firstAddToCartButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
