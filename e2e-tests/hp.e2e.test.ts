import { test, expect } from '@playwright/test';
import {
  expectH1,
  expectHtmlLang,
  expectValidCountrySelector,
  expectValidFooter,
} from './shared-e2e-tests';

const urlMap = {
  it: '/',
  en: '/en',
};

test('italian HP is well formed', async ({ page }) => {
  await page.goto('./');
  const lang = 'it';
  await expectHtmlLang(page, lang);
  await expectValidFooter(page);
  await expectValidCountrySelector(page, lang, urlMap);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/La tech community di Javascript su Roma/);

  await expectH1(page, /La tech community di Javascript su Roma/);
});

test('english HP is well formed', async ({ page }) => {
  await page.goto('./en');
  const lang = 'en';

  await expectHtmlLang(page, lang);
  await expectValidFooter(page);
  await expectValidCountrySelector(page, lang, urlMap);

  await expect(page).toHaveTitle(/The Javascript community in Rome/);

  await expectH1(page, /The Javascript community in Rome/);
});
