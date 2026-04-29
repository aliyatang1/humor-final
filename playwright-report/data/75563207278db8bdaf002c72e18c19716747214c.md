# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication & Protected Routes >> logout page should handle sign out and redirect
- Location: tests/auth.spec.ts:15:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Signing out/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Signing out/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "HUMOR FEED" [ref=e5] [cursor=pointer]:
        - /url: /
      - generic [ref=e6]:
        - combobox [ref=e7] [cursor=pointer]:
          - option "☀️"
          - option "🌙"
          - option "💻" [selected]
        - link "Sign in" [ref=e8] [cursor=pointer]:
          - /url: /login
  - main [ref=e9]:
    - generic [ref=e10]:
      - heading "Sign in" [level=1] [ref=e11]
      - paragraph [ref=e12]: Sign in to view the Humor Feed.
      - button "Continue with Google" [ref=e13]
  - button "Open Next.js Dev Tools" [ref=e19] [cursor=pointer]:
    - img [ref=e20]
  - alert [ref=e23]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication & Protected Routes', () => {
  4  |   test('should redirect unauthenticated user to login page', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page).toHaveURL('/login');
  7  |   });
  8  | 
  9  |   test('login page should display Google sign-in button', async ({ page }) => {
  10 |     await page.goto('/login');
  11 |     const signInButton = page.getByRole('button', { name: /Continue with Google/i });
  12 |     await expect(signInButton).toBeVisible();
  13 |   });
  14 | 
  15 |   test('logout page should handle sign out and redirect', async ({ page }) => {
  16 |     // This test verifies the logout page loads (actual auth would be manual)
  17 |     await page.goto('/logout');
  18 |     const signingOutText = page.getByRole('heading', { name: /Signing out/i });
> 19 |     await expect(signingOutText).toBeVisible();
     |                                  ^ Error: expect(locator).toBeVisible() failed
  20 |   });
  21 | 
  22 |   test('login page should have proper error handling UI', async ({ page }) => {
  23 |     await page.goto('/login');
  24 |     const heading = page.getByRole('heading', { name: /Sign in/i });
  25 |     const subtitle = page.getByText(/Sign in to view the Humor Feed/i);
  26 |     await expect(heading).toBeVisible();
  27 |     await expect(subtitle).toBeVisible();
  28 |   });
  29 | 
  30 |   test('should show error message placeholder on login if needed', async ({ page }) => {
  31 |     await page.goto('/login');
  32 |     // Verify the error message structure exists (will show if OAuth fails)
  33 |     const errorContainer = page.locator('p[class*="text-red"]');
  34 |     // Should not be visible initially
  35 |     const errorVisible = await errorContainer.isVisible().catch(() => false);
  36 |     expect(errorVisible).toBe(false);
  37 |   });
  38 | });
  39 | 
  40 | test.describe('Route Protection', () => {
  41 |   test('unauthenticated access to / should redirect to /login', async ({ page }) => {
  42 |     await page.goto('/', { waitUntil: 'networkidle' });
  43 |     await expect(page).toHaveURL('/login');
  44 |   });
  45 | 
  46 |   test('unauthenticated access to /upload should redirect to /login', async ({ page }) => {
  47 |     await page.goto('/upload', { waitUntil: 'networkidle' });
  48 |     await expect(page).toHaveURL('/login');
  49 |   });
  50 | 
  51 |   test('login page should be publicly accessible', async ({ page }) => {
  52 |     const response = await page.goto('/login');
  53 |     expect(response?.status()).toBe(200);
  54 |   });
  55 | 
  56 |   test('auth/callback route should be publicly accessible', async ({ page }) => {
  57 |     // Can't fully test callback without OAuth, but route should exist
  58 |     const response = await page.goto('/auth/callback', { waitUntil: 'networkidle' }).catch(e => null);
  59 |     // Expecting it might redirect or give 404, but not crash
  60 |     expect(response === null || response?.status()).toBeTruthy();
  61 |   });
  62 | });
  63 | 
```