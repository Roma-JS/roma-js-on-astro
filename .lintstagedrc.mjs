export default {
  '*.{js,jsx,ts,tsx,json,css,scss,sass,md,yml,yaml,cjs,mjs,cts,mts,html,htm,babelrc}':
    'prettier --write',
  '*.astro': () => 'astro check',
  '*.{ts,tsx,mts,cts}': () => 'tsc --noEmit',
};
