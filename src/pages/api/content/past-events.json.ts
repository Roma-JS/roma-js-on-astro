import { fetchAllPastRomajsEvents } from '@api/meetup/queries.server';
import { computeMeetupEventsApiResponse } from 'utils/api';

export async function GET() {
  const pastEvents = await fetchAllPastRomajsEvents();

  return {
    body: JSON.stringify(computeMeetupEventsApiResponse(pastEvents)),
  };
}
