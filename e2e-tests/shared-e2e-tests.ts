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
 * Asserts that page contains valid `link[rel="alternate"]`
 * @param page
 * @param expectedLang
 * @param urlMap
 */
export async function expectValidLinkRelAlternate(
  page: Page,
  expectedLang: ExpectedLang,
  urlMap: Record<ExpectedLang, string>
) {
  const alternateLinksByLang = Object.fromEntries(
    (
      await Promise.all(
        (
          await page.locator('head > link[rel="alternate"]').all()
        ).map((loc) =>
          Promise.all([loc.getAttribute('hreflang'), loc.getAttribute('href')])
        )
      )
    ).filter((entry): entry is [string, string] => !!entry[0] && !!entry[1])
  );

  for (const [lang, url] of Object.entries(urlMap)) {
    if (lang === expectedLang) {
      continue;
    }

    expect(alternateLinksByLang[lang]).toContain(url);
  }
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

async function getOgAttributesByLang(page: Page, lang: ExpectedLang) {
  const [title, description, localPageUrl] = await Promise.all([
    page.title(),
    page.locator('head > meta[name="description"]').getAttribute('content'),
    page.url(),
  ]);

  const parsedUrl = new URL(localPageUrl);
  parsedUrl.host = 'romajs.org';
  parsedUrl.protocol = 'https:';
  parsedUrl.port = '';
  const pageUrl = parsedUrl.href;

  switch (lang) {
    case 'it':
      return {
        'og:type': 'website',
        'og:url': pageUrl,
        'og:title': title,
        'og:description': description,
        'og:image': 'https://romajs.org/assets/og-img.png',
        'og:image:width': '200',
        'og:image:height': '200',
        'twitter:card': 'summary_large_image',
        'twitter:url': pageUrl,
        'twitter:title': title,
        'twitter:description': description,
        'twitter:image': 'https://romajs.org/assets/og-img.png',
        'twitter:image:alt': 'RomaJS, il meetup javascript di Roma',
      };
    case 'en':
      return {
        'og:type': 'website',
        'og:url': pageUrl,
        'og:title': title,
        'og:description': description,
        'og:image': 'https://romajs.org/assets/og-img.png',
        'og:image:width': '200',
        'og:image:height': '200',
        'twitter:card': 'summary_large_image',
        'twitter:url': pageUrl,
        'twitter:title': title,
        'twitter:description': description,
        'twitter:image': 'https://romajs.org/assets/og-img.png',
        'twitter:image:alt': 'RomaJS, il meetup javascript di Roma',
      };
    default: {
      throw new TypeError(`unsupported lang=${lang}`);
    }
  }
}

/**
 * Asserts that the meta attribute defined in <head> are valid
 * @param page
 */
export async function expectValidMeta(page: Page, lang: ExpectedLang) {
  expect(
    await page.locator('head > meta[charset]').getAttribute('charset')
  ).toBe('utf-8');
  expect(
    await page.locator('head > link[rel="icon"]').getAttribute('href')
  ).toBe('/favicon.ico');
  expect(
    await page.locator('head > meta[name="viewport"]').getAttribute('content')
  ).toBeTruthy();
  expect(
    await page.locator('head > meta[name="title"]').getAttribute('content')
  ).toBeTruthy();
  expect(
    await page
      .locator('head > meta[name="description"]')
      .getAttribute('content')
  ).toBeTruthy();

  const ogMetaAttributesFound = Object.fromEntries(
    (
      await Promise.all(
        (
          await page.locator(`head > meta[property][content]`).all()
        ).map((locator) =>
          Promise.all([
            locator.getAttribute('property'),
            locator.getAttribute('content'),
          ])
        )
      )
    ).filter((entry): entry is [string, string] => !!entry[0] && !!entry[1])
  );

  const ogAttr = await getOgAttributesByLang(page, lang);

  for (const [property, content] of Object.entries(ogAttr)) {
    expect(ogMetaAttributesFound[property]).toContain(content);
  }
}

export async function expectWellFormedPage(
  page: Page,
  expectedLang: ExpectedLang,
  urlMap: Record<ExpectedLang, string> | null
) {
  return Promise.all([
    expectHtmlLang(page, expectedLang),
    expectValidFooter(page),
    urlMap && expectValidCountrySelector(page, expectedLang, urlMap),
    urlMap && expectValidLinkRelAlternate(page, expectedLang, urlMap),
    expectValidMeta(page, expectedLang),
  ]);
}
