import { For, type JSX } from 'solid-js';
import { socialLinks } from 'utils/routing';

export function SocialLinksList(): JSX.Element {
  return (
    <ul class="m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0 font-mono text-sm">
      <For each={Object.entries(socialLinks)}>
        {([name, link]) => (
          <li class="m-0 list-none p-0">
            <a
              href={link.href}
              rel="noopener noreferrer"
              target="_blank"
              class="inline-flex items-center gap-1.5 no-underline before:content-['['] hover:bg-ink hover:text-paper after:content-[']']"
            >
              <span class="visually-hidden">{name}</span>
              <span aria-hidden="true">{name}</span>
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}
