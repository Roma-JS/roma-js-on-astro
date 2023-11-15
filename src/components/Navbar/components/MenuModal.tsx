import { createEffect, For, type JSX, onCleanup } from 'solid-js';
import hamburgerMenuOpenImg from 'media/hamburger-menu-open.svg';
import styles from '../navbar.module.scss';
import {
  LangSelector,
  type LangSelectorProps,
} from '@components/LangSelector/LangSelector';
import { BrandMenuArea } from './BrandMenuArea';
import { navbarLinks, preventSelfNavigation, socialLinks } from 'utils/routing';
import type { NavbarMessages } from '../helpers';

export interface MenuModalProps extends LangSelectorProps {
  class?: string;
  relativePageUrl: string;
  onCloseButtonClick(): void;
  messages: NavbarMessages;
}

export function MenuModal(props: MenuModalProps): JSX.Element {
  createEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');

    onCleanup(() => {
      document.body.style.removeProperty('overflow');
    });
  });

  const navLinksEntries = () =>
    Object.entries(navbarLinks[props.activeLang] ?? {});

  return (
    <div
      classList={{ [props.class + '']: !!props.class }}
      class={styles.fullscreenMenu}
    >
      <div class={styles.menuTopNav}>
        <div class={styles.leftSide}>
          <LangSelector activeLang={props.activeLang} urlMap={props.urlMap} />
        </div>
        <button
          classList={{
            [styles.rightSide]: true,
            [styles.hamburgerMenuBtn]: true,
          }}
          type="button"
          onClick={props.onCloseButtonClick}
        >
          <img src={hamburgerMenuOpenImg.src} alt="close" aria-hidden="true" />
          <span class="visually-hidden">Close menu</span>
        </button>
      </div>
      <nav class="d-contents">
        <ul class={styles.menuLinks}>
          <For each={navLinksEntries()}>
            {([label, href]) => (
              <li
                class={styles.menuItem}
                classList={{ fadeInUp: true, [styles.animatedlistItem]: true }}
              >
                <a
                  aria-current={
                    props.relativePageUrl === href ? 'page' : undefined
                  }
                  class="btn btn-small btn-primary"
                  href={href}
                  onClick={preventSelfNavigation}
                >
                  {label}
                </a>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <ul class={styles.ctaLinks}>
        <li
          class="list-style-none"
          classList={{ fadeInUp: true, [styles.animatedlistItem]: true }}
        >
          <a
            class="btn btn-small btn-secondary"
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.discord.href}
          >
            {props.messages.ctaJoinDiscordCta}{' '}
            <img
              width="24"
              height="24"
              src={socialLinks.discord.iconHref.src}
              alt={'discord'}
              aria-hidden="true"
            />
          </a>
        </li>
        <li
          class="list-style-none"
          classList={{ fadeInUp: true, [styles.animatedlistItem]: true }}
        >
          <a
            class="btn btn-small btn-secondary"
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.youtube.href}
          >
            {props.messages.ctaWatchOurVideos}
          </a>
        </li>
      </ul>
      <BrandMenuArea />
    </div>
  );
}
