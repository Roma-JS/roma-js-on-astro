import slugify from 'slugify';
import process from 'node:process';
import assert from 'node:assert/strict';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

export function getAbstractSlug(params) {
  assert.ok(params, 'params');
  assert.ok(params.title, 'params.title');
  assert.ok(params.author, 'params.author');

  return slugify(`${params.title} by ${params.author}`, {
    lower: true,
    strict: true,
  });
}

async function main() {
  const args = parseArgs({
    args: process.argv.slice(2),
    options: {
      author: { short: 'a', type: 'string' },
      title: { short: 't', type: 'string' },
    },
    allowPositionals: false,
    allowNegative: false,
  });

  console.log(getAbstractSlug(args.values));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((...args) => {
    console.error(chalk.red('[create-post][error]\n\n'), ...args);

    if (!process.exitCode) {
      process.exitCode = 1;
    }
  });
}
