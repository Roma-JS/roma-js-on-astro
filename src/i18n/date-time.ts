import { i18nLang } from '@i18n/config';

let dateFormatterMap: Map<string, Intl.DateTimeFormat> = new Map();

export function formatDate(
  lang: 'it' | 'en',
  date: string | null | number | Date | undefined | null
): string {
  const locale = i18nLang[lang].locale;
  let formatter = dateFormatterMap.get(locale);

  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Rome',
    });

    dateFormatterMap.set(locale, formatter);
  }

  const epochTime: number = date == null ? NaN : new Date(date).getTime();

  return Number.isNaN(epochTime) ? '' : formatter.format(epochTime);
}
