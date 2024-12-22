import { test } from '@playwright/test';
import { expectH1, expectWellFormedPage } from './shared-e2e-tests';

const urlMap = {
  it: '/it/about',
  en: '/en/about',
};

test('italian about page is well formed', async ({ page }) => {
  await page.goto('./it/about');
  const lang = 'it';

  await Promise.all([
    expectWellFormedPage(page, lang, urlMap),
    expectH1(page, /About RomaJS/i),
  ]);
});

test('english about page is well formed', async ({ page }) => {
  await page.goto('./en/about');
  const lang = 'en';

  await Promise.all([
    expectWellFormedPage(page, lang, urlMap),
    expectH1(page, /About RomaJS/i),
  ]);
});
