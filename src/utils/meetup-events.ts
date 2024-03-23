import type { MeetupEventType } from '@api/meetup/event.graqhql.types';
import {
  startOfMonth,
  nextWednesday,
  isWednesday,
  isSameDay,
  isBefore,
  addMonths,
} from 'date-fns';

export interface MeetupEventsApiResponse {
  events: Pick<
    MeetupEventType,
    'id' | 'title' | 'dateTime' | 'eventUrl' | 'group' | 'duration' | 'venue'
  >[];
}

export type ScheduledEvent = {
  type: 'scheduled';
  data: MeetupEventType;
  epochTimeMs: number;
};
export type PlaceholderEvent = {
  type: 'placeholder';
  date: Date;
  epochTimeMs: number;
};

export type UpcomingEvent = ScheduledEvent | PlaceholderEvent;

export function computeMeetupEventsApiResponse(
  meetupEvents: MeetupEventType[] | null | undefined
): MeetupEventsApiResponse {
  return {
    events: (meetupEvents || [])?.map(
      ({ id, eventUrl, title, dateTime, group, duration, venue }) => ({
        id,
        title,
        dateTime,
        eventUrl,
        group,
        duration,
        venue,
      })
    ),
  };
}

export const pastEventsPageSise =
  parseInt(import.meta.env.PUBLIC_MEETUP_PAGE_SIZE, 10) || 10;

/**
 * Computes the 3rd Wednesday of the month of the input date
 * and returns it as a Date.
 * @param date input date.
 */
export function computeThirdWednesdayOfMonth(date: Date | number): Date {
  const firstDayOfNextMonth = startOfMonth(date);

  if (isWednesday(firstDayOfNextMonth)) {
    return nextWednesday(nextWednesday(firstDayOfNextMonth));
  }

  return nextWednesday(nextWednesday(nextWednesday(firstDayOfNextMonth)));
}

export function computeScheduledEvents(
  scheduledUpcomingEvents: MeetupEventType[] | undefined | null
): ScheduledEvent[] {
  return (
    scheduledUpcomingEvents?.map(
      (data): ScheduledEvent => ({
        type: 'scheduled',
        data,
        epochTimeMs: new Date(data.dateTime).getTime(),
      })
    ) || []
  );
}

/**
 * Given a list of scheduled events, returns a list of scheduled and placeholder
 * events sorted by date in ascending order.
 * @param scheduledUpcomingEvents Scheduled events
 * @param curentEpochTimeMs built time epoch time i.e. Date.now().
 * @see {@link UpcomingEvent}
 */
export function computeUpcomingEvents(
  scheduledUpcomingEvents: MeetupEventType[] | undefined | null,
  curentEpochTimeMs: number
): UpcomingEvent[] {
  const scheduledEvents = computeScheduledEvents(scheduledUpcomingEvents);

  const meetupOfThisMonth = computeThirdWednesdayOfMonth(curentEpochTimeMs);
  const isNowBeforeMeetup =
    !isSameDay(curentEpochTimeMs, meetupOfThisMonth) &&
    isBefore(curentEpochTimeMs, meetupOfThisMonth);

  const placeholderMonths = isNowBeforeMeetup ? [0, 1, 2, 3] : [1, 2, 3];

  const placeholderEvents = placeholderMonths
    .map((month): PlaceholderEvent => {
      const date = computeThirdWednesdayOfMonth(
        addMonths(new Date(curentEpochTimeMs), month)
      );

      return {
        type: 'placeholder',
        date,
        epochTimeMs: date.getTime(),
      };
    })
    .filter(
      (placeholder) =>
        !scheduledEvents.some(
          (scheduled) =>
            isSameDay(scheduled.epochTimeMs, placeholder.epochTimeMs) // filter out placeholder if overlaps with a scheduled event
        )
    );

  return (scheduledEvents as UpcomingEvent[])
    .concat(placeholderEvents)
    .sort((a, b) => a.epochTimeMs - b.epochTimeMs);
}
