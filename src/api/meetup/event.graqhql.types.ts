export type MeetupTicketType = {
  id: string;
  user: MeetupUserType;
};
export type MeetupEventTicketsEdgeType = {
  cursor: string;
  node: MeetupTicketType;
};

export type MeetupPageInfoType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};
export type MeetupEventTicketsConnectionType = {
  pageInfo: MeetupPageInfoType;
  count: number;
  edges: MeetupEventTicketsEdgeType[];
};
export type MeetupGroupType = {
  id: string;
  name: string;
  urlname: string;
};
export type MeetupImageType = {
  id: string;
  baseUrl: string;
  preview: string;
};
export type MeetupUserType = {
  id: string;
  name?: string;
};

export type MeetupVenueType = {
  id: string;
  name?: string;
  lat: number;
  lng: number;
};

export type MeetupEventType = {
  id: string;
  title?: string;
  eventUrl: string;
  description?: string;
  shortDescription?: string;
  venue?: MeetupVenueType;
  imageUrl: string;
  dateTime: string;
  duration: string;
  host: MeetupUserType;
  images: MeetupImageType[];
  group: MeetupGroupType;
};
