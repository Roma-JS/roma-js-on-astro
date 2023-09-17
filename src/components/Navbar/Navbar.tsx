import { createSignal, For, type JSX, Show } from 'solid-js';
import {
  LangSelector,
  type LangSelectorProps,
} from 'components/LangSelector/LangSelector';
import hamburgerMenuImg from 'media/hamburger-menu-closed.svg';
import { MenuModal } from './components/MenuModal';
import { Transition } from 'solid-transition-group';
import styles from './navbar.module.scss';
import { createAppBreakpoints } from 'utils/media-queries';
import { navbarLinks, preventSelfNavigation, socialLinks } from 'utils/routing';
import type { Lang } from '@i18n/types';
import type { NavbarMessages } from './helpers';

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
      <div
        id="rmjs-navbar"
        class={styles.navbar}
        classList={{
          ...props.classList,
          [props.class as string]: !!props.class,
        }}
      >
        <div class={styles.leftSide}>
          <Show when={props.urlMap} keyed>
            {(urlMap) => (
              <LangSelector activeLang={props.lang} urlMap={urlMap} />
            )}
          </Show>
        </div>
        <div
          classList={{
            [styles.rightSideDesktop]: true,
            [styles.rightSide]: true,
          }}
        >
          <nav class={styles.navbarNav}>
            <ul>
              <li>
                <a
                  class="btn btn-small btn-primary"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={socialLinks.youtube.href}
                >
                  {props.messages.ctaWatchOurVideos}
                </a>
              </li>
              <li class={styles.divider} />
              <For each={navLinksEntries()}>
                {([label, href]) => (
                  <li>
                    <a
                      aria-current={
                        props.relativePageUrl === href ? 'page' : undefined
                      }
                      onClick={preventSelfNavigation}
                      class="btn btn-small btn-primary"
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </div>
        <button
          type="button"
          classList={{
            [styles.hamburgerMenuBtn]: true,
            [styles.rightSide]: true,
          }}
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <img aria-hidden="true" alt="menu" src={hamburgerMenuImg.src} />
          <span class="visually-hidden">Open menu</span>
        </button>
      </div>
      <Transition name="fade" appear>
        <Show when={isMenuVisible()}>
          <MenuModal
            relativePageUrl={props.relativePageUrl}
            activeLang={props.lang}
            urlMap={props.urlMap}
            onCloseButtonClick={() => setIsMenuOpen(false)}
            messages={props.messages}
          />
        </Show>
      </Transition>
    </>
  );
}
