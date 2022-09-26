import { For, JSX } from 'solid-js';
import { socialLinks } from 'utils/routing';
import styles from './socialLinks.module.scss';

export function SocialLinksList(): JSX.Element {
  return (
    <ul class={styles.list}>
      <For each={Object.entries(socialLinks)}>
        {([name, link]) => (
          <li>
            <a href={link.href} rel="noopener noreferrer" target="_blank">
              <span class="visually-hidden">{name}</span>
              <img src={link.iconHref} alt={name} aria-hidden="true" />
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}
