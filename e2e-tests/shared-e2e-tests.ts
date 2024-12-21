import { expect, type Page } from '@playwright/test';

const allLangs = ['it', 'en'] as const;

type ExpectedLang = (typeof allLangs)[number];

/**
 * Asserts that page uses expected lang
 * @param page
 * @param expectedLang
 */
export async function expectHtmlLang(page: Page, expectedLang: ExpectedLang) {
  const html = page.locator('html');
  const lang = await html.getAttribute('lang');

  expect(lang).toBe(expectedLang);
}

/**
 * Asserts that page has valid footer
 * @param page
 */
export async function expectValidFooter(page: Page) {
  const footer = page.locator('footer');

  const socialLinks = [
    'facebook',
    'discord',
    'youtube',
    'linkedin',
    'rss',
    'github',
  ];

  for (const socialLink of socialLinks) {
    const link = await footer.getByRole('link', { name: socialLink });
    expect(link).toBeVisible();
  }
}

/**
 * Asserts that page has valid country selector
 * @param page
 * @param expectedLang
 * @param urlMap
 */
export async function expectValidCountrySelector(
  page: Page,
  expectedLang: ExpectedLang,
  urlMap: Record<ExpectedLang, string>
) {
  const currentPageLink = page.locator(
    `nav a[aria-current="page"][hreflang="${expectedLang}"]`
  );
  const currentPagehref = await currentPageLink.getAttribute('href');

  expect(currentPageLink).toBeVisible();
  expect(await currentPageLink.textContent()).toBe(expectedLang);
  expect(currentPagehref).toBe(urlMap[expectedLang]);

  const otherLangs = allLangs.filter((lang) => lang !== expectedLang);

  for (const lang of otherLangs) {
    const pageLink = page.locator(`nav a[hreflang="${lang}"]`);
    const ariaCurrent = await pageLink.getAttribute('aria-current');
    const href = await pageLink.getAttribute('href');

    expect(href).toBe(urlMap[lang]);
    expect(pageLink).toBeVisible();
    expect(await pageLink.textContent()).toBe(lang);
    expect(ariaCurrent).toBe(null);
  }
}

/**
 * Asserts that page has valid h1 wuth input text
 * @param page
 * @param text
 */
export async function expectH1(page: Page, text: string | RegExp) {
  const h1 = page.locator('h1');
  await h1.isVisible();
  await expect(h1).toHaveText(text);
}
