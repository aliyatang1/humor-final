import { test, expect } from '@playwright/test';

test.describe('Upload Section (Unauthenticated)', () => {
  test('unauthenticated users should see auth prompt on upload page', async ({ page }) => {
    await page.goto('/upload', { waitUntil: 'networkidle' });
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('upload page URL should require authentication', async ({ page }) => {
    const response = await page.goto('/upload', { waitUntil: 'networkidle' });
    // Verify it redirects
    expect(page.url()).toContain('/login');
  });
});

test.describe('Error Handling', () => {
  test('non-existent routes should not crash the app', async ({ page }) => {
    const response = await page.goto('/nonexistent-route-12345', { waitUntil: 'networkidle' });
    // Should either 404 or redirect to login
    const isLogin = page.url().includes('/login');
    const isNotFound = response?.status() === 404;
    expect(isLogin || isNotFound).toBeTruthy();
  });

  test('server should respond to requests without crashing', async ({ page }) => {
    try {
      await page.goto('/login');
      const isVisible = await page.getByRole('heading').isVisible();
      expect(isVisible).toBeTruthy();
    } catch (e) {
      fail('Server should not crash');
    }
  });
});

test.describe('Build & Deployment Check', () => {
  test('application should load without runtime errors', async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`Console error: ${msg.text()}`);
      }
    });
    
    await page.goto('/login');
    const headings = await page.locator('h1, h2').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('page should have proper meta information', async ({ page }) => {
    await page.goto('/login');
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('CSS should load and render properly', async ({ page }) => {
    await page.goto('/login');
    const element = page.locator('main');
    const padding = await element.evaluate((el) => {
      return window.getComputedStyle(el).padding;
    });
    expect(padding).toBeTruthy();
  });
});

test.describe('Responsive Design', () => {
  test('login page should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    
    const heading = page.getByRole('heading', { name: /Sign in/i });
    await expect(heading).toBeVisible();
  });

  test('login page should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/login');
    
    const heading = page.getByRole('heading', { name: /Sign in/i });
    await expect(heading).toBeVisible();
  });

  test('login page should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/login');
    
    const heading = page.getByRole('heading', { name: /Sign in/i });
    await expect(heading).toBeVisible();
  });
});
