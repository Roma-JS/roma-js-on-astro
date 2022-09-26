interface ImportMetaEnv {
  readonly PUBLIC_COMMIT_ID: string;
  readonly PUBLIC_BUILD_DATE: string;
  readonly PUBLIC_TWITTER_HANDLE: string;
  readonly PUBLIC_FACEBOOK_PAGE_HREF: string;
  readonly PUBLIC_YOUTUBE_PAGE_HREF: string;
  readonly PUBLIC_SLACK_INVITE_HREF: string;
  readonly PUBLIC_TWITTER_PROFILE_HREF: string;
  readonly PUBLIC_GITHUB_PROFILE_HREF: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
