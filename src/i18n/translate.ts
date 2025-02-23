import type { Lang } from './types';
import type L10nMessages from './translations/it.json';

export type L10nKey = keyof typeof L10nMessages;

export type ReplaceConfig = Record<string, string | number>;

export interface Translate {
  (key: L10nKey, replace?: Record<string, string | number>): string;
}

export async function getTranslations(
  lang: Lang
): Promise<typeof L10nMessages> {
  switch (lang) {
    case 'it': {
      return import('./translations/it.json');
    }
    case 'en': {
      return import('./translations/en.json');
    }
    default:
      throw new TypeError(`unsupported lang received ${lang}`);
  }
}

export function computeTranslation(
  key: string,
  dictionary: Record<string, string>,
  replace?: ReplaceConfig | undefined
): string {
  let dictionaryValue: string | undefined = dictionary[key];

  if (typeof dictionaryValue !== 'string') {
    return key;
  }

  if (replace && typeof replace === 'object') {
    for (const replaceKey in replace) {
      dictionaryValue = dictionaryValue.replaceAll(
        `{{${replaceKey}}}`,
        String(replace[replaceKey])
      );
    }
  }

  return dictionaryValue;
}

export async function createTranslate(lang: Lang): Promise<Translate> {
  const translations = await getTranslations(lang);

  return function translate(key, config) {
    return computeTranslation(key, translations, config);
  };
}
