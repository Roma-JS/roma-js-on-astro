interface ImportMetaEnv {
  readonly PUBLIC_COMMIT_ID: string;
  readonly PUBLIC_BUILD_DATE: string;
  readonly PUBLIC_TWITTER_HANDLE: string;
  readonly PUBLIC_FACEBOOK_PAGE_HREF: string;
  readonly PUBLIC_YOUTUBE_PAGE_HREF: string;
  readonly PUBLIC_DISCORD_INVITE_HREF: string;
  readonly PUBLIC_TWITTER_PROFILE_HREF: string;
  readonly PUBLIC_GITHUB_PROFILE_HREF: string;
  /**
   * Comma separated list of 1-index months for wich we do not generate
   * an upcoming event.
   *
   * Does not filter events generated from external data sources.
   */
  readonly PUBLIC_MONTHS_WITHOUT_GENERATED_UPCOMING_EVENTS: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_URL_BASE: string;
  readonly PUBLIC_GISCUS_REPO_NAME: string;
  readonly PUBLIC_GISCUS_REPO_ID: string;
  readonly PUBLIC_GISCUS_CATEGORY_NAME: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID: string;
  readonly PUBLIC_CFP_FORM_HREF: string;
  readonly PUBLIC_MEETUP_PAGE_SIZE: string;
  readonly MEETUP_GRAPHQL_ENDPOINT: string;
  readonly MEETUP_GROUP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
