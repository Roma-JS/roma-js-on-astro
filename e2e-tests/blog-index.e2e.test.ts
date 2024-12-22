import { test } from '@playwright/test';
import { expectH1, expectWellFormedPage } from './shared-e2e-tests';

test('blog index is well formed', async ({ page }) => {
  await page.goto('./blog');
  const lang = 'it';

  await Promise.all([
    expectWellFormedPage(page, lang, null),
    expectH1(page, /RomaJS Blog/),
  ]);
});
