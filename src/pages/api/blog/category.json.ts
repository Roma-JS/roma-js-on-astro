import { sortPosts, computeAllCategories, getBlogPostLink } from 'utils/blog';
import { getCollection } from 'astro:content';

export interface CategoryInfoDto {
  name: string;
  slug: string;
  url: string;
  posts: { url: string; title: string; author: string }[];
}

export async function get() {
  const posts = sortPosts(await getCollection('blog-posts'));
  const allCategories = computeAllCategories(posts, import.meta.env.BASE_URL);

  const allCategoriesList = Array.from(allCategories.values());

  return {
    body: JSON.stringify(
      allCategoriesList.map(
        (category): CategoryInfoDto => ({
          name: category.name,
          slug: category.slug,
          url: category.url,
          posts: category.posts.map((post) => ({
            url: getBlogPostLink(post),
            title: post.data.title,
            author: post.data.author,
          })),
        })
      )
    ),
  };
}
