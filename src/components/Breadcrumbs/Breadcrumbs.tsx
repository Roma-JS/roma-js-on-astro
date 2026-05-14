import type { Lang } from '@i18n/types';
import { For, type JSX } from 'solid-js';
import { breadcrumbLinks } from 'utils/routing';

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
      class="mt-8 flex flex-wrap items-center justify-center gap-x-3 border-t-3 border-ink py-4 text-sm font-bold uppercase text-ink"
      classList={{ [props.class || '']: !!props.class }}
    >
      <ul class="m-0 flex flex-wrap items-center gap-x-3 p-0">
        <For each={links()}>
          {([label, href]) => (
            <li class="m-0 inline-flex list-none items-center p-0 after:ml-3 after:content-['/'] last:after:hidden">
              <a
                href={href}
                hreflang={props.lang}
                aria-current={
                  props.currentPathname === href ? 'page' : undefined
                }
                class="underline decoration-2 underline-offset-4 hover:bg-brand-yellow aria-[current=page]:pointer-events-none aria-[current=page]:no-underline aria-[current=page]:opacity-60"
              >
                {label}
              </a>
            </li>
          )}
        </For>
        <li class="m-0 inline-flex list-none items-center p-0">
          <a
            href="#"
            role="button"
            onClick={handleScrollToTop}
            class="underline decoration-2 underline-offset-4 hover:bg-brand-yellow"
          >
            {props.messages.scrollToTop}
          </a>
        </li>
      </ul>
    </nav>
  );
}
