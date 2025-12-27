export type VenueGeoCoordInfo = {
  lat?: number | undefined | null;
  lon?: number | undefined | null;
};

export function formatVenueMapsHref(venue: VenueGeoCoordInfo): string {
  return `http://www.google.com/maps/place/${venue.lat},${venue.lon}`;
}
