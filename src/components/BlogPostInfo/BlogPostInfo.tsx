import type { JSX } from 'solid-js/jsx-runtime';
import { CategoriesList } from '@components/CategoriesList/CategoriesList';

export interface BlogPostInfoProps {
  createdAt: string;
  categories: string[];
  baseUrl: string;
}

export function BlogPostInfo(props: BlogPostInfoProps): JSX.Element {
  return (
    <aside class="grid max-w-full grid-cols-1 items-start justify-center gap-3 border-b-3 border-ink bg-paper-soft p-5 text-center lg:grid-cols-[120px_1fr] lg:px-10 lg:py-5 lg:text-left">
      <time
        dateTime={props.createdAt}
        class="inline-flex items-center font-bold uppercase tracking-widest"
      >
        {props.createdAt.split('T')[0]}
      </time>
      <CategoriesList categories={props.categories} baseUrl={props.baseUrl} />
    </aside>
  );
}
