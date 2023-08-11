import prompts from 'prompts';
import paths from './utils/paths.cjs';
import path from 'path';
import Mustache from 'mustache';
import fs from 'fs/promises';
import chalk from 'chalk';
import process from 'process';
import { fileURLToPath } from 'url';
import { humanId } from 'human-id';

/**
 * @type {() => string}
 */
export function createUpcomingEventSlug() {
  return humanId({
    adjectiveCount: 2,
    separator: '-',
    capitalize: false,
    addAdverb: false,
  });
}

async function createUpcomingEventPrompts() {
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
      process.stdout.write('[create-event]: prompt aborted\n');
      process.exit(1);
    }
  };

  return prompts(
    [
      {
        type: 'text',
        name: 'title',
        message: 'Enter event title',
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
        type: 'text',
        name: 'speaker',
        message: 'Enter the event speaker',
        initial: 'RomaJS',
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
        type: 'date',
        name: 'startsAt',
        message: 'Select starting date',
        initial() {
          const initialDate = new Date();
          initialDate.setHours(20, 0, 0, 0);

          return initialDate;
        },
      },
      {
        type: 'toggle',
        name: 'hasCallForPapers',
        message: 'has call for papers?',
        initial: true,
        active: 'yes',
        inactive: 'no',
      },
      {
        type: 'autocompleteMultiselect',
        name: 'categories',
        message: 'Select event labels',
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
    ].map((prompt) => ({ ...prompt, onState }))
  );
}

async function cli() {
  console.log(chalk.cyan('[create-event]\n'));
  const templateFilePath = path.resolve(paths.templatesDir, 'event.hbs');
  const template = await fs.readFile(templateFilePath, { encoding: 'utf-8' });

  const responses = await createUpcomingEventPrompts();
  const startsAt = responses.startsAt.toISOString();

  const upcomingEventRendered = Mustache.render(template, {
    ...responses,
    title: JSON.stringify(responses.title),
    speaker: JSON.stringify(responses.title),
    startsAt: JSON.stringify(startsAt),
    hasCallForPapers: JSON.stringify(responses.hasCallForPapers),
    categories: JSON.stringify(responses.categories),
  });

  const newUpcomingEventFilePath = path.resolve(
    paths.upcomingEventsDir,
    `${createUpcomingEventSlug()}.yml`
  );

  await fs.mkdir(paths.upcomingEventsDir, { recursive: true });

  await fs.writeFile(newUpcomingEventFilePath, upcomingEventRendered, {
    encoding: 'utf-8',
    // Do not ovewrite existing files
    // @see https://nodejs.org/api/fs.html#file-system-flags
    flag: 'wx',
  });

  console.log(
    chalk.green(
      `[create-event] A upcoming event has been created at ${newUpcomingEventFilePath}`
    )
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cli().catch((...args) => {
    console.error(chalk.red('[create-event][error]\n\n'), ...args);

    if (!process.exitCode) {
      process.exitCode = 1;
    }
  });
}
