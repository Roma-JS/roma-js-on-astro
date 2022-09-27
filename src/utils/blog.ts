import { Lang } from '@i18n/types';
import type { MarkdownInstance } from 'astro';
import slugify from 'slugify';

export interface CommonFrontmatterProperties {
  /**
   * An ISO 8601 timestamp of the instant the blogpost was created.
   *
   * `myDate.toISOString();`
   */
  createdAt: string;
  title: string;
  author: string;
  categories: string[];
  lang: Lang;
}
export interface Frontmatter extends CommonFrontmatterProperties {
  [otherValues: string]: any;
}

export interface Category {
  posts: MarkdownInstance<Frontmatter>[];
  slug: string;
  name: string;
  url: string;
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

export function createSlug(content: string): string {
  return slugify(content, {
    strict: true,
    trim: true,
    lower: true,
  });
}

export function createCategoryUrl(basename: string, category: string) {
  return `${basename.replace(/\/+$/, '')}/blog/category/${createSlug(
    category
  )}`;
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

export function computeAllCategories(
  posts: MarkdownInstance<Frontmatter>[],
  basename: string
): Map<string, Category> {
  const output: Map<string, Category> = new Map();

  for (const post of posts) {
    for (const category of post.frontmatter.categories) {
      const postArray = output.get(category)?.posts;

      if (!postArray) {
        const slug = createSlug(category);

        output.set(category, {
          name: category,
          posts: [post],
          slug,
          url: createCategoryUrl(basename, category),
        });
      } else {
        postArray.push(post);
      }
    }
  }

  return output;
}
