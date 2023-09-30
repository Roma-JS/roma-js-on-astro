import type { Lang } from '@i18n/types';
import slugify from 'slugify';
import type { CollectionEntry } from 'astro:content';

export interface Category {
  posts: CollectionEntry<'blog-posts'>[];
  slug: string;
  name: string;
  url: string;
}

export function ascendingCreatedAtComparator(
  a: CollectionEntry<'blog-posts'>,
  b: CollectionEntry<'blog-posts'>
): number {
  if (b.data.createdAt === a.data.createdAt) {
    return 0;
  }

  return a.data.createdAt > b.data.createdAt ? 1 : -1;
}

export function descendingCreatedAtComparator(
  a: CollectionEntry<'blog-posts'>,
  b: CollectionEntry<'blog-posts'>
): number {
  return ascendingCreatedAtComparator(b, a);
}

export function getBlogPostLink(blogPost: CollectionEntry<'blog-posts'>) {
  return `/blog/post/${blogPost.slug}`;
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
  posts: CollectionEntry<'blog-posts'>[],
  comparator = descendingCreatedAtComparator
): CollectionEntry<'blog-posts'>[] {
  return posts.slice().sort(comparator);
}

export function computeAllCategories(
  posts: CollectionEntry<'blog-posts'>[],
  basename: string
): Map<string, Category> {
  const output: Map<string, Category> = new Map();

  for (const post of posts) {
    for (const category of post.data.categories) {
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
