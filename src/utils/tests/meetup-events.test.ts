import {
  computeUpcomingEvents,
  computeScheduledEvents,
  computeThirdWednesdayOfMonth,
} from '../meetup-events';
import upcomingEventsMarch2024 from './2024-03-09-upcoming-romajs-events.json';
import type { MeetupEventType } from '@api/meetup/event.graqhql.types';

const singleUpcomingEventList = upcomingEventsMarch2024 as MeetupEventType[];

describe('meetup-events', () => {
  describe('computeScheduledEvents', () => {
    it('returns an empty array when input is nil', () => {
      expect(computeScheduledEvents([])).toHaveLength(0);
      expect(computeScheduledEvents(null)).toHaveLength(0);
      expect(computeScheduledEvents(undefined)).toHaveLength(0);
    });

    it('returns the expected shape when input is not empty', () => {
      const output = computeScheduledEvents(singleUpcomingEventList);

      expect(output).toHaveLength(1);
      expect(output[0]).toHaveProperty('type', 'scheduled');
      expect(output[0]).toHaveProperty('data', singleUpcomingEventList[0]);
      expect(output[0]).toHaveProperty(
        'epochTimeMs',
        new Date(singleUpcomingEventList[0].dateTime).getTime()
      );
    });
  });

  describe('computeThirdWednesdayOfMonth', () => {
    it.each([
      { input: new Date('2024-03-09'), expectedDayOfMonth: 20 },
      { input: new Date('2024-03-28'), expectedDayOfMonth: 20 },
      { input: new Date('2024-08-28'), expectedDayOfMonth: 21 },
      { input: new Date('2024-05-01'), expectedDayOfMonth: 15 },
    ])(
      'date=$input => 3rd-wed=$expectedDayOfMonth',
      ({ input, expectedDayOfMonth }) => {
        const output = computeThirdWednesdayOfMonth(input);

        expect(output.getDay()).toBe(3); // Always Wednesday
        expect(output.getDate()).toBe(expectedDayOfMonth);
      }
    );
  });

  describe('computeUpcomingEvents', () => {
    it("returns 3 placeholders when there's no scheduled event and date is after 3rd Wed", () => {
      const currentEpochTime = new Date('2024-03-28').getTime();
      const placeholders = computeUpcomingEvents([], currentEpochTime);

      expect(placeholders).toHaveLength(3);
      expect(
        placeholders.every(
          (r) => r.type === 'placeholder' && r.date.getDay() === 3
        )
      ).toBe(true);
    });

    it("returns 4 placeholders events when there's no scheduled event and date is before 3rd Wed", () => {
      const currentEpochTime = new Date('2024-03-09').getTime();
      const placeholders = computeUpcomingEvents([], currentEpochTime);
      expect(placeholders).toHaveLength(4);
      expect(placeholders.every((r) => r.type === 'placeholder')).toBe(true);

      expect(placeholders).toMatchInlineSnapshot(`
        [
          {
            "date": 2024-03-19T23:00:00.000Z,
            "epochTimeMs": 1710889200000,
            "type": "placeholder",
          },
          {
            "date": 2024-04-16T22:00:00.000Z,
            "epochTimeMs": 1713304800000,
            "type": "placeholder",
          },
          {
            "date": 2024-05-14T22:00:00.000Z,
            "epochTimeMs": 1715724000000,
            "type": "placeholder",
          },
          {
            "date": 2024-06-18T22:00:00.000Z,
            "epochTimeMs": 1718748000000,
            "type": "placeholder",
          },
        ]
      `);
    });

    it("returns 1 scheduled and 3 placeholders when there's a scheduled and date is before 3rd Wed", () => {
      const currentEpochTime = new Date('2024-03-09').getTime();
      const [first, ...other] = computeUpcomingEvents(
        singleUpcomingEventList,
        currentEpochTime
      );

      expect(first.type === 'scheduled' && first.data).toBe(
        singleUpcomingEventList[0]
      );
      expect(other).toHaveLength(3);
      expect(other).toMatchInlineSnapshot(`
        [
          {
            "date": 2024-04-16T22:00:00.000Z,
            "epochTimeMs": 1713304800000,
            "type": "placeholder",
          },
          {
            "date": 2024-05-14T22:00:00.000Z,
            "epochTimeMs": 1715724000000,
            "type": "placeholder",
          },
          {
            "date": 2024-06-18T22:00:00.000Z,
            "epochTimeMs": 1718748000000,
            "type": "placeholder",
          },
        ]
      `);
    });

    it('filters out the generated placeholders when monthsWithoutGeneratedUpcomingEvents is provided', () => {
      const currentEpochTime = new Date('2024-03-09').getTime();
      const [_, ...placeholders] = computeUpcomingEvents(
        singleUpcomingEventList,
        currentEpochTime,
        {
          monthsWithoutGeneratedUpcomingEvents: '04,6',
        }
      );

      expect(placeholders).toHaveLength(1);
      expect(new Date(placeholders[0].epochTimeMs).getMonth()).toBe(4);
    });

    it('does not filter out the scheduled events', () => {
      const currentEpochTime = new Date('2024-03-09').getTime();
      const events = computeUpcomingEvents(
        singleUpcomingEventList,
        currentEpochTime,
        {
          monthsWithoutGeneratedUpcomingEvents: '1,2,3,4,5,6,7,8,9,10,11,12',
        }
      );

      expect(events).toHaveLength(1);
      expect(events[0]).toHaveProperty('type', 'scheduled');
      expect(new Date(events[0].epochTimeMs).getMonth()).toBe(
        2 /* 0-based index */
      );
    });
  });
});
