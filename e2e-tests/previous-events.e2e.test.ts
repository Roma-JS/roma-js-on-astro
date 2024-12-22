import { test, expect } from '@playwright/test';
import { expectH1, expectWellFormedPage } from './shared-e2e-tests';

test('italian previous-events page is well formed', async ({ page }) => {
  await page.goto('./it/eventi-passati/1/');
  const lang = 'it';

  await Promise.all([
    expectWellFormedPage(page, lang, null),
    expectH1(page, /Eventi passati/i),
  ]);
});

test('english previous-events page is well formed', async ({ page }) => {
  await page.goto('./en/past-events/1/');
  const lang = 'en';

  await Promise.all([
    expectWellFormedPage(page, lang, null),
    expectH1(page, /Past Events/i),
  ]);
});
