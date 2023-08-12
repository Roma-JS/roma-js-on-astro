import { JSX, ComponentProps, splitProps } from 'solid-js';
import type { MarkdownInstance } from 'astro';
import type { Frontmatter } from 'utils/blog';
import styles from './styles.module.scss';

export interface BlogPostCardProps extends ComponentProps<'section'> {
  post: MarkdownInstance<Frontmatter>;
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
      href={local.post.url}
      aria-label={[
        local.post.frontmatter.title,
        local.post.frontmatter.author,
      ].join(', ')}
    >
      <section classList={classList()} aria-hidden="true" {...otherProps}>
        <h2 class={styles.heading}>{local.post.frontmatter.title}</h2>
        <div class={styles.infoRow}>
          <time dateTime={local.post.frontmatter.createdAt}>
            {local.post.frontmatter.createdAt.split('T')[0]}
          </time>
          {' - '}
          <span>{local.post.frontmatter.author}</span>
        </div>
      </section>
    </a>
  );
}
