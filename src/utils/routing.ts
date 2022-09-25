import { Lang } from '@i18n/types';

export const navbarLinks: Readonly<Record<Lang, Record<string, string>>> = {
  it: {
    home: '/',
    blog: '/blog',
    about: '/about',
  },
  en: {
    home: '/en',
    blog: '/blog',
    about: 'en/about',
  },
};

export const hpUrlMap: Readonly<Record<Lang, string>> = {
  it: '/',
  en: '/en',
};

export function preventSelfNavigation(
  evt: MouseEvent & { currentTarget: HTMLAnchorElement }
): void {
  if (evt.currentTarget.getAttribute('aria-current') === 'page') {
    evt.stopPropagation();
    evt.preventDefault();
  }
}
