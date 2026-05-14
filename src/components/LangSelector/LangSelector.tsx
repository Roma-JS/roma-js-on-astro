import type { Lang } from '@i18n/types';
import { For, type JSX, splitProps } from 'solid-js';
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
  const classList = () => ({ ...local.classList, contents: true });

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
      <ul class="m-0 flex h-8 list-none border-3 border-ink bg-paper p-0 shadow-brutal-sm">
        <For each={urlMapEntries()}>
          {([lang, altUrl]) => (
            <li class="m-0 flex list-none items-center justify-center border-r-3 border-ink p-0 last:border-r-0">
              <a
                onClick={handleLinkClick}
                class="flex h-full min-w-9 items-center justify-center bg-transparent px-2 text-sm font-bold uppercase tracking-widest text-ink no-underline hover:no-underline aria-[current=page]:bg-ink aria-[current=page]:text-paper"
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
