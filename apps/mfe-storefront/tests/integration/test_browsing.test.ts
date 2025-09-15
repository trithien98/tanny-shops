import { test, expect } from '@playwright/test'

test.describe('Customer Browsing Flow', () => {
  test('should display product listings on homepage', async ({ page }) => {
    await page.goto('/')

    // Should show hero section
    await expect(page.locator('[data-testid=hero-section]')).toBeVisible()

    // Should show featured products
    await expect(page.locator('[data-testid=featured-products]')).toBeVisible()

    // Should have at least one product card
    const productCards = page.locator('[data-testid=product-card]')
    await expect(productCards.first()).toBeVisible()

    // Product card should have essential elements
    await expect(
      productCards.first().locator('[data-testid=product-image]')
    ).toBeVisible()
    await expect(
      productCards.first().locator('[data-testid=product-title]')
    ).toBeVisible()
    await expect(
      productCards.first().locator('[data-testid=product-price]')
    ).toBeVisible()
  })

  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/')

    // Click on first product
    const firstProduct = page.locator('[data-testid=product-card]').first()
    await firstProduct.click()

    // Should navigate to PDP
    await expect(page).toHaveURL(/\/p\//)

    // Should show product details
    await expect(page.locator('[data-testid=product-title]')).toBeVisible()
    await expect(
      page.locator('[data-testid=product-description]')
    ).toBeVisible()
    await expect(page.locator('[data-testid=product-price]')).toBeVisible()
    await expect(page.locator('[data-testid=add-to-cart-button]')).toBeVisible()
  })

  test('should filter products by category', async ({ page }) => {
    await page.goto('/c/electronics')

    // Should show category title
    await expect(page.locator('[data-testid=category-title]')).toContainText(
      'Electronics'
    )

    // Should show filtered products
    const products = page.locator('[data-testid=product-card]')
    await expect(products.first()).toBeVisible()

    // Should show category filters
    await expect(page.locator('[data-testid=category-filters]')).toBeVisible()
  })

  test('should search for products', async ({ page }) => {
    await page.goto('/')

    // Enter search term
    const searchInput = page.locator('[data-testid=search-input]')
    await searchInput.fill('laptop')
    await searchInput.press('Enter')

    // Should navigate to search results
    await expect(page).toHaveURL(/\/search/)

    // Should show search results
    await expect(page.locator('[data-testid=search-results]')).toBeVisible()
    await expect(page.locator('[data-testid=search-query]')).toContainText(
      'laptop'
    )
  })

  test('should add product to cart', async ({ page }) => {
    await page.goto('/p/test-product')

    // Add to cart
    await page.locator('[data-testid=add-to-cart-button]').click()

    // Should show success message
    await expect(
      page.locator('[data-testid=cart-success-message]')
    ).toBeVisible()

    // Cart count should update
    const cartCount = page.locator('[data-testid=cart-count]')
    await expect(cartCount).toBeVisible()
    await expect(cartCount).not.toContainText('0')
  })

  test('should handle out of stock products', async ({ page }) => {
    await page.goto('/p/out-of-stock-product')

    // Add to cart button should be disabled
    const addToCartBtn = page.locator('[data-testid=add-to-cart-button]')
    await expect(addToCartBtn).toBeDisabled()

    // Should show out of stock message
    await expect(
      page.locator('[data-testid=out-of-stock-message]')
    ).toBeVisible()
  })
})
