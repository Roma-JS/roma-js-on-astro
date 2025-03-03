import { test } from '@playwright/test';
import { expectH1, expectWellFormedPage } from './shared-e2e-tests';

const urlMap = {
  it: '/it/prossimi-eventi',
  en: '/en/upcoming-events',
};

test('italian upcoming-events page is well formed', async ({ page }) => {
  await page.goto('./it/prossimi-eventi/');
  const lang = 'it';

  await Promise.all([
    expectWellFormedPage(page, lang, urlMap),
    expectH1(page, /Prossimi eventi/i),
  ]);
});

test('english upcoming-events page is well formed', async ({ page }) => {
  await page.goto('./en/upcoming-events/');
  const lang = 'en';

  await Promise.all([
    expectWellFormedPage(page, lang, urlMap),
    expectH1(page, /upcoming events/i),
  ]);
});
