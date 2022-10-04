import { ComponentProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

export type BlogPostCommentsProps = ComponentProps<'div'>;

export function BlogPostComments(props: BlogPostCommentsProps): JSX.Element {
  const [local, otherProps] = splitProps(props, ['children']);

  return (
    <div {...otherProps}>
      {local.children}
      <script
        src="https://giscus.app/client.js"
        data-repo={import.meta.env.PUBLIC_GISCUS_REPO_NAME}
        data-repo-id={import.meta.env.PUBLIC_GISCUS_REPO_ID}
        data-category={import.meta.env.PUBLIC_GISCUS_CATEGORY_NAME}
        data-category-id={import.meta.env.PUBLIC_GISCUS_CATEGORY_ID}
        data-mapping="pathname"
        data-strict="1"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="it"
        data-loading="lazy"
        crossorigin="anonymous"
        async
      />
    </div>
  );
}
