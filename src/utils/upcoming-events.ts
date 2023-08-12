import type { CollectionEntry } from 'astro:content';

export function sortUpComingEvents(
  events: CollectionEntry<'upcoming-events'>[]
) {
  return events.slice().sort((a, b) => {
    if (b.data.startsAt === a.data.startsAt) {
      return 0;
    }

    return a.data.startsAt > b.data.startsAt ? 1 : -1;
  });
}
