import { type ComponentProps, createMemo, For, splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { createSlug, createCategoryUrl } from 'utils/blog';

export interface CategoriesListProps extends Omit<
  ComponentProps<'ul'>,
  'children'
> {
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

  const classList = () => ({
    'm-0 flex flex-wrap items-center gap-2 p-0': true,
    ...local.classList,
  });

  return (
    <ul classList={classList()} {...otherProps}>
      <For each={categoryLinks()}>
        {({ category, href }) => (
          <li class="contents list-none">
            <a
              aria-current={
                local.activeCategory === category ? 'page' : undefined
              }
              class="brutal-press inline-flex h-8 min-w-16 items-center justify-center border-3 border-ink bg-paper px-2 text-xs font-bold uppercase tracking-wider text-ink no-underline shadow-brutal-sm aria-[current=page]:bg-ink aria-[current=page]:text-paper"
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
