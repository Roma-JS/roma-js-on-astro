import { test } from '@playwright/test';
import { expectH1, expectWellFormedPage } from './shared-e2e-tests';

const urlMap = {
  it: '/it/eventi-passati/1',
  en: '/en/past-events/1',
};

test('italian previous-events page is well formed', async ({ page }) => {
  await page.goto('./it/eventi-passati/1/');
  const lang = 'it';

  await Promise.all([
    expectWellFormedPage(page, lang, urlMap),
    expectH1(page, /Eventi passati/i),
  ]);
});

test('english previous-events page is well formed', async ({ page }) => {
  await page.goto('./en/past-events/1/');
  const lang = 'en';

  await Promise.all([
    expectWellFormedPage(page, lang, urlMap),
    expectH1(page, /Past Events/i),
  ]);
});
