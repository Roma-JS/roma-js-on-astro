import { createMemo, For } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { createCategoryUrl, createSlug } from 'utils/blog';
import styles from './styles.module.scss';

export interface BlogPostInfoProps {
  createdAt: string;
  categories: string[];
  baseUrl: string;
}

export function BlogPostInfo(props: BlogPostInfoProps): JSX.Element {
  const categoryLinks = createMemo(() => {
    return props.categories.map((category) => {
      const slug = createSlug(category);
      const href = createCategoryUrl(props.baseUrl, category);

      return {
        slug,
        href,
        category,
      };
    });
  });

  return (
    <aside class={styles.wrapper}>
      <time dateTime={props.createdAt}>{props.createdAt.split('T')[0]}</time>
      <ul class={styles.categories}>
        <For each={categoryLinks()}>
          {({ category, href }) => (
            <li>
              <a class={styles.category} href={href}>
                {category}
              </a>
            </li>
          )}
        </For>
      </ul>
    </aside>
  );
}
