import type { Lang } from '@i18n/types';
import facebookIcon from 'media/social/facebook.svg';
import githubIcon from 'media/social/github.svg';
import youtubeIcon from 'media/social/youtube.svg';
import twitterIcon from 'media/social/twitter-square.svg';
import rssIcon from 'media/social/rss.svg';
import discordIcon from 'media/social/discord.svg';
import linkedinIcon from 'media/social/linkedin.svg';
import meetupIcon from 'media/social/meetup.svg';

import type { AstroGlobal } from 'astro';

const createPageRoute = (relativeUrl: string) =>
  new URL(relativeUrl, import.meta.env.PUBLIC_SITE_URL).pathname;

export type RouteKey =
  | 'homepage'
  | 'upcomingEvents'
  | 'pastEvents'
  | 'blog'
  | 'aboutPage';

const itRoutes = {
  homepage: createPageRoute('/'),
  upcomingEvents: createPageRoute('/it/prossimi-eventi'),
  pastEvents: createPageRoute('/it/eventi-passati/1'),
  blog: createPageRoute('/blog'),
  aboutPage: createPageRoute('/it/about'),
} as const satisfies Partial<Record<RouteKey, string>>;

const enRoutes = {
  homepage: createPageRoute('/en'),
  upcomingEvents: createPageRoute('/en/upcoming-events'),
  pastEvents: createPageRoute('/en/past-events/1'),
  aboutPage: createPageRoute('/en/about'),
} as const satisfies Partial<Record<RouteKey, string>>;

export const routes = {
  it: itRoutes,
  en: enRoutes,
} as const satisfies Record<Lang, Partial<Record<RouteKey, string>>>;

export const breadcrumbLinks = {
  it: {
    home: routes.it.homepage,
    blog: routes.it.blog,
  },
  en: {
    home: routes.en.homepage,
    about: routes.en.aboutPage,
  },
};

export const navbarLinks: Readonly<Record<Lang, Record<string, string>>> = {
  it: routes.it,
  en: routes.en,
};

export const categoryPageUrl = navbarLinks.it.blog + '/category';

export const hpUrlMap: Readonly<Record<Lang, string>> = {
  it: routes.it.homepage,
  en: routes.en.homepage,
};

export const upcomingEventsUrlMap: Readonly<Record<Lang, string>> = {
  it: routes.it.upcomingEvents,
  en: routes.en.upcomingEvents,
};

export const pastEventsUrlMap: Readonly<Record<Lang, string>> = {
  it: routes.it.pastEvents,
  en: routes.en.pastEvents,
};

export const aboutUrlMap: Readonly<Record<Lang, string>> = {
  it: routes.it.aboutPage,
  en: routes.en.aboutPage,
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
  discord: {
    href: import.meta.env.PUBLIC_DISCORD_INVITE_HREF,
    iconHref: discordIcon,
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
  linkedin: {
    href: import.meta.env.PUBLIC_LINKEDIN_PROFILE_HREF,
    iconHref: linkedinIcon,
  },
  meetup: {
    href: import.meta.env.PUBLIC_MEEETUP_PROFILE_HREF,
    iconHref: meetupIcon,
  },
} as const;
