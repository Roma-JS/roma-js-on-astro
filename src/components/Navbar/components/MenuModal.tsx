import { createEffect, For, JSX, onCleanup } from 'solid-js';
import hamburgerMenuOpenImg from 'media/hamburger-menu-open.svg';
import styles from '../navbar.module.scss';
import {
  LangSelector,
  LangSelectorProps,
} from '@components/LangSelector/LangSelector';
import { BrandMenuArea } from './BrandMenuArea';
import { navbarLinks, preventSelfNavigation } from 'utils/routing';

export interface MenuModalProps extends LangSelectorProps {
  class?: string;
  relativePageUrl: string;
  onCloseButtonClick(): void;
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
          <img src={hamburgerMenuOpenImg} alt="close" aria-hidden="true" />
          <span class="visually-hidden">Close menu</span>
        </button>
      </div>
      <nav class="d-contents">
        <ul class={styles.menuLinks}>
          <For each={navLinksEntries()}>
            {([label, href]) => (
              <li class={styles.menuItem} classList={{ fadeInUp: true }}>
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
      <BrandMenuArea />
    </div>
  );
}
