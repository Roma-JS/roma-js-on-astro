import { fetchAllPastRomajsEvents } from '@api/meetup/queries.server';
import { computeMeetupEventsApiResponse } from 'utils/api';

export async function GET() {
  const pastEvents = await fetchAllPastRomajsEvents();

  return new Response(
    JSON.stringify(computeMeetupEventsApiResponse(pastEvents))
  );
}
