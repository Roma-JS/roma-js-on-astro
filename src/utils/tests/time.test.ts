import { parseMonthsList, type ParseMonthsListOutput } from '../time';

describe('time', () => {
  describe('parseMonthsWithoutGeneratedEvents', () => {
    const createEmpyOutput = (): ParseMonthsListOutput => ({
      parsedMonths: new Set(),
      errors: [],
    });

    it.each([undefined, null, '', ' ', '\n'])(
      'returns empty output (0 months & 0 errors) when input=%j',
      (input) => {
        expect(parseMonthsList(input)).toEqual(createEmpyOutput());
      }
    );

    it.each([
      {
        input: '08',
        parsedMonths: new Set([7]),
      },
      {
        input: '8',
        parsedMonths: new Set([7]),
      },
      {
        input: '08,01,3,4',
        parsedMonths: new Set([0, 2, 3, 7]),
      },
      {
        input: ', 08 ,01,3,4,4,8,, , ,',
        parsedMonths: new Set([0, 2, 3, 7]),
      },
    ])(
      'parses input=$input without errors and parsedMonths=$parsedMonths',
      ({ input, parsedMonths }) => {
        const output = parseMonthsList(input);
        expect(output.parsedMonths).toEqual(parsedMonths);
        expect(output.errors).toHaveLength(0);
      }
    );

    it.each([
      {
        input: '01,0,5,13,NaN',
        expected: {
          parsedMonths: new Set([0, 4]),
          invalidMonths: ['0', '13', 'NaN'],
        },
      },
      {
        input: '-1',
        expected: {
          parsedMonths: new Set([]),
          invalidMonths: ['-1'],
        },
      },
    ])(
      'parses input=$input correctly when there is invalid input',
      ({ input, expected }) => {
        const output = parseMonthsList(input);
        expect(output.parsedMonths).toEqual(expected.parsedMonths);
        expect(output.errors.map((r) => r.input).sort()).toEqual(
          expected.invalidMonths.slice().sort()
        );
      }
    );
  });
});
