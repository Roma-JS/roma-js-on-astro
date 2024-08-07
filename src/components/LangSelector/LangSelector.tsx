import type { Lang } from '@i18n/types';
import { For, type JSX, splitProps } from 'solid-js';
import styles from './langSelector.module.scss';
import type { NavbarMessages } from '@components/Navbar/helpers';

export type LangSelectorProps = JSX.IntrinsicElements['nav'] & {
  activeLang: Lang;
  urlMap?: Partial<Record<Lang, string>> | null | undefined;
  messages: NavbarMessages;
};

const langToLabelMap: Readonly<Record<string, keyof NavbarMessages>> = {
  it: 'itWebsite',
  en: 'enWebsite',
};

export function LangSelector(props: LangSelectorProps) {
  const [local, otherProps] = splitProps(props, [
    'activeLang',
    'urlMap',
    'classList',
  ]);
  const urlMapEntries = () => local.urlMap && Object.entries(local.urlMap);
  const classList = () => ({ ...local.classList, [styles.nav]: true });

  const handleLinkClick: JSX.EventHandlerUnion<
    HTMLAnchorElement,
    MouseEvent
  > = (evt) => {
    if (evt.currentTarget.getAttribute('aria-current') === 'page') {
      evt.stopPropagation();
      evt.preventDefault();
    }
  };

  return (
    <nav classList={classList()} {...otherProps}>
      <ul class={styles.list}>
        <For each={urlMapEntries()}>
          {([lang, altUrl]) => (
            <li class={styles.listItem}>
              <a
                onClick={handleLinkClick}
                class={styles.langBtn}
                aria-current={local.activeLang === lang ? 'page' : undefined}
                href={altUrl}
                hreflang={lang}
                lang={lang}
                aria-label={props.messages[langToLabelMap[lang]]}
              >
                {lang}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
