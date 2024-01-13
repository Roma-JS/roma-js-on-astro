let dateFormatterMap: Map<string, Intl.DateTimeFormat> = new Map();

export function formatDate(
  locale: 'it' | 'en',
  date: string | null | number | Date | undefined | null
): string {
  let formatter = dateFormatterMap.get(locale);

  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    dateFormatterMap.set(locale, formatter);
  }

  const epochTime = date == null ? NaN : new Date(date);

  return Number.isNaN(epochTime) ? '' : formatter.format(epochTime);
}
