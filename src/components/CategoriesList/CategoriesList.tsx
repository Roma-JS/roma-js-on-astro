import { ComponentProps, createMemo, For, splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { createSlug, createCategoryUrl } from 'utils/blog';
import styles from './styles.module.scss';

export interface CategoriesListProps
  extends Omit<ComponentProps<'ul'>, 'children'> {
  categories: string[];
  baseUrl: string;
  activeCategory?: string;
}

export function CategoriesList(props: CategoriesListProps): JSX.Element {
  const [local, otherProps] = splitProps(props, [
    'categories',
    'baseUrl',
    'classList',
    'activeCategory',
  ]);

  const categoryLinks = createMemo(() => {
    return local.categories.map((category) => {
      const slug = createSlug(category);
      const href = createCategoryUrl(local.baseUrl, category);

      return {
        slug,
        href,
        category,
      };
    });
  });

  const classList = () => ({ [styles.categories]: true, ...local.classList });

  return (
    <ul classList={classList()} {...otherProps}>
      <For each={categoryLinks()}>
        {({ category, href }) => (
          <li>
            <a
              aria-current={
                local.activeCategory === category ? 'page' : undefined
              }
              class={styles.category}
              href={local.activeCategory === category ? '#' : href}
            >
              {category}
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}
