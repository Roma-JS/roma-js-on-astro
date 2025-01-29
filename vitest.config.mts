import { defineConfig } from 'vitest/config';
import path from 'node:path';

const srcPath = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
  resolve: {
    alias: {
      '@components': path.resolve(srcPath, 'components'),
      '@layouts': path.resolve(srcPath, 'layouts'),
      '@i18n': path.resolve(srcPath, 'i18n'),
      '@pages': path.resolve(srcPath, 'pages'),
      '@media': path.resolve(srcPath, 'media'),
      '@types': path.resolve(srcPath, 'types'),
      '@api': path.resolve(srcPath, 'api'),
    },
  },
});
