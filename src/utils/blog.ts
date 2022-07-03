import type { MarkdownInstance } from 'astro';
import type { Lang } from '../i18n/config';
export interface Frontmatter {
  /**
   * An ISO 8601 timestamp of the instant the blogpost was created.
   *
   * `myDate.toISOString();`
   */
  createdAt: string;
  title: string;
  description: string;
  author: string;
  categories: string[];
  lang: Lang;
  [otherValues: string]: any;
}

export function ascendingCreatedAtComparator(
  a: MarkdownInstance<Frontmatter>,
  b: MarkdownInstance<Frontmatter>
): number {
  if (b.frontmatter.createdAt === a.frontmatter.createdAt) {
    return 0;
  }

  return a.frontmatter.createdAt > b.frontmatter.createdAt ? 1 : -1;
}

export function descendingCreatedAtComparator(
  a: MarkdownInstance<Frontmatter>,
  b: MarkdownInstance<Frontmatter>
): number {
  return ascendingCreatedAtComparator(b, a);
}

/**
 * Sorts blog posts.
 * @param posts
 * @param comparator Defaults to `descendigPublishDateComparator`
 */
export function sortPosts(
  posts: MarkdownInstance<Frontmatter>[],
  comparator = descendingCreatedAtComparator
): MarkdownInstance<Frontmatter>[] {
  return posts.slice().sort(comparator);
}
