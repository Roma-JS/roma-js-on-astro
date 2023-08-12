import { type CollectionEntry, getCollection } from 'astro:content';

interface UpcomingEventsResponse {
  events: Pick<CollectionEntry<'upcoming-events'>, 'data' | 'id'>[];
}

export async function get() {
  const upcomingEvents = await getCollection('upcoming-events');
  const response: UpcomingEventsResponse = {
    events: upcomingEvents.map((entry) => ({ id: entry.id, data: entry.data })),
  };

  return {
    body: JSON.stringify(response),
  };
}
