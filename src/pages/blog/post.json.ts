import { sortPosts, Frontmatter } from 'utils/blog';

export interface PostInfoDto {
  frontmatter: Frontmatter;
  url: string;
  markdown: string;
}

export async function get() {
  const postImportResult = import.meta.globEager('./post/**/*.md');
  const posts = sortPosts(Object.values(postImportResult) as any);

  return {
    body: JSON.stringify(
      posts.map(
        (post): PostInfoDto => ({
          frontmatter: post.frontmatter,
          url: post.url ?? '',
          markdown: post.rawContent(),
        })
      )
    ),
  };
}
