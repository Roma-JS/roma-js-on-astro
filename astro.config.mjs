import { execFileSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import { env } from 'process';

function enhanceEnvVariables() {
  if (!env.PUBLIC_BUILD_DATE) {
    env.PUBLIC_BUILD_DATE = new Date().toISOString();
  }

  if (!env.PUBLIC_COMMIT_ID) {
    env.PUBLIC_COMMIT_ID = execFileSync(
      'git',
      ['rev-parse', '--short', 'HEAD'],
      { encoding: 'utf8' }
    ).trim();
  }
}

enhanceEnvVariables();

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  site: 'https://romajs.org',
});
