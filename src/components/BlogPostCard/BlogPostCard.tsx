import { type JSX, type ComponentProps, splitProps } from 'solid-js';
import type { CollectionEntry } from 'astro:content';
import { getBlogPostLink } from 'utils/blog';

export interface BlogPostCardProps extends ComponentProps<'section'> {
  post: CollectionEntry<'blog-posts'>;
}

export function BlogPostCard(props: BlogPostCardProps): JSX.Element {
  const [local, otherProps] = splitProps(props, [
    'classList',
    'children',
    'post',
  ]);

  return (
    <a
      class="block no-underline outline-none"
      href={getBlogPostLink(local.post)}
      aria-label={[local.post.data.title, local.post.data.author].join(', ')}
    >
      <section
        classList={{
          'brutal-press flex h-full min-h-32 flex-col justify-between gap-3 border-3 border-ink bg-paper p-4 shadow-brutal lg:p-6': true,
          ...local.classList,
        }}
        aria-hidden="true"
        {...otherProps}
      >
        <h2 class="m-0 line-clamp-2 text-xl font-bold uppercase leading-tight tracking-tight text-ink">
          {local.post.data.title}
        </h2>
        <div class="flex items-center gap-2 overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-widest text-ink-soft">
          <time dateTime={local.post.data.createdAt}>
            {local.post.data.createdAt.split('T')[0]}
          </time>
          <span aria-hidden="true">//</span>
          <span>{local.post.data.author}</span>
        </div>
      </section>
    </a>
  );
}
