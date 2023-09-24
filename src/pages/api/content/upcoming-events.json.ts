import { fetchUpcomingRomajsEvents } from '@api/meetup/queries.server';
import { computeMeetupEventsApiResponse } from 'utils/meetup-events';

export async function GET() {
  const upcomingEvents = await fetchUpcomingRomajsEvents();

  return new Response(
    JSON.stringify(computeMeetupEventsApiResponse(upcomingEvents))
  );
}
