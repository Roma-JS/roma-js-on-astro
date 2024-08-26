import { parse as parseDate } from 'date-fns';

const monthFormat = 'LL';

export type ParseMonthsListOutput = {
  /**
   * Set of **0-based** index months.
   */
  readonly parsedMonths: Set<number>;
  readonly errors: { input: string; error: unknown }[];
};

/**
 * Parses a comma separated list of months.
 *
 * Returns an output object containing a set of **0-based** index months.
 *
 * @param months a comma separated list of months.
 * @returns {ParseMonthsListOutput} an output object
 */
export const parseMonthsList = (
  months: string | undefined | null
): ParseMonthsListOutput => {
  const formattedMonths =
    months
      ?.trim()
      .split(/\s*,\s*/)
      .filter(Boolean) ?? [];
  const referenceDate = new Date(new Date().getFullYear(), 0, 4); // A reference date with timezone-safe date of month.

  const output: ParseMonthsListOutput = {
    parsedMonths: new Set<number>(),
    errors: [],
  };

  for (const formattedMonth of formattedMonths) {
    try {
      const parsedDate = parseDate(formattedMonth, monthFormat, referenceDate);

      if (Number.isFinite(parsedDate.getTime())) {
        output.parsedMonths.add(parsedDate.getMonth());
      } else {
        throw new Error(
          `parseMonthsList: cannot parse date using format=${monthFormat}, input=${formattedMonth}`
        );
      }
    } catch (err) {
      output.errors.push({
        input: formattedMonth,
        error: err,
      });
    }
  }

  return output;
};
