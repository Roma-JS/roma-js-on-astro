import { sortPosts, CommonFrontmatterProperties } from 'utils/blog';

export interface PostInfoDto {
  frontmatter: CommonFrontmatterProperties;
  url: string;
  markdown: string;
}

export async function get() {
  const postImportResult = await Promise.all(
    Object.values(import.meta.glob('../../blog/post/**/*.md')).map((get) =>
      get()
    )
  );
  const posts = sortPosts(Object.values(postImportResult) as any);

  return {
    body: JSON.stringify(
      posts.map(
        (post): PostInfoDto => ({
          frontmatter: {
            title: post.frontmatter.title,
            categories: post.frontmatter.categories,
            lang: post.frontmatter.lang,
            createdAt: post.frontmatter.description,
            author: post.frontmatter.author,
          },
          url: post.url ?? '',
          markdown: post.rawContent(),
        })
      )
    ),
  };
}
