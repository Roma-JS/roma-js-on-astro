import type { MeetupVenueType } from '@api/meetup/event.graqhql.types';

export function formatVenueMapsHref(venue: MeetupVenueType): string {
  return `http://www.google.com/maps/place/${venue.lat},${venue.lng}`;
}
