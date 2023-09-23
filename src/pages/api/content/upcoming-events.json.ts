import { fetchUpcomingRomajsEvents } from '@api/meetup/queries.server';
import type { MeetupEventType } from '@api/meetup/event.graqhql.types';

interface UpcomingEventsResponse {
  events: Pick<
    MeetupEventType,
    'id' | 'title' | 'dateTime' | 'eventUrl' | 'group'
  >[];
}

export async function GET() {
  const upcomingEvents = await fetchUpcomingRomajsEvents();
  const response: UpcomingEventsResponse = {
    events: (upcomingEvents || [])?.map(
      ({ id, eventUrl, title, dateTime, group }) => ({
        id,
        title,
        dateTime,
        eventUrl,
        group,
      })
    ),
  };

  return {
    body: JSON.stringify(response),
  };
}
