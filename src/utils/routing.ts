import type { Lang } from '@i18n/types';
import facebookIcon from 'media/social/facebook.svg';
import slackIcon from 'media/social/slack.svg';
import githubIcon from 'media/social/github.svg';
import youtubeIcon from 'media/social/youtube.svg';
import twitterIcon from 'media/social/twitter-square.svg';
import rssIcon from 'media/social/rss.svg';
import type { AstroGlobal } from 'astro';

export const routes = {
  it: {
    home: import.meta.env.PUBLIC_URL_BASE + '/',
    'prossimi eventi': import.meta.env.PUBLIC_URL_BASE + '/it/prossimi-eventi',
    'eventi passati': import.meta.env.PUBLIC_URL_BASE + '/it/eventi-passati',
    blog: import.meta.env.PUBLIC_URL_BASE + '/blog',
    about: import.meta.env.PUBLIC_URL_BASE + '/it/about',
  },
  en: {
    home: import.meta.env.PUBLIC_URL_BASE + '/en',
    'upcoming events': import.meta.env.PUBLIC_URL_BASE + '/en/upcoming-events',
    'past events': import.meta.env.PUBLIC_URL_BASE + '/en/past-events',
    about: import.meta.env.PUBLIC_URL_BASE + '/en/about',
  },
} as const;

export const breadcrumbLinks = {
  it: {
    home: routes.it.home,
    blog: routes.it.blog,
  },
  en: {
    home: routes.en.home,
    about: routes.en.about,
  },
};

export const navbarLinks: Readonly<Record<Lang, Record<string, string>>> = {
  it: routes.it,
  en: routes.en,
};

export const categoryPageUrl = navbarLinks.it.blog + '/category';

export const hpUrlMap: Readonly<Record<Lang, string>> = {
  it: routes.it.home,
  en: routes.en.home,
};

export const aboutUrlMap: Readonly<Record<Lang, string>> = {
  it: routes.it.about,
  en: routes.en.about,
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
  rss: {
    href: import.meta.env.PUBLIC_URL_BASE + `/blog/rss.xml`,
    iconHref: rssIcon,
  },
  github: {
    href: import.meta.env.PUBLIC_GITHUB_PROFILE_HREF,
    iconHref: githubIcon,
  },
} as const;
