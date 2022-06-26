interface ImportMetaEnv {
  readonly PUBLIC_COMMIT_ID: string;
  readonly PUBLIC_BUILD_DATE: string;
  readonly PUBLIC_TWITTER_HANDLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
