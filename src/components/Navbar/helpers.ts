import type { Translate } from '@i18n/translate';

const l10nKeys = [
  'ctaWatchOurVideos',
  'ctaJoinDiscordCta',
  'openMenu',
  'closeMenu',
  'mainSiteNav',
  'itWebsite',
  'enWebsite',
] as const;

export type NavbarMessages = Readonly<
  Record<(typeof l10nKeys)[number], string>
>;

/**
 * Do not use this function inside a component,
 * call instead this function in a astro component
 * a pass the output to Navbar as props.
 * @see https://github.com/yassinedoghri/astro-i18next/issues/46
 * @returns
 */
export function getNavbarMessages(l10n: Translate): NavbarMessages {
  return Object.fromEntries(
    l10nKeys.map((key) => [key, l10n(key)])
  ) as NavbarMessages;
}

export const menuBtnId = 'rmjs-menu-btn';
