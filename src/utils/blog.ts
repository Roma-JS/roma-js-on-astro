import type { MarkdownInstance } from 'astro';

export interface Frontmatter {
  /**
   * An ISO 8601 timestamp of the instant the article is published:
   *
   * `myDate.toISOString();`
   */
  publishDate: string;
  /**
   * An ISO 8601 timestamp of the instant the blogpost was created.
   *
   * `myDate.toISOString();`
   */
  creationDate: string;
  title: string;
  [otherValues: string]: any;
}

export function ascendingPublishDateComparator(
  a: MarkdownInstance<Frontmatter>,
  b: MarkdownInstance<Frontmatter>
): number {
  if (b.frontmatter.publishDate === a.frontmatter.publishDate) {
    return 0;
  }

  return a.frontmatter.publishDate > b.frontmatter.publishDate ? 1 : -1;
}

export function descendigPublishDateComparator(
  a: MarkdownInstance<Frontmatter>,
  b: MarkdownInstance<Frontmatter>
): number {
  return ascendingPublishDateComparator(b, a);
}

/**
 * Sorts blog posts.
 * @param posts
 * @param comparator Defaults to `descendigPublishDateComparator`
 */
export function sortPosts(
  posts: MarkdownInstance<Frontmatter>[],
  comparator = descendigPublishDateComparator
): MarkdownInstance<Frontmatter>[] {
  return posts.slice().sort(comparator);
}
