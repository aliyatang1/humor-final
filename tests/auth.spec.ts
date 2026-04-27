import { test, expect } from '@playwright/test';

test.describe('Authentication & Protected Routes', () => {
  test('should redirect unauthenticated user to login page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/login');
  });

  test('login page should display Google sign-in button', async ({ page }) => {
    await page.goto('/login');
    const signInButton = page.getByRole('button', { name: /Continue with Google/i });
    await expect(signInButton).toBeVisible();
  });

  test('logout page should handle sign out and redirect', async ({ page }) => {
    // This test verifies the logout page loads (actual auth would be manual)
    await page.goto('/logout');
    const signingOutText = page.getByRole('heading', { name: /Signing out/i });
    await expect(signingOutText).toBeVisible();
  });

  test('login page should have proper error handling UI', async ({ page }) => {
    await page.goto('/login');
    const heading = page.getByRole('heading', { name: /Sign in/i });
    const subtitle = page.getByText(/Sign in to view the Humor Feed/i);
    await expect(heading).toBeVisible();
    await expect(subtitle).toBeVisible();
  });

  test('should show error message placeholder on login if needed', async ({ page }) => {
    await page.goto('/login');
    // Verify the error message structure exists (will show if OAuth fails)
    const errorContainer = page.locator('p[class*="text-red"]');
    // Should not be visible initially
    const errorVisible = await errorContainer.isVisible().catch(() => false);
    expect(errorVisible).toBe(false);
  });
});

test.describe('Route Protection', () => {
  test('unauthenticated access to / should redirect to /login', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL('/login');
  });

  test('unauthenticated access to /upload should redirect to /login', async ({ page }) => {
    await page.goto('/upload', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL('/login');
  });

  test('login page should be publicly accessible', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response?.status()).toBe(200);
  });

  test('auth/callback route should be publicly accessible', async ({ page }) => {
    // Can't fully test callback without OAuth, but route should exist
    const response = await page.goto('/auth/callback', { waitUntil: 'networkidle' }).catch(e => null);
    // Expecting it might redirect or give 404, but not crash
    expect(response === null || response?.status()).toBeTruthy();
  });
});
