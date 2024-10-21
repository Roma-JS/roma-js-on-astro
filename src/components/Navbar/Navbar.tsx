import { createSignal, For, type JSX, Show } from 'solid-js';
import {
  LangSelector,
  type LangSelectorProps,
} from 'components/LangSelector/LangSelector';
import hamburgerMenuOpenImg from 'media/hamburger-menu-open.svg';
import hamburgerMenuCloseImg from 'media/hamburger-menu-closed.svg';
import styles from './navbar.module.scss';
import { createAppBreakpoints } from 'utils/media-queries';
import { navbarLinks, preventSelfNavigation, socialLinks } from 'utils/routing';
import type { Lang } from '@i18n/types';
import { openMenuBtnId, type NavbarMessages } from './helpers';
import { BrandMenuArea } from './components/BrandMenuArea';

export interface NavbarProps {
  lang: Lang;
  relativePageUrl: string;
  class?: JSX.IntrinsicElements['div']['class'];
  classList?: JSX.IntrinsicElements['div']['classList'];
  urlMap: LangSelectorProps['urlMap'] | null | undefined;
  messages: NavbarMessages;
}

export function Navbar(props: NavbarProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const matches = createAppBreakpoints();
  const isMenuVisible = () => !matches.lg && isMenuOpen();
  const navLinksEntries = () => Object.entries(navbarLinks[props.lang] ?? {});

  return (
    <>
      <header
        id="rmjs-navbar"
        class={styles.navbar}
        classList={{
          ...props.classList,
          [props.class as string]: !!props.class,
        }}
      >
        <menu class={styles.leftSide}>
          <Show when={props.urlMap} keyed>
            {(urlMap) => (
              <LangSelector
                messages={props.messages}
                activeLang={props.lang}
                urlMap={urlMap}
              />
            )}
          </Show>
        </menu>
        <menu class={styles.rightSide}>
          <button
            id={openMenuBtnId}
            aria-label={props.messages.openMenu}
            type="button"
            aria-haspopup="true"
            aria-expanded={isMenuVisible()}
            class={styles.hamburgerMenuBtn}
            style={{
              '--hamburger-menu-close': `url("${hamburgerMenuOpenImg.src}")`,
              '--hamburger-menu-open': `url("${hamburgerMenuCloseImg.src}")`,
            }}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);

              isMenuVisible()
                ? document.body.style.setProperty('overflow', 'hidden')
                : document.body.style.removeProperty('overflow');
            }}
          ></button>
          <div class={styles.navbarNavWrapper}>
            <nav
              class={styles.navbarNav}
              aria-label={props.messages.mainSiteNav}
            >
              <For each={navLinksEntries()}>
                {([label, href], index) => (
                  <a
                    aria-current={
                      props.relativePageUrl === href ? 'page' : undefined
                    }
                    onClick={preventSelfNavigation}
                    class="btn btn-small btn-primary"
                    style={`--index: ${index()}`}
                    href={href}
                  >
                    {label}
                  </a>
                )}
              </For>
            </nav>
            <span class={styles.navbarDivider} />
            <nav class={styles.navbarNav}>
              <a
                class="btn btn-small btn-secondary"
                classList={{
                  [styles.navbarNavDiscordLink]: true,
                }}
                style={`--index: ${navLinksEntries().length}`}
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
              <a
                class="btn btn-small"
                classList={{
                  'btn-primary': !isMenuVisible(),
                  'btn-secondary': isMenuVisible(),
                }}
                style={`--index: ${navLinksEntries().length + 1}`}
                rel="noopener noreferrer"
                target="_blank"
                href={socialLinks.youtube.href}
              >
                {props.messages.ctaWatchOurVideos}
              </a>
            </nav>
            <BrandMenuArea aria-hidden="true" />
          </div>
        </menu>
      </header>
    </>
  );
}
