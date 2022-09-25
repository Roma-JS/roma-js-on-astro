import { Lang } from '@i18n/types';
import type { AstroGlobal } from 'astro';

export const navbarLinks: Readonly<Record<Lang, Record<string, string>>> = {
  it: {
    home: '/',
    blog: '/blog',
    about: '/it/about',
  },
  en: {
    home: '/en',
    blog: '/blog',
    about: '/en/about',
  },
};

export const hpUrlMap: Readonly<Record<Lang, string>> = {
  it: navbarLinks.it.home,
  en: navbarLinks.en.home,
};

export const aboutUrlMap: Readonly<Record<Lang, string>> = {
  it: navbarLinks.it.about,
  en: navbarLinks.en.about,
};

export function preventSelfNavigation(
  evt: MouseEvent & { currentTarget: HTMLAnchorElement }
): void {
  if (evt.currentTarget.getAttribute('aria-current') === 'page') {
    evt.stopPropagation();
    evt.preventDefault();
  }
}

export function getCanonicalURL(astro: AstroGlobal) {
  return new URL(astro.url.pathname, astro.site);
}
