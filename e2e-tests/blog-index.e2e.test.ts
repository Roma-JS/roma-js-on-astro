import { test } from '@playwright/test';
import {
  expectH1,
  expectHtmlLang,
  expectValidFooter,
  expectValidMeta,
} from './shared-e2e-tests';

test('blog index is well formed', async ({ page }) => {
  await page.goto('./blog');
  const lang = 'it';
  await expectHtmlLang(page, lang);
  await expectValidFooter(page);
  await expectValidMeta(page, lang);

  await expectH1(page, /RomaJS Blog/);
});
