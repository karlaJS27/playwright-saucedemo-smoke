// spec: test-plan.md

import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test('Valid Login with Standard User', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify login form is displayed
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Enter username 'standard_user'
    await page.locator('[data-test="username"]').fill('standard_user');

    // 3. Enter password 'secret_sauce'
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login - redirected to inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  test('Login with Locked Out User', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify login page is displayed
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Enter username 'locked_out_user'
    await page.locator('[data-test="username"]').fill('locked_out_user');

    // 3. Enter password 'secret_sauce'
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message appears indicating account is locked
    await expect(page.locator('h3:has-text("Epic sadface: Sorry, this user has been locked out.")')).toBeVisible();
    
    // Verify user remains on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Invalid Credentials Error', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify login page is displayed
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Enter username 'invalid_user'
    await page.locator('[data-test="username"]').fill('invalid_user');

    // 3. Enter password 'wrongpass'
    await page.locator('[data-test="password"]').fill('wrongpass');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message appears indicating invalid credentials
    await expect(page.locator('h3:has-text("Epic sadface: Username and password do not match any user in this service")')).toBeVisible();
    
    // Verify user remains on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Verify login button is still clickable
    await expect(page.locator('[data-test="login-button"]')).toBeEnabled();
  });

  test('Login with Empty Password', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify login page is displayed
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Enter username 'standard_user'
    await page.locator('[data-test="username"]').fill('standard_user');

    // 3. Leave password field empty and click Login
    await page.locator('[data-test="login-button"]').click();

    // Verify error message appears indicating password is required
    await expect(page.locator('h3:has-text("Epic sadface: Password is required")')).toBeVisible();
    
    // Verify user remains on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Login with Empty Username', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify login page is displayed
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Leave username field empty and enter password 'secret_sauce'
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 3. Click Login button
    await page.locator('[data-test="login-button"]').click();

    // Verify error message appears indicating username is required
    await expect(page.locator('h3:has-text("Epic sadface: Username is required")')).toBeVisible();
    
    // Verify user remains on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Logout Functionality', async ({ page }) => {
    // 1. Login with valid credentials (standard_user / secret_sauce)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify user is on the inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 2. Click the Open Menu button
    await page.getByRole('button', { name: 'Open Menu' }).click();

    // Verify menu is displayed
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();

    // 3. Click Logout option
    await page.locator('[data-test="logout-sidebar-link"]').click();

    // Verify user is redirected to the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Verify login form is displayed
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
