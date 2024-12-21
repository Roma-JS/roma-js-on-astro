import { test, expect } from '@playwright/test';

test('italian HP is well formed', async ({ page }) => {
  await page.goto('./');

  const html = page.locator('html');
  const lang = await html.getAttribute('lang');

  expect(lang).toBe('it');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/La tech community di Javascript su Roma/);

  const h1 = page.locator('h1');
  await h1.isVisible();
  await expect(h1).toHaveText(/La tech community di Javascript su Roma/);
});

test('english HP is well formed', async ({ page }) => {
  await page.goto('./en');

  const html = page.locator('html');
  const lang = await html.getAttribute('lang');

  expect(lang).toBe('en');
  await expect(page).toHaveTitle(/The Javascript community in Rome/);

  const h1 = page.locator('h1');
  await h1.isVisible();
  await expect(h1).toHaveText(/The Javascript community in Rome/);
});
