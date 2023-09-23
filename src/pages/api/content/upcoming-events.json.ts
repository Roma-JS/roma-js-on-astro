import { fetchUpcomingRomajsEvents } from '@api/meetup/queries.server';
import { computeMeetupEventsApiResponse } from 'utils/api';

export async function GET() {
  const upcomingEvents = await fetchUpcomingRomajsEvents();

  return new Response(
    JSON.stringify(computeMeetupEventsApiResponse(upcomingEvents))
  );
}
