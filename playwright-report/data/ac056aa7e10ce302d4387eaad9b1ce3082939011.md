# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery.spec.ts >> Gallery & UI Structure (Unauthenticated) >> logout page should have redirect link fallback
- Location: tests/gallery.spec.ts:31:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /Go to sign in/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /Go to sign in/i })

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
  3  | test.describe('Gallery & UI Structure (Unauthenticated)', () => {
  4  |   test('login page should have proper layout and styling', async ({ page }) => {
  5  |     await page.goto('/login');
  6  |     
  7  |     const mainContainer = page.locator('main');
  8  |     await expect(mainContainer).toBeVisible();
  9  |     
  10 |     const card = page.locator('div[class*="rounded-3xl"]');
  11 |     await expect(card).toBeVisible();
  12 |   });
  13 | 
  14 |   test('login page should display heading and subtext', async ({ page }) => {
  15 |     await page.goto('/login');
  16 |     
  17 |     const heading = page.getByRole('heading', { name: /Sign in/i });
  18 |     await expect(heading).toBeVisible();
  19 |     
  20 |     const description = page.getByText(/Sign in to view the Humor Feed/i);
  21 |     await expect(description).toBeVisible();
  22 |   });
  23 | 
  24 |   test('logout page should show signing out state', async ({ page }) => {
  25 |     await page.goto('/logout');
  26 |     
  27 |     const heading = page.getByRole('heading', { name: /Signing out/i });
  28 |     await expect(heading).toBeVisible();
  29 |   });
  30 | 
  31 |   test('logout page should have redirect link fallback', async ({ page }) => {
  32 |     await page.goto('/logout');
  33 |     
  34 |     const fallbackLink = page.getByRole('link', { name: /Go to sign in/i });
> 35 |     await expect(fallbackLink).toBeVisible();
     |                                ^ Error: expect(locator).toBeVisible() failed
  36 |   });
  37 | });
  38 | 
  39 | test.describe('Page Structure & Navigation', () => {
  40 |   test('login page should be accessible via direct URL', async ({ page }) => {
  41 |     const response = await page.goto('/login');
  42 |     expect(response?.status()).toBe(200);
  43 |   });
  44 | 
  45 |   test('logout page should be accessible via direct URL', async ({ page }) => {
  46 |     const response = await page.goto('/logout');
  47 |     expect(response?.status()).toBe(200);
  48 |   });
  49 | 
  50 |   test('homepage should require authentication', async ({ page }) => {
  51 |     const response = await page.goto('/', { waitUntil: 'networkidle' });
  52 |     // Should either redirect or the page should be protected
  53 |     expect(page.url()).toContain('/login');
  54 |   });
  55 | });
  56 | 
  57 | test.describe('Brand & Visual Elements', () => {
  58 |   test('login page should display HUMOR FEED branding', async ({ page }) => {
  59 |     await page.goto('/login');
  60 |     const brandText = page.getByText(/Humor Feed/i);
  61 |     // Should have at least the heading with brand
  62 |     await expect(brandText.first()).toBeVisible();
  63 |   });
  64 | 
  65 |   test('logout page should display HUMOR FEED branding', async ({ page }) => {
  66 |     await page.goto('/logout');
  67 |     const brandText = page.getByText(/Signing out/i);
  68 |     await expect(brandText).toBeVisible();
  69 |   });
  70 | });
  71 | 
```