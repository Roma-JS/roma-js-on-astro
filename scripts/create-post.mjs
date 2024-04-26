import prompts from 'prompts';
import paths from './utils/paths.cjs';
import path from 'path';
import Mustache from 'mustache';
import fs from 'fs/promises';
import chalk from 'chalk';
import slugify from 'slugify';
import process from 'process';
import { fileURLToPath } from 'url';

/**
 * @type {(createdAt: string, title: string) => string}
 */
export function createBlogPostSlug(createdAt, title) {
  return slugify(`${createdAt.split('T')[0]}-${title}`, {
    lower: true,
    trim: true,
    strict: true,
  });
}

async function createPostPrompts() {
  const { allowedCategories } = JSON.parse(
    await fs.readFile(paths.postCategories, { encoding: 'utf-8' })
  );

  const enableTerminalCursor = () => {
    process.stdout.write('\x1B[?25h');
  };

  const onState = (state) => {
    if (state.aborted) {
      // If we don't re-enable the terminal cursor before exiting
      // the program, the cursor will remain hidden
      enableTerminalCursor();
      process.stdout.write('\n');
      process.stdout.write('[create-post]: prompt aborted\n');
      process.exit(1);
    }
  };

  return prompts(
    [
      {
        type: 'text',
        name: 'title',
        message: 'Enter the blog post title',
        format(txt) {
          return txt.trim();
        },
        validate(txt) {
          if (txt.trim().length < 3) {
            return 'Title is too short: at least 3 characters';
          }

          return true;
        },
      },
      {
        type: 'select',
        name: 'lang',
        message: 'Select blog post language',
        choices: [
          { title: 'italian', value: 'it' },
          { title: 'english', value: 'en' },
        ],
        initial: 0,
      },
      {
        type: 'date',
        name: 'createdAt',
        message: 'Select creation date',
        initial: new Date(),
        validate(date) {
          return date > Date.now()
            ? "We can't publish in the future... yet"
            : true;
        },
      },
      {
        type: 'autocompleteMultiselect',
        name: 'categories',
        message: 'select blog post categories',
        get instructions() {
          return `You need to select min ${this.min ?? 0}, max ${
            (this.max || this.min) ?? 0
          } categories.\nYou can always add one in post-categories.json if it is not in this list.`;
        },
        set instructions(val) {},
        choices: allowedCategories.map((category) => ({
          title: category,
          value: category,
        })),
        min: 1,
        max: 5,
      },
      {
        type: 'text',
        name: 'author',
        initial: 'RomaJS team',
        message: 'Enter blog post Author',
        format(txt) {
          return txt.trim();
        },
        validate(txt) {
          if (txt.trim().length < 3) {
            return 'Author is too short: at least 3 characters';
          }

          return true;
        },
      },
    ].map((prompt) => ({ ...prompt, onState }))
  );
}

async function cli() {
  console.log(chalk.cyan('create-post\n'));
  const templateFilePath = path.resolve(
    paths.templatesDir,
    'blog-post-simple.hbs'
  );
  const template = await fs.readFile(templateFilePath, { encoding: 'utf-8' });

  const responses = await createPostPrompts();
  const createdAt = responses.createdAt.toISOString();

  const blogPostRendered = Mustache.render(template, {
    ...responses,
    title: JSON.stringify(responses.title),
    author: JSON.stringify(responses.author),
    createdAt: JSON.stringify(createdAt),
    lang: JSON.stringify(responses.lang),
    categories: JSON.stringify(responses.categories),
  });

  const newPostFilePath = path.resolve(
    paths.blogPostsDir,
    `${createBlogPostSlug(createdAt, responses.title)}.md`
  );

  await fs.writeFile(newPostFilePath, blogPostRendered, {
    encoding: 'utf-8',
    // Do not ovewrite existing files
    // @see https://nodejs.org/api/fs.html#file-system-flags
    flag: 'wx',
  });

  console.log(
    chalk.green(
      `[create-post] A new post has been created at ${newPostFilePath}`
    )
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cli().catch((...args) => {
    console.error(chalk.red('[create-post][error]\n\n'), ...args);

    if (!process.exitCode) {
      process.exitCode = 1;
    }
  });
}
