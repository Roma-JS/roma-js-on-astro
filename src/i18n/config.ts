import type { I18nRouteParams, Lang } from './types';
import { routes, type RouteKey } from 'utils/routing';

export const i18nLang = Object.freeze({
  it: {
    locale: 'it-IT',
  },
  en: {
    locale: 'en-US',
  },
} as const satisfies Readonly<Record<Lang, { locale: string }>>);

export function assertValidLang(value: unknown): asserts value is Lang {
  const validLangs = getI18nRouteParams().map(({ lang }) => lang);
  if (!validLangs.some((lang) => lang === value)) {
    throw new TypeError(
      `assertion failed, expected valid lang (it, en), got ${value}`
    );
  }
}

export function getI18nRouteParams(): I18nRouteParams[] {
  return Object.entries(i18nLang).map(([lang]) => ({
    lang,
  }));
}

export interface RelAlternateProps {
  href: string;
  hreflang: string;
}

const trimTrailingSlash = (path: string) => path.replace(/\/+$/g, '');

/**
 * Generates a list `link[rel="alternate"]` attributes given input url.
 * @param url
 * @returns
 * @see https://developers.google.com/search/docs/advanced/crawling/localized-versions
 */
export function generateLinkRelAlternateProps(
  pageLang: Lang,
  url: URL
): RelAlternateProps[] {
  const output: RelAlternateProps[] = [];
  const pathnameToSearch = trimTrailingSlash(url.pathname);

  const routeKey = Object.entries(routes[pageLang]).find(
    ([, pathname]) => pathnameToSearch === trimTrailingSlash(pathname)
  )?.[0] as RouteKey;

  if (routeKey) {
    for (const [lang, langRoutes] of Object.entries(routes)) {
      if (lang === pageLang) {
        continue;
      }

      const relativeUrl: string | undefined =
        langRoutes[routeKey as keyof typeof langRoutes];

      if (typeof relativeUrl === 'string') {
        output.push({
          hreflang: lang,
          href: new URL(relativeUrl, import.meta.env.PUBLIC_SITE_URL).href,
        });
      }
    }
  }

  return output;
}
