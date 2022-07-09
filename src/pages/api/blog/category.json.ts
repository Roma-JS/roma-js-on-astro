import {
  sortPosts,
  CommonFrontmatterProperties,
  computeAllCategories,
} from 'utils/blog';

export interface CategoryInfoDto {
  name: string;
  slug: string;
  url: string;
  posts: { url: string; title: string; author: string }[];
}

export async function get() {
  const postImportResult = import.meta.globEager('../../blog/post/**/*.md');
  const posts = sortPosts(Object.values(postImportResult) as any);
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
            url: post.url ?? '',
            title: post.frontmatter.title,
            author: post.frontmatter.author,
          })),
        })
      )
    ),
  };
}
