import { Lang } from '@i18n/types';
import facebookIcon from 'media/social/facebook.svg';
import slackIcon from 'media/social/slack.svg';
import githubIcon from 'media/social/github.svg';
import youtubeIcon from 'media/social/youtube.svg';
import twitterIcon from 'media/social/twitter-square.svg';
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

export interface SocialLink {
  href: string;
  iconHref: string;
}

export const socialLinks = {
  slack: {
    href: import.meta.env.PUBLIC_SLACK_INVITE_HREF,
    iconHref: slackIcon,
  },
  facebook: {
    href: import.meta.env.PUBLIC_FACEBOOK_PAGE_HREF,
    iconHref: facebookIcon,
  },
  twitter: {
    href: import.meta.env.PUBLIC_TWITTER_PROFILE_HREF,
    iconHref: twitterIcon,
  },
  youtube: {
    href: import.meta.env.PUBLIC_YOUTUBE_PAGE_HREF,
    iconHref: youtubeIcon,
  },
  github: {
    href: import.meta.env.PUBLIC_GITHUB_PROFILE_HREF,
    iconHref: githubIcon,
  },
} as const;
