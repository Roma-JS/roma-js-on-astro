import type { Lang } from '@i18n/types';
import { For, type JSX } from 'solid-js';
import { breadcrumbLinks } from 'utils/routing';
import styles from './breadcrumbs.module.scss';

export interface BreadcrumbsProps {
  lang: Lang;
  class?: string;
  currentPathname: string;
  messages: Record<'scrollToTop' | 'breadcrumbs', string>;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const links = () => {
    return Object.entries(breadcrumbLinks[props.lang]);
  };

  const handleScrollToTop: JSX.EventHandlerUnion<
    HTMLAnchorElement,
    MouseEvent
  > = (evt) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <nav
      aria-label={props.messages.breadcrumbs}
      class={styles.nav}
      classList={{ [props.class || '']: !!props.class }}
    >
      <ul>
        <For each={links()}>
          {([label, href]) => (
            <li>
              <a
                href={href}
                hreflang={props.lang}
                aria-current={
                  props.currentPathname === href ? 'page' : undefined
                }
              >
                {label}
              </a>
            </li>
          )}
        </For>
        <li>
          <a href="#" role="button" onClick={handleScrollToTop}>
            {props.messages.scrollToTop}
          </a>
        </li>
      </ul>
    </nav>
  );
}
