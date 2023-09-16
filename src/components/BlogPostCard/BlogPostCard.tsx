import { type JSX, type ComponentProps, splitProps } from 'solid-js';
import type { CollectionEntry } from 'astro:content';
import styles from './styles.module.scss';
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

  const classList = () => ({
    [styles.card]: true,
    ...local.classList,
  });

  return (
    <a
      classList={{ [styles.link]: true }}
      href={getBlogPostLink(local.post)}
      aria-label={[local.post.data.title, local.post.data.author].join(', ')}
    >
      <section classList={classList()} aria-hidden="true" {...otherProps}>
        <h2 class={styles.heading}>{local.post.data.title}</h2>
        <div class={styles.infoRow}>
          <time dateTime={local.post.data.createdAt}>
            {local.post.data.createdAt.split('T')[0]}
          </time>
          {' - '}
          <span>{local.post.data.author}</span>
        </div>
      </section>
    </a>
  );
}
