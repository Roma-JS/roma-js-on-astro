import type { Lang } from '@i18n/types';
import {
  computeTranslation,
  createTranslate,
  type L10nKey,
} from '../translate';

describe('i18n/translate', () => {
  describe('computeTranslation', () => {
    it.each([
      {
        key: 'missing-value-of-key',
        dict: { aa: 'bb', cc: 'dd' },
        replace: undefined,
        expected: 'missing-value-of-key',
      },
      {
        key: 'aa',
        dict: { aa: 'bb', cc: 'dd' },
        replace: undefined,
        expected: 'bb',
      },
      {
        key: 'aa',
        dict: { aa: 'bb', cc: 'dd' },
        replace: {} as Record<string, string>,
        expected: 'bb',
      },
      {
        key: 'aa',
        dict: { aa: 'bb', cc: 'dd' },
        replace: { cc: 'dd' },
        expected: 'bb',
      },
      {
        key: 'aa',
        dict: { aa: 'bb {{cc}}', cc: 'dd' },
        replace: { cc: 'dd' },
        expected: 'bb dd',
      },
      {
        key: 'aa',
        dict: { aa: 'bb {{cc}}{{ff}}', cc: 'dd' },
        replace: { cc: 'dd', ff: 2 },
        expected: 'bb dd2',
      },
    ])(
      'key=$key, dict=$dict, replace=$replace => $expected',
      ({ key, dict, replace, expected }) => {
        expect(computeTranslation(key, dict, replace)).toBe(expected);
      }
    );
  });

  describe('createTranslate', () => {
    it.each([
      { lang: 'it', key: 'breadcrumbs', expected: 'collegamenti del sito' },
      { lang: 'en', key: 'breadcrumbs', expected: 'website links' },
    ] as { lang: Lang; key: L10nKey; expected: string }[])(
      'returns a translate function for lang=$lang',
      async ({ lang, key, expected }) => {
        const l10n = await createTranslate(lang);

        expect(typeof l10n).toBe('function');
        expect(l10n(key)).toBe(expected);
        expect(l10n('key-not-found-in-the-dictionary-do-not-add' as any)).toBe(
          'key-not-found-in-the-dictionary-do-not-add'
        );
      }
    );
  });
});
