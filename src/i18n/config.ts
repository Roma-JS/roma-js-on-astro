import { I18nRouteParams } from './types';

export const i18nLang = Object.freeze({
  it: {
    locale: 'it-IT',
  },
  en: {
    locale: 'en-US',
  },
  rm: {
    locale: 'rm-RM',
  },
} as const);

export function getI18nRouteParams(): I18nRouteParams[] {
  return Object.entries(i18nLang).map(([lang]) => ({
    lang,
  }));
}
