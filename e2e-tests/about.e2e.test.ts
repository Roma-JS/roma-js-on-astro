import { test } from '@playwright/test';
import {
  expectH1,
  expectHtmlLang,
  expectValidCountrySelector,
  expectValidFooter,
} from './shared-e2e-tests';

const urlMap = {
  it: '/it/about',
  en: '/en/about',
};

test('italian about page is well formed', async ({ page }) => {
  await page.goto('./it/about');
  const lang = 'it';
  await expectHtmlLang(page, lang);
  await expectValidFooter(page);
  await expectValidCountrySelector(page, lang, urlMap);

  await expectH1(page, /About RomaJS/);
});

test('english about page is well formed', async ({ page }) => {
  await page.goto('./en/about');
  const lang = 'en';
  await expectHtmlLang(page, lang);
  await expectValidFooter(page);
  await expectValidCountrySelector(page, lang, urlMap);

  await expectH1(page, /About RomaJS/);
});
