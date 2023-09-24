import type { MeetupEventType } from '@api/meetup/event.graqhql.types';

export interface MeetupEventsApiResponse {
  events: Pick<
    MeetupEventType,
    'id' | 'title' | 'dateTime' | 'eventUrl' | 'group' | 'duration' | 'venue'
  >[];
}

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
