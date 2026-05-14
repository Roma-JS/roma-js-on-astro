import { For, type JSX } from 'solid-js';
import { socialLinks } from 'utils/routing';

export function SocialLinksList(): JSX.Element {
  return (
    <ul class="m-0 flex list-none items-center gap-5 p-0">
      <For each={Object.entries(socialLinks)}>
        {([name, link]) => (
          <li class="m-0 list-none p-0">
            <a
              href={link.href}
              rel="noopener noreferrer"
              target="_blank"
              class="brutal-press inline-flex h-10 w-10 items-center justify-center border-3 border-ink bg-paper text-ink shadow-brutal-sm focus-visible:outline-3 focus-visible:outline-brand-red"
            >
              <span class="visually-hidden">{name}</span>
              <img
                src={link.iconHref.src}
                alt={name}
                aria-hidden="true"
                class="h-5 w-5"
              />
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}
