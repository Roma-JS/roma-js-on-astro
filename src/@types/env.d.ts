interface ImportMetaEnv {
  readonly PUBLIC_COMMIT_ID: string;
  readonly PUBLIC_BUILD_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
