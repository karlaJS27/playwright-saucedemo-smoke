# SauceDemo Smoke Test Plan

## Application Overview

SauceDemo (https://www.saucedemo.com/) is a demo e-commerce application designed for practicing automation testing. The application includes user authentication with multiple test users, a product inventory, shopping cart functionality, and a complete checkout workflow. This smoke test plan covers critical user journeys including login, product browsing, shopping cart operations, and complete purchase transactions.

## Test Scenarios

### 1. Authentication Tests

**Seed:** `tests/smoke.login.spec.js`

#### 1.1. Valid Login with Standard User

**File:** `tests/authentication/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Page displays login form
    - expect: Username and password fields are visible
    - expect: Login button is present
  2. Enter username 'standard_user'
    - expect: Username is entered in the field
  3. Enter password 'secret_sauce'
    - expect: Password is masked in the field
  4. Click the Login button
    - expect: User is redirected to the inventory page
    - expect: Page URL is https://www.saucedemo.com/inventory.html
    - expect: Products are displayed in a grid layout

#### 1.2. Login with Locked Out User

**File:** `tests/authentication/locked-out-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter username 'locked_out_user'
    - expect: Username is entered in the field
  3. Enter password 'secret_sauce'
    - expect: Password is entered in the field
  4. Click the Login button
    - expect: An error message appears
    - expect: The error message contains text about the account being locked
    - expect: User remains on the login page

#### 1.3. Invalid Credentials Error

**File:** `tests/authentication/invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter username 'invalid_user'
    - expect: Username is entered in the field
  3. Enter password 'wrong_password'
    - expect: Password is entered in the field
  4. Click the Login button
    - expect: An error message appears
    - expect: The error message indicates invalid credentials
    - expect: User remains on the login page
    - expect: Login button is still clickable

#### 1.4. Login with Empty Password

**File:** `tests/authentication/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter username 'standard_user'
    - expect: Username is entered in the field
  3. Leave password field empty and click Login
    - expect: An error message appears
    - expect: The error message indicates password is required
    - expect: User remains on the login page

#### 1.5. Login with Empty Username

**File:** `tests/authentication/empty-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Leave username field empty and enter password 'secret_sauce'
    - expect: Password is entered in the field
  3. Click Login button
    - expect: An error message appears
    - expect: The error message indicates username is required
    - expect: User remains on the login page

#### 1.6. Logout Functionality

**File:** `tests/authentication/logout.spec.ts`

**Steps:**
  1. Login with valid credentials (standard_user / secret_sauce)
    - expect: User is on the inventory page
  2. Click the Open Menu button
    - expect: Menu is displayed
    - expect: Logout option is visible
  3. Click Logout option
    - expect: User is redirected to the login page
    - expect: Page URL is https://www.saucedemo.com/
    - expect: Login form is displayed

### 2. Inventory and Product Tests

**Seed:** `tests/smoke.inventory.spec.js`

#### 2.1. Display Product Inventory

**File:** `tests/inventory/product-display.spec.ts`

**Steps:**
  1. Login with valid credentials (standard_user / secret_sauce)
    - expect: User is on the inventory page
  2. Observe the inventory page
    - expect: 6 products are displayed in a grid layout
    - expect: Each product shows: name, description, price, and Add to cart button
    - expect: Products include: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test T-Shirt

#### 2.2. Sort Products by Name A to Z

**File:** `tests/inventory/sort-name-asc.spec.ts`

**Steps:**
  1. Login with valid credentials and be on inventory page
    - expect: Inventory page is displayed
  2. Click the sort dropdown and select 'Name (A to Z)'
    - expect: Products are sorted alphabetically from A to Z
    - expect: Order is: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test T-Shirt

#### 2.3. Sort Products by Name Z to A

**File:** `tests/inventory/sort-name-desc.spec.ts`

**Steps:**
  1. Login with valid credentials and be on inventory page
    - expect: Inventory page is displayed
  2. Click the sort dropdown and select 'Name (Z to A)'
    - expect: Products are sorted alphabetically in reverse order
    - expect: Order is: Test T-Shirt, Onesie, Fleece Jacket, Bolt T-Shirt, Bike Light, Backpack

#### 2.4. Sort Products by Price Low to High

**File:** `tests/inventory/sort-price-asc.spec.ts`

**Steps:**
  1. Login with valid credentials and be on inventory page
    - expect: Inventory page is displayed
  2. Click the sort dropdown and select 'Price (low to high)'
    - expect: Products are sorted by price from lowest to highest
    - expect: Onesie ($7.99) appears first, Fleece Jacket ($49.99) appears last

#### 2.5. Sort Products by Price High to Low

**File:** `tests/inventory/sort-price-desc.spec.ts`

**Steps:**
  1. Login with valid credentials and be on inventory page
    - expect: Inventory page is displayed
  2. Click the sort dropdown and select 'Price (high to low)'
    - expect: Products are sorted by price from highest to lowest
    - expect: Fleece Jacket ($49.99) appears first, Onesie ($7.99) appears last

#### 2.6. View Product Details

**File:** `tests/inventory/product-details.spec.ts`

**Steps:**
  1. Login with valid credentials and be on inventory page
    - expect: Inventory page is displayed
  2. Click on a product name or image (e.g., Sauce Labs Backpack)
    - expect: Product detail page is displayed
    - expect: Product name, description, price, and Add to cart button are visible
    - expect: A back button is present to return to inventory

#### 2.7. Return from Product Details to Inventory

**File:** `tests/inventory/back-to-inventory.spec.ts`

**Steps:**
  1. Login and navigate to a product detail page
    - expect: Product detail page is displayed
  2. Click the back button
    - expect: User is returned to the inventory page
    - expect: Inventory page displays all products

### 3. Shopping Cart Tests

**Seed:** `tests/smoke.cart.spec.js`

#### 3.1. Add Single Product to Cart

**File:** `tests/cart/add-single-product.spec.ts`

**Steps:**
  1. Login with valid credentials and be on inventory page
    - expect: Inventory page is displayed
  2. Click 'Add to cart' button for Sauce Labs Backpack
    - expect: Button text changes to 'Remove'
    - expect: Cart counter in the header shows '1'
    - expect: Product is added to the cart

#### 3.2. Add Multiple Products to Cart

**File:** `tests/cart/add-multiple-products.spec.ts`

**Steps:**
  1. Login with valid credentials and be on inventory page
    - expect: Inventory page is displayed
  2. Add 3 different products to cart (e.g., Backpack, Bike Light, T-Shirt)
    - expect: Each 'Add to cart' button changes to 'Remove'
    - expect: Cart counter shows '3'
    - expect: All products are added to the cart

#### 3.3. Remove Product from Cart

**File:** `tests/cart/remove-product.spec.ts`

**Steps:**
  1. Add a product to cart and click the cart icon to view cart
    - expect: Cart page is displayed
    - expect: Product is visible with a Remove button
  2. Click the Remove button for the product
    - expect: Product is removed from the cart
    - expect: Cart becomes empty or shows only remaining items
    - expect: Cart counter is updated

#### 3.4. View Shopping Cart Contents

**File:** `tests/cart/view-cart.spec.ts`

**Steps:**
  1. Add multiple products to cart
    - expect: Products are added successfully
  2. Click the cart icon/badge in the header
    - expect: Cart page is displayed
    - expect: All added products are shown with quantity, description, and price
    - expect: Continue Shopping button is present
    - expect: Checkout button is present

#### 3.5. Continue Shopping from Cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Add products to cart and navigate to the cart page
    - expect: Cart page shows the products
  2. Click the 'Continue Shopping' button
    - expect: User is returned to the inventory page
    - expect: Cart badge still shows the items count

#### 3.6. Empty Cart Display

**File:** `tests/cart/empty-cart.spec.ts`

**Steps:**
  1. Login without adding any items to cart
    - expect: User is on inventory page
  2. Click the cart icon to view the cart
    - expect: Cart page is displayed
    - expect: A message indicates the cart is empty or no items are shown
    - expect: Continue Shopping button redirects to inventory

### 4. Checkout and Purchase Flow

**Seed:** `tests/smoke.cart.spec.js`

#### 4.1. Complete Checkout with Valid Information

**File:** `tests/checkout/complete-checkout.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is on inventory page
  2. Add a product to cart and navigate to cart
    - expect: Cart page shows the product
  3. Click Checkout button
    - expect: Checkout information form is displayed
    - expect: Form fields: First Name, Last Name, Zip/Postal Code
  4. Fill in First Name: 'John', Last Name: 'Doe', Zip: '12345'
    - expect: Form fields are populated with the entered values
  5. Click Continue button
    - expect: User proceeds to checkout overview page
    - expect: Order summary is displayed with product details, payment, and shipping info
  6. Click Finish button
    - expect: Order confirmation page is displayed
    - expect: Message 'Thank you for your order!' is shown
    - expect: Pony Express confirmation message is visible

#### 4.2. Checkout with Missing First Name

**File:** `tests/checkout/missing-firstname.spec.ts`

**Steps:**
  1. Login and add a product to cart, then click Checkout
    - expect: Checkout form is displayed
  2. Leave First Name empty, fill Last Name: 'Doe', Zip: '12345'
    - expect: Form shows validation (if implemented)
  3. Click Continue button
    - expect: An error message appears or Continue button is disabled
    - expect: User remains on the form

#### 4.3. Checkout with Missing Last Name

**File:** `tests/checkout/missing-lastname.spec.ts`

**Steps:**
  1. Login and add a product to cart, then click Checkout
    - expect: Checkout form is displayed
  2. Fill First Name: 'John', leave Last Name empty, fill Zip: '12345'
    - expect: Form shows validation (if implemented)
  3. Click Continue button
    - expect: An error message appears or Continue button is disabled
    - expect: User remains on the form

#### 4.4. Checkout with Missing Zip Code

**File:** `tests/checkout/missing-zipcode.spec.ts`

**Steps:**
  1. Login and add a product to cart, then click Checkout
    - expect: Checkout form is displayed
  2. Fill First Name: 'John', Last Name: 'Doe', leave Zip empty
    - expect: Form shows validation (if implemented)
  3. Click Continue button
    - expect: An error message appears or Continue button is disabled
    - expect: User remains on the form

#### 4.5. Cancel Checkout and Return to Cart

**File:** `tests/checkout/cancel-checkout.spec.ts`

**Steps:**
  1. Login, add a product to cart, and click Checkout
    - expect: Checkout form is displayed
  2. Click the Cancel button
    - expect: User returns to the cart page
    - expect: Cart still contains the products

#### 4.6. Cancel from Checkout Overview

**File:** `tests/checkout/cancel-from-overview.spec.ts`

**Steps:**
  1. Complete checkout step 1 with valid information
    - expect: Checkout overview page is displayed
  2. Click the Cancel button on the overview page
    - expect: User returns to the cart page
    - expect: Cart items are preserved

#### 4.7. Verify Order Summary Before Finishing

**File:** `tests/checkout/verify-order-summary.spec.ts`

**Steps:**
  1. Add a product (e.g., Backpack $29.99) to cart and proceed to checkout overview
    - expect: Checkout overview displays the product
    - expect: Item total is $29.99
    - expect: Tax is calculated correctly
    - expect: Final total is displayed
  2. Verify payment method displays 'SauceCard #31337'
    - expect: Payment information is correct
  3. Verify shipping method displays 'Free Pony Express Delivery!'
    - expect: Shipping information is correct

### 5. User Experience and Navigation Tests

**Seed:** `tests/smoke.inventory.spec.js`

#### 5.1. Navigate Using Menu Options

**File:** `tests/navigation/menu-navigation.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is on inventory page
  2. Click the Open Menu button
    - expect: Menu sidebar appears
    - expect: Options visible: All Items, About, Logout, Reset App State
  3. Click 'All Items' option
    - expect: Menu closes
    - expect: User remains on or navigates to inventory page

#### 5.2. Reset App State Functionality

**File:** `tests/navigation/reset-app-state.spec.ts`

**Steps:**
  1. Login and add products to cart, then click Open Menu
    - expect: Menu is displayed
    - expect: Cart has items
  2. Click 'Reset App State' option
    - expect: Cart is cleared
    - expect: Cart counter shows '0' or disappears
    - expect: User remains logged in
    - expect: All products show 'Add to cart' buttons again

#### 5.3. Access About Link

**File:** `tests/navigation/about-link.spec.ts`

**Steps:**
  1. Login and click Open Menu
    - expect: Menu is displayed
  2. Click 'About' link
    - expect: Link opens in new window or tab
    - expect: Link points to external Sauce Labs website

#### 5.4. Social Media Links in Footer

**File:** `tests/navigation/social-links.spec.ts`

**Steps:**
  1. Navigate to any page on the site (login, inventory, cart, checkout)
    - expect: Footer is visible with social media links
  2. Verify footer contains Twitter, Facebook, and LinkedIn links
    - expect: All three social media links are present
    - expect: Links have correct URLs

#### 5.5. Browser Back Button Behavior

**File:** `tests/navigation/browser-back.spec.ts`

**Steps:**
  1. Login and navigate to product details page
    - expect: Product details are displayed
  2. Use browser back button
    - expect: User navigates back to inventory page
    - expect: All functionality is preserved

### 6. Problem User Scenarios (Edge Cases)

**Seed:** `tests/smoke.inventory.spec.js`

#### 6.1. Login as Problem User

**File:** `tests/edge-cases/problem-user-login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter username 'problem_user' and password 'secret_sauce'
    - expect: Credentials are accepted
  3. Click Login
    - expect: User logs in successfully
    - expect: May display products with layout issues (this is by design for testing visual bugs)

#### 6.2. Login as Performance Glitch User

**File:** `tests/edge-cases/performance-glitch-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter username 'performance_glitch_user' and password 'secret_sauce'
    - expect: Credentials are accepted
  3. Login and observe page load times
    - expect: Page may load slowly (this is by design)
    - expect: All functionality should still work despite delays

#### 6.3. Login as Error User

**File:** `tests/edge-cases/error-user-login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter username 'error_user' and password 'secret_sauce'
    - expect: Credentials are accepted
  3. Login and perform actions
    - expect: User logs in but may encounter 500 errors on certain actions (by design)

#### 6.4. Login as Visual User

**File:** `tests/edge-cases/visual-user-login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter username 'visual_user' and password 'secret_sauce'
    - expect: Credentials are accepted
  3. Login and observe visual presentation
    - expect: User logs in successfully
    - expect: Products may have different images or visual differences (for visual regression testing)
