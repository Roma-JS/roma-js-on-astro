import type { MeetupEventType } from '@api/meetup/event.graqhql.types';

export interface MeetupEventsApiResponse {
  events: Pick<
    MeetupEventType,
    'id' | 'title' | 'dateTime' | 'eventUrl' | 'group' | 'duration'
  >[];
}

export function computeMeetupEventsApiResponse(
  meetupEvents: MeetupEventType[] | null | undefined
): MeetupEventsApiResponse {
  return {
    events: (meetupEvents || [])?.map(
      ({ id, eventUrl, title, dateTime, group, duration }) => ({
        id,
        title,
        dateTime,
        eventUrl,
        group,
        duration,
      })
    ),
  };
}
