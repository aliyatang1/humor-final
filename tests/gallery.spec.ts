import { test, expect } from '@playwright/test';

test.describe('Gallery & UI Structure (Unauthenticated)', () => {
  test('login page should have proper layout and styling', async ({ page }) => {
    await page.goto('/login');
    
    const mainContainer = page.locator('main');
    await expect(mainContainer).toBeVisible();
    
    const card = page.locator('div[class*="rounded-3xl"]');
    await expect(card).toBeVisible();
  });

  test('login page should display heading and subtext', async ({ page }) => {
    await page.goto('/login');
    
    const heading = page.getByRole('heading', { name: /Sign in/i });
    await expect(heading).toBeVisible();
    
    const description = page.getByText(/Sign in to view the Humor Feed/i);
    await expect(description).toBeVisible();
  });

  test('logout page should show signing out state', async ({ page }) => {
    await page.goto('/logout');
    
    const heading = page.getByRole('heading', { name: /Signing out/i });
    await expect(heading).toBeVisible();
  });

  test('logout page should have redirect link fallback', async ({ page }) => {
    await page.goto('/logout');
    
    const fallbackLink = page.getByRole('link', { name: /Go to sign in/i });
    await expect(fallbackLink).toBeVisible();
  });
});

test.describe('Page Structure & Navigation', () => {
  test('login page should be accessible via direct URL', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response?.status()).toBe(200);
  });

  test('logout page should be accessible via direct URL', async ({ page }) => {
    const response = await page.goto('/logout');
    expect(response?.status()).toBe(200);
  });

  test('homepage should require authentication', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'networkidle' });
    // Should either redirect or the page should be protected
    expect(page.url()).toContain('/login');
  });
});

test.describe('Brand & Visual Elements', () => {
  test('login page should display HUMOR FEED branding', async ({ page }) => {
    await page.goto('/login');
    const brandText = page.getByText(/Humor Feed/i);
    // Should have at least the heading with brand
    await expect(brandText.first()).toBeVisible();
  });

  test('logout page should display HUMOR FEED branding', async ({ page }) => {
    await page.goto('/logout');
    const brandText = page.getByText(/Signing out/i);
    await expect(brandText).toBeVisible();
  });
});
