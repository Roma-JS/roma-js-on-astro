import {
  createEffect,
  createSignal,
  For,
  onCleanup,
  Show,
  type JSX,
  createMemo,
} from 'solid-js';
import {
  LangSelector,
  type LangSelectorProps,
} from 'components/LangSelector/LangSelector';
import { createAppBreakpoints } from 'utils/media-queries';
import { navbarLinks, preventSelfNavigation, socialLinks } from 'utils/routing';
import type { Lang } from '@i18n/types';
import { menuBtnId, type NavbarMessages } from './helpers';

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
  const navLinksEntries = createMemo(() =>
    Object.entries(navbarLinks[props.lang] ?? {}).map(([key, href]) => [
      props.messages[key as keyof NavbarMessages] ?? key,
      href,
    ]),
  );

  createEffect(() => {
    if (!isMenuVisible()) {
      return;
    }

    document.body.style.setProperty('overflow', 'hidden');
    document.getElementById(menuBtnId)?.focus();

    onCleanup(() => {
      document.body.style.removeProperty('overflow');
      document.getElementById(menuBtnId)?.focus();
    });
  });

  const handleMenuKeydown = (e: KeyboardEvent) => {
    if (isMenuVisible() && e.key === 'Tab' && !e.shiftKey) {
      const hamburgerMenuBtn = document.getElementById(menuBtnId);

      hamburgerMenuBtn?.focus();

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      return false;
    }
  };

  return (
    <header
      id="rmjs-navbar"
      class="sticky top-0 z-40 flex h-14 w-full items-center justify-between gap-4 border-b-3 border-ink bg-brand-yellow px-4 lg:h-14 lg:px-6"
      classList={{
        ...props.classList,
        [props.class as string]: !!props.class,
      }}
    >
      <menu class="m-0 flex items-center gap-3 p-0">
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
      <menu class="relative m-0 flex items-center p-0">
        <button
          id={menuBtnId}
          aria-label={props.messages.openMenu}
          type="button"
          aria-haspopup="true"
          aria-expanded={isMenuVisible()}
          class="inline-flex h-10 w-10 items-center justify-center border-3 border-ink bg-paper text-2xl font-bold leading-none text-ink shadow-brutal-sm hover:bg-ink hover:text-paper aria-expanded:bg-ink aria-expanded:text-paper lg:hidden"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);

            isMenuVisible()
              ? document.body.style.setProperty('overflow', 'hidden')
              : document.body.style.removeProperty('overflow');
          }}
        >
          <span aria-hidden="true">{isMenuVisible() ? '×' : '≡'}</span>
        </button>
        <div
          class="fixed inset-x-0 top-14 bottom-0 invisible flex flex-col-reverse items-center justify-start gap-4 overflow-y-auto bg-brand-yellow opacity-0 transition-opacity duration-200 lg:static lg:visible lg:inset-auto lg:ml-4 lg:flex-row lg:gap-3 lg:overflow-visible lg:opacity-100"
          classList={{
            '!visible !opacity-100 !flex-col z-30': isMenuVisible(),
          }}
        >
          <nav
            class="flex flex-col items-stretch gap-3 pt-12 lg:flex-row lg:items-center lg:pt-0"
            aria-label={props.messages.mainSiteNav}
          >
            <For each={navLinksEntries()}>
              {([label, href]) => (
                <a
                  aria-current={
                    props.relativePageUrl === href ? 'page' : undefined
                  }
                  onClick={preventSelfNavigation}
                  class="px-2 py-1 text-sm font-bold uppercase tracking-widest text-ink no-underline hover:underline hover:decoration-2 hover:underline-offset-4 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
                  href={href}
                >
                  {label}
                </a>
              )}
            </For>
          </nav>
          <span class="hidden h-4 w-px self-center bg-ink/40 lg:block" />
          <nav class="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-4">
            <a
              class="inline-flex items-center gap-2 px-2 py-1 text-sm font-bold uppercase tracking-widest text-ink no-underline hover:underline hover:decoration-2 hover:underline-offset-4 lg:hidden"
              rel="noopener noreferrer"
              target="_blank"
              href={socialLinks.discord.href}
            >
              {props.messages.ctaJoinDiscordCta}{' '}
              <img
                width="16"
                height="16"
                src={socialLinks.discord.iconHref.src}
                alt="discord"
                aria-hidden="true"
              />
            </a>
            <a
              class="px-2 py-1 text-sm font-bold uppercase tracking-widest text-ink no-underline hover:underline hover:decoration-2 hover:underline-offset-4"
              rel="noopener noreferrer"
              target="_blank"
              href={socialLinks.youtube.href}
              onKeyDown={handleMenuKeydown}
            >
              {props.messages.ctaWatchOurVideos}
            </a>
          </nav>
        </div>
      </menu>
    </header>
  );
}
