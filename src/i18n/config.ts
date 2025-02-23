import type { I18nRouteParams, Lang } from './types';
import { hpUrlMap } from 'utils/routing';

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

const routeParamsRegex = new RegExp(
  `^(?<leadingSlash>\/?)(?<lang>${Object.keys(i18nLang).join(
    '|'
  )})(?<rest>.*)$`,
  'i'
);

export interface RelAlternateProps {
  href: string;
  hreflang: string;
}

/**
 * Generates a list `link[rel="alternate"]` attributes given input url.
 * @param url
 * @returns
 * @see https://developers.google.com/search/docs/advanced/crawling/localized-versions
 */
export function generateLinkRelAlternateProps(url: URL): RelAlternateProps[] {
  const output: RelAlternateProps[] = [];

  if (/^\/?$/.test(url.pathname)) {
    // is index page ?
    return [
      {
        href: hpUrlMap.en,
        hreflang: 'en',
      },
    ];
  }

  const result = routeParamsRegex.exec(url.pathname);

  if (!result || !result.groups) {
    return output;
  }

  let { leadingSlash, lang } = result.groups;

  lang = lang.toLowerCase();

  for (const hreflang of Object.keys(i18nLang)) {
    if (hreflang !== lang) {
      const altUrl = new URL(url);

      altUrl.pathname = `/${hreflang}${altUrl.pathname.slice(
        leadingSlash.length + lang.length
      )}`;

      output.push({
        hreflang,
        href: altUrl.href,
      });
    }
  }

  return output;
}
