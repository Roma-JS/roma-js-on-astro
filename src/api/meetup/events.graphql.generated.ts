import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  Duration: { input: any; output: any };
  LocalDateTime: { input: any; output: any };
};

export type AddGroupToNetworkInput = {
  groupId: Scalars['ID']['input'];
  networkId: Scalars['ID']['input'];
};

export type AddGroupToNetworkPayload = {
  __typename?: 'AddGroupToNetworkPayload';
  errors?: Maybe<Array<PayloadError>>;
  group?: Maybe<Group>;
  network?: Maybe<ProNetwork>;
};

export type AnnounceEventInput = {
  eventId: Scalars['ID']['input'];
};

export type AnnounceEventPayload = {
  __typename?: 'AnnounceEventPayload';
  /** Null if event has been successfuly announced or array of errors if something gone wrong */
  errors?: Maybe<Array<PayloadError>>;
  /** The event which has been announced */
  event?: Maybe<Event>;
};

/**
 * type used in @purgePageCache directive
 * Supported Types of Meetup Entities that the Fastly Cache is aware of
 */
export enum CacheEntityType {
  Event = 'EVENT',
  Group = 'GROUP',
}

export type CityLocation = {
  /** Borough/Town/District name */
  borough?: InputMaybe<Scalars['String']['input']>;
  /** Neighborhood name */
  neighborhood?: InputMaybe<Scalars['String']['input']>;
};

export type CloseEventRsvpsInput = {
  /** Identifier of event which will be edited */
  eventId: Scalars['ID']['input'];
};

export type CloseEventRsvpsPayload = {
  __typename?: 'CloseEventRsvpsPayload';
  errors?: Maybe<Array<PayloadError>>;
  /** The updated event, if successful */
  event?: Maybe<Event>;
};

/**
 * Event communication tools settings.
 * @deprecated(reason: "feature removed")
 */
export type CommunicationSettingsInput = {
  /** Setting responsible for event chat. */
  chat?: InputMaybe<Scalars['Boolean']['input']>;
  /** Setting responsible for event comments. */
  comments?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ContentType {
  Gif = 'GIF',
  Jpeg = 'JPEG',
  Png = 'PNG',
}

export enum CovidPrecautionMaskPolicy {
  NotRequired = 'NOT_REQUIRED',
  Required = 'REQUIRED',
}

export enum CovidPrecautionVaccinePolicy {
  NotRequired = 'NOT_REQUIRED',
  Required = 'REQUIRED',
}

export enum CovidPrecautionVenueType {
  Indoors = 'INDOORS',
  None = 'NONE',
  Outdoors = 'OUTDOORS',
}

export type CovidPrecautionsInput = {
  /**
   * Free-form detailed information organizer provides
   *
   * To clear the details from an existing event, provide an empty string
   */
  details?: InputMaybe<Scalars['String']['input']>;
  /** Policy on wearing masks */
  masks?: InputMaybe<CovidPrecautionMaskPolicy>;
  /** Policy on vaccination */
  vaccinations?: InputMaybe<CovidPrecautionVaccinePolicy>;
  /** Venue type */
  venueType?: InputMaybe<CovidPrecautionVenueType>;
};

export type CreateEventInput = {
  /** Attrbute ids to associate with the event */
  attributes?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** List of hosted defined precautions for COVID 19 */
  covidPrecautions?: InputMaybe<CovidPrecautionsInput>;
  /** String setting the description of the event, in simple HTML format. May not be longer than 50000 characters. */
  description: Scalars['String']['input'];
  /** Representing event duration in ISO 8601 duration specified format */
  duration?: InputMaybe<Scalars['String']['input']>;
  /**
   * List of up to 5 valid member ids who will be hosts of the event.
   * This implicitly includes the authenticated member when `selfRsvp` is true or not provided.
   */
  eventHosts?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Positive integer representing a numeric identifier for a photo, which must be one associated with this group. When undefined or 0, no photo is set. */
  featuredPhotoId?: InputMaybe<Scalars['Int']['input']>;
  /** Representing attributes for paid events */
  feeOption?: InputMaybe<EventFeeOption>;
  /** Settings pretaining to fundraising for this event */
  fundraising?: InputMaybe<EventFundraisingInput>;
  groupUrlname: Scalars['String']['input'];
  /**
   * String setting the description for the location of the host(s) at the event venue.
   * For online events this field is used for the event's url.
   */
  howToFindUs?: InputMaybe<Scalars['String']['input']>;
  /** Flag that indicates if this event is being copied from another event */
  isCopy?: InputMaybe<Scalars['Boolean']['input']>;
  /** Representing adjusted venue latitude and longitude */
  location?: InputMaybe<PointLocation>;
  /** Pro Network Event settings */
  proNetworkEvents?: InputMaybe<ProNetworkEventsInput>;
  /** Indicates whether an event will be published to the group or as a draft visible only to the leadership team.  This defaults to "PUBLISHED". */
  publishStatus?: InputMaybe<PublishStatus>;
  /** String setting the RSVP survey question for the event. May not be longer than 250 characters. */
  question?: InputMaybe<Scalars['String']['input']>;
  /** Representing attributes to schedule recurring event */
  recurring?: InputMaybe<RecurringEvents>;
  /** Representing rsvp settings (open/close time etc.) */
  rsvpSettings?: InputMaybe<RsvpSettings>;
  /** Representing attributes survey questions which will be available for Pro admins */
  rsvpSurvey?: InputMaybe<RsvpSurvey>;
  /**
   * Boolean value indicating whether the authenticated member will be RSVP'd to the event upon creation.
   * This defaults to true.
   */
  selfRsvp?: InputMaybe<Scalars['Boolean']['input']>;
  /** Speaker details */
  speakerDetails?: InputMaybe<SpeakerDetailsInput>;
  /** Field representing event start time */
  startDateTime: Scalars['String']['input'];
  /** Template Id to store a mapping between the event and the template */
  templateId?: InputMaybe<Scalars['ID']['input']>;
  /** String setting the name of the event. Must be at least 1 character and may not be longer than 80 characters. */
  title: Scalars['String']['input'];
  /** Topic ids to associate with the event */
  topics?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Representing a numeric identifier for a venue. For online events use the string alias 'online'. */
  venueId?: InputMaybe<Scalars['String']['input']>;
  /**
   * List of venues in which given event will take place at.
   * Needed only for the events with the type HYBRID at the moment.
   * Only one ONLINE event type id should be passed here
   * AND only PHYSICAL event type - for the venueId field.
   */
  venueIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Separate options for multiple venues, used only for hybrid events.
   * Provided venue ids have to correspond to venueIds under event type.
   * Alias 'online' can be used instead of online venue id.
   * This field will be ignored for non-hybrid events.
   */
  venueOptions?: InputMaybe<Array<VenueOptionInput>>;
  /**
   * Field indicating whether the event venue and host location description
   * will be visible to non-members of the hosting group.
   */
  venueVisibility?: InputMaybe<EventVenueVisibility>;
  /** Zoom meeting id (64-bit integer number). */
  zoomMeetingId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateEventPayload = {
  __typename?: 'CreateEventPayload';
  /** Null if creation was successful or array of errors if something gone wrong */
  errors?: Maybe<Array<PayloadError>>;
  /** The created draft of the event */
  event?: Maybe<Event>;
};

export type CreateGroupDraftInput = {
  /** What members of the group will be called. Can be at most 32 characters */
  customMembersLabel?: InputMaybe<Scalars['String']['input']>;
  /** Summary of what the Meetup group is about in simple HTML format */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Group Location */
  location?: InputMaybe<GroupLocation>;
  /** Display name of the group. Can be at most 60 characters */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Sets the specified topics to the group overwriting any existing topics. Topics are identified by ids and can be obtained from find topics query */
  topics?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Name used for the group's web address on meetup.com. Must be between 6 and 60 characters */
  urlname?: InputMaybe<Scalars['String']['input']>;
};

export type CreateGroupDraftPayload = {
  __typename?: 'CreateGroupDraftPayload';
  errors?: Maybe<Array<PayloadError>>;
  group?: Maybe<Group>;
  /** A token identifying a group draft */
  token?: Maybe<Scalars['ID']['output']>;
};

export type CreateVenueInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  /** lower case two character country code */
  country: Scalars['String']['input'];
  groupId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  /** if country us us or ca, state is required otherwise it may be omitted */
  state?: InputMaybe<Scalars['String']['input']>;
  /** When not provided, defaults to public */
  visibility?: InputMaybe<EventVenueVisibility>;
};

export type CreateVenuePayload = {
  __typename?: 'CreateVenuePayload';
  /** In the event a duplicate venue in the system is detected, this list will provide a list of suggestions you might have been looking for */
  didYouMean?: Maybe<Array<Venue>>;
  errors?: Maybe<Array<PayloadError>>;
  venue?: Maybe<Venue>;
};

export enum Currency {
  Aud = 'AUD',
  Brl = 'BRL',
  Cad = 'CAD',
  Chf = 'CHF',
  Eur = 'EUR',
  Gbp = 'GBP',
  Inr = 'INR',
  Jpy = 'JPY',
  Krw = 'KRW',
  Pln = 'PLN',
  Rub = 'RUB',
  Thb = 'THB',
  Try = 'TRY',
  Usd = 'USD',
}

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}

export type DeleteEventInput = {
  /** Alphanumeric identifier for the event */
  eventId: Scalars['ID']['input'];
  /**
   * Optional boolean parameter that, when set to true, fully deletes the event.
   * If set to false, this operation cancels the event instead
   * of completely removing it from the group's calendar.
   * This defaults to true when not set explicitly.
   */
  removeFromCalendar?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Optional boolean parameter that, when set to true, will update all future
   * recurrences of this event if this event belongs to an event series.
   * Requesting this for an event that doesn't belong to an active series will result in an error.
   */
  updateSeries?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload';
  /** Null if event has been successfuly deleted or array of errors if something gone wrong */
  errors?: Maybe<Array<PayloadError>>;
  /** True if event has been successfuly deleted */
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteGroupDraftInput = {
  /** Group draft token */
  token: Scalars['String']['input'];
};

/** Dues interval enum. */
export enum DuesInterval {
  /** Yearly interval. */
  Annually = 'ANNUALLY',
  /** Monthly interval. */
  Monthly = 'MONTHLY',
}

export enum DuesPaymentType {
  Other = 'OTHER',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
}

export type DuesSettings = {
  __typename?: 'DuesSettings';
  /** Fee amount returned in cents */
  amount: Scalars['Float']['output'];
  currency?: Maybe<Currency>;
  feeDescription?: Maybe<Scalars['String']['output']>;
  interval?: Maybe<DuesInterval>;
  paymentType: DuesPaymentType;
  reasons: GroupDuesReasons;
  trialPeriodDays?: Maybe<Scalars['Int']['output']>;
};

export type EarlyBirdDiscount = {
  __typename?: 'EarlyBirdDiscount';
  /** Amount in dollars */
  amount: Scalars['Float']['output'];
  daysBefore: Scalars['Int']['output'];
  /** Remaining number of redemptions left for early bird discount, null if no max quantity defined */
  discountTicketsRemaining?: Maybe<Scalars['Int']['output']>;
  /** Unique identifier of the early bird discount. */
  id: Scalars['ID']['output'];
  /** Maximum amount of discounts available for given promotion, null if no max quantity defined */
  maximumQuantity?: Maybe<Scalars['Int']['output']>;
  /** The datetime of when this promotion ends */
  promotionEnds?: Maybe<Scalars['DateTime']['output']>;
};

export type EarlyBirdDiscountInput = {
  /** Amount in dollars */
  amount: Scalars['Float']['input'];
  daysBefore: Scalars['Int']['input'];
  maximumQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type EditEventInput = {
  /** Whether changes should be applied to series of events */
  applyToSeries?: InputMaybe<Scalars['Boolean']['input']>;
  /** Attrbute ids to associate with the event */
  attributes?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** List of hosted defined precautions for COVID 19 */
  covidPrecautions?: InputMaybe<CovidPrecautionsInput>;
  /** If true, any connection to a saved zoom meeting is canceled from the event. */
  deleteZoomMeeting?: InputMaybe<Scalars['Boolean']['input']>;
  /** String setting the description of the event, in simple HTML format. May not be longer than 50000 characters. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Representing event duration in milliseconds. This defaults to 10800000 (3 hours). */
  duration?: InputMaybe<Scalars['String']['input']>;
  /** List of up to 5 valid member ids who will be hosts of the event. */
  eventHosts?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Identifier of event which will be edited */
  eventId: Scalars['ID']['input'];
  /** Positive integer representing a numeric identifier for a photo, which must be one associated with this group. When undefined or 0, no photo is set. */
  featuredPhotoId?: InputMaybe<Scalars['Int']['input']>;
  /** Representing attributes for paid events */
  feeOption?: InputMaybe<EventFeeOptionEdit>;
  /** Settings pretaining to fundraising for this event */
  fundraising?: InputMaybe<EventFundraisingInput>;
  /**
   * String setting the description for the location of the host(s) at the event venue.
   * For online events this field is used for the event's url.
   *
   * To unset this field, provide a empty string
   */
  howToFindUs?: InputMaybe<Scalars['String']['input']>;
  /** Representing adjusted venue latitude and longitude */
  location?: InputMaybe<PointLocation>;
  /** Pro Network Event settings */
  proNetworkEvents?: InputMaybe<ProNetworkEventsInput>;
  /** Indicates whether an event will be published to the group or as a draft visible only to the leadership team.  This defaults to "PUBLISHED". */
  publishStatus?: InputMaybe<PublishStatus>;
  /**
   * String setting the RSVP survey question for the event. May not be longer than 250 characters.
   *
   * To unset this field, provide an empty string
   */
  question?: InputMaybe<Scalars['String']['input']>;
  /** Representing attributes to schedule recurring event */
  recurring?: InputMaybe<RecurringEventsEdit>;
  /** Representing rsvp settings (open/close time etc.) */
  rsvpSettings?: InputMaybe<RsvpSettings>;
  /** Representing attributes survey questions which will be available for Pro admins */
  rsvpSurvey?: InputMaybe<RsvpSurveyEdit>;
  /** Speaker details */
  speakerDetails?: InputMaybe<SpeakerDetailsInput>;
  /** Field representing event start time */
  startDateTime?: InputMaybe<Scalars['String']['input']>;
  /** String setting the name of the event. Must be at least 1 character and may not be longer than 80 characters. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Topic ids to associate with the event */
  topics?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**
   * Representing a numeric identifier for a venue. For online events use the string alias 'online'.
   *
   * To unset this field, provide a value of "0"
   */
  venueId?: InputMaybe<Scalars['String']['input']>;
  /**
   * List of venues in which given event will take place at.
   * Needed only for the events with the type HYBRID at the moment.
   * Only one ONLINE event type id should be passed here
   * AND only PHYSICAL event type - for the venueId field.
   */
  venueIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Separate options for multiple venues, used only for hybrid events.
   * Provided venue ids have to correspond to venueIds under event type.
   * Alias 'online' can be used instead of online venue id.
   * This field will be ignored for non-hybrid events.
   */
  venueOptions?: InputMaybe<Array<VenueOptionInput>>;
  /**
   * Field indicating whether the event venue and host location description
   * will be visible to non-members of the hosting group.
   */
  venueVisibility?: InputMaybe<EventVenueVisibility>;
  /** Zoom meeting id (64-bit integer number). */
  zoomMeetingId?: InputMaybe<Scalars['ID']['input']>;
};

export type EditEventPayload = {
  __typename?: 'EditEventPayload';
  errors?: Maybe<Array<PayloadError>>;
  event?: Maybe<Event>;
};

export type Event = {
  __typename?: 'Event';
  /** Event creating datetime */
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  /** The scheduled time of the event */
  dateTime?: Maybe<Scalars['DateTime']['output']>;
  /** Description of the event. Visibility may be limited for private groups */
  description: Scalars['String']['output'];
  /** Duration of the event */
  duration?: Maybe<Scalars['Duration']['output']>;
  /** Time when event ends */
  endTime?: Maybe<Scalars['DateTime']['output']>;
  /** List of event hosts */
  eventHosts?: Maybe<Array<Maybe<EventHost>>>;
  /** Type of the event */
  eventType: EventType;
  /** Name used for the event's web address on meetup.com. Must be between 6 and 60 characters */
  eventUrl: Scalars['String']['output'];
  featuredEventPhoto?: Maybe<PhotoInfo>;
  /** Optional organizer-defined fee payment settings */
  feeSettings?: Maybe<EventFeeSettings>;
  /** the group this event belongs to */
  group?: Maybe<Group>;
  guestLimit?: Maybe<Scalars['Int']['output']>;
  guestsAllowed: Scalars['Boolean']['output'];
  /** Returns a connection for the RSVP's for the hosts of the event. */
  hostRsvps: HostRsvpConnection;
  /**
   * String describing the location event venue. Visibility may be limited for private groups
   * For online events this field is used for the event's url.
   */
  howToFindUs?: Maybe<Scalars['String']['output']>;
  /**
   * A unique but unstable identifier for the event.
   * Recurring events that have see activity may change the value of this identifier.
   */
  id: Scalars['ID']['output'];
  /** True the current member attending this event */
  isAttending: Scalars['Boolean']['output'];
  /** True if the current member has saved this event */
  isSaved: Scalars['Boolean']['output'];
  /** Maximum amount of RSVP spots for the event */
  maxTickets?: Maybe<Scalars['Int']['output']>;
  /** Network event details */
  networkEvent?: Maybe<NetworkEvent>;
  numberOfAllowedGuests: Scalars['Int']['output'];
  photoAlbum?: Maybe<EventPhotoAlbum>;
  /** Get the current member's RSVP for the event if any */
  rsvp?: Maybe<Rsvp>;
  /** Get a list of RSVP questions for the event. Visibility may be limited */
  rsvpQuestions: Array<RsvpQuestion>;
  /** Search for members RSVP's in this event. Visibility may be limited for private groups */
  rsvpSearch: RsvpSearchConnection;
  rsvpSettings: RsvpOpenSettings;
  /**
   * Get the current member's RSVP state for the event
   * Uses own memberId if nothing was provided.
   */
  rsvpState: RsvpState;
  /** Connections of filterable rsvps. Full list of information may be limited for private groups */
  rsvps: RsvpConnection;
  /** If this event is part of a series, this field describes that series */
  series?: Maybe<Series>;
  /** Speaker details */
  speakerDetails?: Maybe<SpeakerDetails>;
  /** Current status of the event */
  status: EventStatus;
  /** The event title for  display */
  title: Scalars['String']['output'];
  /** A unique and stable identifier for the event. */
  token: Scalars['ID']['output'];
  /** A connection of topics for the event */
  topics: TopicsConnection;
  /**
   * Returns all venues for an event.
   * Will return a list of 1 venue for online or in person
   * Hybrid events will have 2 entries
   */
  venues?: Maybe<Array<Venue>>;
  /** Waitlist handling when RSVP limit is reached */
  waitlistMode: WaitlistMode;
  /** A Zoom meeting ID if the event is online and uses Zoom integration. */
  zoomMeetingId?: Maybe<Scalars['ID']['output']>;
};

export type EventHostRsvpsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type EventRsvpSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter: RsvpSearchFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type EventRsvpsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<RsvpFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<RsvpSort>;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export enum EventFeeCurrency {
  Aud = 'AUD',
  Brl = 'BRL',
  Cad = 'CAD',
  Chf = 'CHF',
  Eur = 'EUR',
  Gbp = 'GBP',
  Inr = 'INR',
  Jpy = 'JPY',
  Krw = 'KRW',
  Pln = 'PLN',
  Rub = 'RUB',
  Thb = 'THB',
  Try = 'TRY',
  Usd = 'USD',
}

export type EventFeeOption = {
  /**
   * Representing the amount of the event fee if a fee is charged for the event.
   * If the group is in the United States, this may not exceed 4999 (for any currency).
   * Otherwise, this may not exceed 1000000 (for any currency).
   * If the event fee is charged with WePay, this must be at least 1.0 USD
   * If not passed - default value '0' will be used.
   */
  amount?: Scalars['Int']['input'];
  /**
   * String representing the currency for the event fee if a fee is charged for the event.
   * May be one of: AUD,BRL,CAD,CHF,EUR,GBP,INR,JPY,KRW,PLN,RUB,THB,TRY,USD
   * If not passed - default value 'USD' will be used.
   */
  currency?: EventFeeCurrency;
  /** Early bird discount for the event. */
  earlyBirdDiscount?: InputMaybe<EarlyBirdDiscountInput>;
  /**
   * Used only in the 'edit' flow, ignored in 'create'.
   * Pass 'false' to make venue free (fee amount = 0).
   * Other fields will be substituted by default values in this case.
   */
  enabled?: Scalars['Boolean']['input'];
  /**
   * String representing the payment method for the event fee if a fee is charged for the event
   * If not passed - default value 'CASH' will be used.
   */
  paymentMethod?: PaymentMethod;
  paypalEmail?: InputMaybe<Scalars['String']['input']>;
  /** A list of promo codes for the event. */
  promoCodes?: InputMaybe<Array<EventPromoCodeInput>>;
  /** String setting the refund policy if the event has a fee. May not be longer than 250 characters. */
  refundPolicy?: InputMaybe<Scalars['String']['input']>;
};

export type EventFeeOptionEdit = {
  enabled: Scalars['Boolean']['input'];
  fee?: InputMaybe<EventFeeOption>;
};

export type EventFeeSettings = {
  __typename?: 'EventFeeSettings';
  /** Acceptable methods of payment */
  accepts: PaymentMethod;
  /** Amount of the fee */
  amount: Scalars['Float']['output'];
  /** Currency accepted for fee */
  currency: EventFeeCurrency;
  /** Optional discounted price for early RSVPers. */
  earlyBirdDiscount?: Maybe<EarlyBirdDiscount>;
  /** Return true if paid event and has active promo codes, false otherwise */
  hasPromoCodes: Scalars['Boolean']['output'];
  /**
   * Organizer-defined terms for refunds. If this is defined, you must provide the authenticated member a way to access this information before they can RSVP.
   * They will need to agree to these terms before they RSVP
   * See the following help article for more information on Meetup refund payment policies https://help.meetup.com/hc/en-us/articles/360004065471-Payment-Policies
   */
  refundPolicy?: Maybe<RefundPolicy>;
  /** Indicates if a fee is required to RSVP */
  required: Scalars['Boolean']['output'];
};

export type EventFundraisingInput = {
  enabled: Scalars['Boolean']['input'];
};

export type EventHost = {
  __typename?: 'EventHost';
  member?: Maybe<Member>;
  /** @deprecated Use member instead */
  memberId?: Maybe<Scalars['ID']['output']>;
  /** Group member photo */
  memberPhoto?: Maybe<PhotoInfo>;
  name?: Maybe<Scalars['String']['output']>;
};

export type EventPhotoAlbum = {
  __typename?: 'EventPhotoAlbum';
  id: Scalars['ID']['output'];
  photoCount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

/** A promo code that a member can redeem to get a lower ticket price. */
export type EventPromoCodeInput = {
  /** Event ticket price in currency units (e.g. USD) for this promotion. */
  amount: Scalars['Float']['input'];
  /**
   * Date range during which this promotion is active.
   * If omitted, the promotion comes into effect immediately and lasts until the event ends.
   * Date range cannot be set on promotions for recurring events.
   */
  dateRange?: InputMaybe<PromoCodeDateRangeInput>;
  /** Promo code that a member needs to submit to activate this promotion. */
  promoCode: Scalars['String']['input'];
  /**
   * Maximum number of tickets that can be purchased with this promotion.
   * If omitted, no limit is applied.
   */
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type EventSearchConnection = {
  __typename?: 'EventSearchConnection';
  edges: Array<EventSearchEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EventSearchEdge = {
  __typename?: 'EventSearchEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type EventSearchFilter = {
  /** ID of the event category */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  /** City Boroughs or Neighborhoods Locations */
  cityLocations?: InputMaybe<Array<CityLocation>>;
  country?: InputMaybe<Scalars['String']['input']>;
  /** If true, consolidate events in series and return the latest event of the series/recurring events */
  doConsolidateEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** If true, get a paypal event and put it into third search result */
  doPromotePaypalEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** The latest date of event */
  endDateRange?: InputMaybe<Scalars['DateTime']['input']>;
  /** The end time of day to filter events to. */
  endTime?: InputMaybe<Scalars['String']['input']>;
  /** Type of event: online or not */
  eventType?: InputMaybe<EventType>;
  /** Whether the event is in progress */
  isHappeningNow?: InputMaybe<Scalars['Boolean']['input']>;
  isStartingSoon?: InputMaybe<Scalars['Boolean']['input']>;
  /** List of reasons to filter events more further */
  joinReasons?: InputMaybe<Array<ReasonForJoining>>;
  /** Latitude of the location of an event */
  lat: Scalars['Float']['input'];
  /** Longitude if the location of an event */
  lon: Scalars['Float']['input'];
  /** Prioritize groups with recent RSVP */
  prioritizeRsvps?: InputMaybe<Scalars['Boolean']['input']>;
  /** A pattern string for searching by occurrence in an event title */
  query: Scalars['String']['input'];
  /** The search radius relative to location (in miles) */
  radius?: InputMaybe<Scalars['Float']['input']>;
  /** The earliest date of event */
  startDateRange?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   * The start time of day to filter events from.
   * For every event between the startDateRange and endDateRange, the startTime is used to filter further
   * by time. Ex: Get all events in January. And from that, get events that start at 9 am.
   */
  startTime?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayOffset?: InputMaybe<Scalars['Int']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayScale?: InputMaybe<Scalars['Int']['input']>;
  /** The id of topicCategory [from topic taxonomy]. Used if categoryId is empty. */
  topicCategoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Use time of day embedding */
  useTimeOfDayEmbedding?: InputMaybe<Scalars['Boolean']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export enum EventStatus {
  Active = 'ACTIVE',
  Autosched = 'AUTOSCHED',
  AutoschedCancelled = 'AUTOSCHED_CANCELLED',
  AutoschedDraft = 'AUTOSCHED_DRAFT',
  AutoschedFinished = 'AUTOSCHED_FINISHED',
  Blocked = 'BLOCKED',
  Cancelled = 'CANCELLED',
  CancelledPerm = 'CANCELLED_PERM',
  Draft = 'DRAFT',
  Past = 'PAST',
  Pending = 'PENDING',
  Proposed = 'PROPOSED',
  Template = 'TEMPLATE',
}

/** Type of event */
export enum EventType {
  /** The event takes place both online and in-person */
  Hybrid = 'HYBRID',
  /** The event takes place online */
  Online = 'ONLINE',
  /** The event takes place in-person */
  Physical = 'PHYSICAL',
}

export enum EventVenueVisibility {
  Group = 'GROUP',
  Public = 'PUBLIC',
}

export type FeaturedEventPhotoConnection = {
  __typename?: 'FeaturedEventPhotoConnection';
  edges: Array<FeaturedEventPhotoConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FeaturedEventPhotoConnectionEdge = {
  __typename?: 'FeaturedEventPhotoConnectionEdge';
  cursor: Scalars['String']['output'];
  node: PhotoInfo;
};

export type GeoLocation = {
  /** The ISO_3166-1 country code for the country which contains the city */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The ZIP code of the city */
  zip?: InputMaybe<Scalars['String']['input']>;
};

/** A Meetup Group */
export type Group = {
  __typename?: 'Group';
  /** A list of group active topics. */
  activeTopics: Array<Topic>;
  /** Indicates if members are allowed to upload photos. */
  allowMemberPhotoUploads: Scalars['Boolean']['output'];
  /** Shows current user's permission to upload photos to this group. */
  canAddPhotos: Scalars['Boolean']['output'];
  /** A city where a group is located. */
  city?: Maybe<Scalars['String']['output']>;
  /** A country where a group is located. */
  country?: Maybe<Scalars['String']['output']>;
  /** What this group calls its members */
  customMemberLabel?: Maybe<Scalars['String']['output']>;
  /** Description of a group. */
  description?: Maybe<Scalars['String']['output']>;
  /** Active group membership dues settings. Available only when dues are enabled in the group. */
  duesSettings?: Maybe<DuesSettings>;
  /** an email address, representing an Organizer(s) of this Meetup Group. Meant to use for Organizer Announcements */
  emailAnnounceAddress?: Maybe<Scalars['String']['output']>;
  /**
   * Search for events in this group
   * @deprecated use 'events' instead
   */
  eventSearch: GroupEventSearchConnection;
  /** Events of the group */
  events: GroupEventConnection;
  /** Returns a list of recently used event photos */
  featuredEventPhotos: FeaturedEventPhotoConnection;
  /** Date and time of when a group was created. */
  foundedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Groups analytics, only available for groups which are part of a pro network */
  groupAnalytics?: Maybe<GroupAnalytics>;
  /** Group unique identifier. */
  id: Scalars['ID']['output'];
  /** Checks whether the specified member is in this group. */
  isMember: Scalars['Boolean']['output'];
  /** Checks whether the current member is the primary organizer of this group */
  isPrimaryOrganizer: Scalars['Boolean']['output'];
  /** If the group is private */
  isPrivate: Scalars['Boolean']['output'];
  /** Join mode for new group members. */
  joinMode: GroupJoinMode;
  /** A group featured (cover) photo. */
  keyGroupPhoto?: Maybe<PhotoInfo>;
  /** A latitude of a group location. */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Link for the group on meetup.com */
  link?: Maybe<Scalars['String']['output']>;
  /** A longitude of a group location. */
  lon?: Maybe<Scalars['Float']['output']>;
  /** The authenticated member's membership within this group if any */
  membershipMetadata?: Maybe<Membership>;
  /** Members in this group */
  memberships: GroupMemberConnection;
  /** Name of a group. */
  name: Scalars['String']['output'];
  /** A flag indicating whether new members are required to upload a photo to their group profile in order to join this group. */
  needsPhoto?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating whether new members are required to answer organizer's questions in order to join this group. */
  needsQuestions?: Maybe<Scalars['Boolean']['output']>;
  /** The primary organizer of the group. Null if the group is leaderless. */
  organizer?: Maybe<Member>;
  /** A date when group joined pro network */
  proJoinDate?: Maybe<Scalars['DateTime']['output']>;
  /** If a group is a part of a Pro network, the network properties. */
  proNetwork?: Maybe<ProNetwork>;
  /** If a group requires new members to answer questions, a list of questions. */
  questions: Array<GroupQuestion>;
  /** A list of links to this group in social networks. */
  socialNetworks: Array<SocialNetwork>;
  /** List of the sponsors for the group */
  sponsors: ProGroupSponsorsConnection;
  /** A state, county or province where a group is located. */
  state?: Maybe<Scalars['String']['output']>;
  /** Statistics about group members. */
  stats?: Maybe<GroupStats>;
  /** Group status. */
  status: GroupStatus;
  /** Timezone identifier as used by the IANA timezone database, for example: "US/Eastern", "Asia/Calcutta" */
  timezone?: Maybe<Scalars['String']['output']>;
  /** A group topic category. */
  topicCategory?: Maybe<TopicCategory>;
  /** Group unique URL path. */
  urlname: Scalars['String']['output'];
  /** Recently used in-person venues */
  venues: GroupVenueConnection;
  /** Group featured video. */
  video?: Maybe<GroupVideo>;
  /** A group welcome message. */
  welcomeBlurb?: Maybe<Scalars['String']['output']>;
  /** A zip code of a group location. */
  zip?: Maybe<Scalars['String']['output']>;
};

/** A Meetup Group */
export type GroupEventSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter: GroupEventSearchFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A Meetup Group */
export type GroupEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<GroupEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortOrder>;
  status?: InputMaybe<EventStatus>;
};

/** A Meetup Group */
export type GroupFeaturedEventPhotosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A Meetup Group */
export type GroupMembershipsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<GroupMembershipSort>;
};

/** A Meetup Group */
export type GroupProNetworkArgs = {
  filter?: InputMaybe<ProNetworkFilter>;
};

/** A Meetup Group */
export type GroupSponsorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SponsorsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A Meetup Group */
export type GroupVenuesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** GroupAnalytics data, available for pro only */
export type GroupAnalytics = {
  __typename?: 'GroupAnalytics';
  /** Average age of the group members */
  averageAge: Scalars['Float']['output'];
  /** Average number of RSVPs per event */
  averageRsvpsPerEvent: Scalars['Float']['output'];
  /** Proportion of members in the group by gender */
  genderMembershipRatios: GroupGenderMembershipRatios;
  /**
   * Date of the last meetup event,
   * not present if the group never had a meetup event
   */
  lastEventDate?: Maybe<Scalars['DateTime']['output']>;
  /**
   * Date of the next meetup event,
   * not present if the group doesn't have next meetup event
   */
  nextEventDate?: Maybe<Scalars['DateTime']['output']>;
  /** Pro Network Tie Status */
  tieStatus: ProNetworkTieStatus;
  /** Number of the group members */
  totalMembers: Scalars['Int']['output'];
  /** Number of the past meetup events */
  totalPastEvents: Scalars['Int']['output'];
  /** Number of total RSVPs in the past */
  totalPastRsvps: Scalars['Int']['output'];
  /** Number of members who RSVPed to a past event and RSVPs to a new event */
  totalRepeatRsvpers: Scalars['Int']['output'];
  /** Number of the upcoming meetup events */
  totalUpcomingEvents: Scalars['Int']['output'];
};

/** Reasons why dues are charged. */
export type GroupDuesReasons = {
  __typename?: 'GroupDuesReasons';
  /** Are dues to support group organizers? */
  compensation?: Maybe<Scalars['Boolean']['output']>;
  /** Are dues to cover group expenses? */
  coverCosts?: Maybe<Scalars['Boolean']['output']>;
  /** Are dues for keeping group members engaged? */
  engagement?: Maybe<Scalars['Boolean']['output']>;
  /** Are dues to pay for equipment? */
  equipment?: Maybe<Scalars['Boolean']['output']>;
  /** Are dues to make meetups better? */
  improveMeetups?: Maybe<Scalars['Boolean']['output']>;
  /** Are dues collected for other reason? */
  otherWhy?: Maybe<Scalars['Boolean']['output']>;
  /** Are dues reserved for unexpected expenses in the future? */
  reserveFund?: Maybe<Scalars['Boolean']['output']>;
  /** The other reason text. */
  whyCustom?: Maybe<Scalars['String']['output']>;
};

export type GroupEventConnection = {
  __typename?: 'GroupEventConnection';
  edges: Array<EventEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/**  Used by Group */
export type GroupEventFilter = {
  /** Show only events starting after the specified date. */
  afterDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  /** Show only events starting before the specified date. */
  beforeDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  /** Show only events hosted by the specified member. */
  hostId?: InputMaybe<Scalars['ID']['input']>;
  /** Show only events in the specified statuses. */
  status?: InputMaybe<Array<InputMaybe<EventStatus>>>;
  /** Show only events with title matching the specified string (case-insensitive). */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GroupEventPhotoCreateInput = {
  /** Photo Album id */
  albumId?: InputMaybe<Scalars['ID']['input']>;
  /** Content type */
  contentType: ContentType;
  /** Photo description */
  description?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  /** Meetup Group id */
  groupId: Scalars['ID']['input'];
  isVertical?: InputMaybe<Scalars['Boolean']['input']>;
  /** The name of the album */
  newAlbumName?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  /** Photo type */
  photoType: PhotoType;
  /** Set as main group photo */
  setAsMain: Scalars['Boolean']['input'];
};

export type GroupEventSearchConnection = {
  __typename?: 'GroupEventSearchConnection';
  edges: Array<GroupEventSearchEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GroupEventSearchEdge = {
  __typename?: 'GroupEventSearchEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

/** Status of event for Group Event search */
export enum GroupEventSearchEventStatus {
  Draft = 'DRAFT',
  Past = 'PAST',
  Upcoming = 'UPCOMING',
}

export type GroupEventSearchFilter = {
  /** A textual query containing event content to find */
  query: Scalars['String']['input'];
  /** status of the event. defaults to UPCOMING */
  status?: InputMaybe<GroupEventSearchEventStatus>;
};

export type GroupGenderMembershipRatios = {
  __typename?: 'GroupGenderMembershipRatios';
  /** Proportion of members who identify as female */
  femaleRatio: Scalars['Float']['output'];
  /** Proportion of members who identify as male */
  maleRatio: Scalars['Float']['output'];
  /** Proportion of members who identify as gender other than male or female */
  otherRatio: Scalars['Float']['output'];
  /** Proportion of members whose gender is unknown */
  unknownRatio: Scalars['Float']['output'];
};

export enum GroupJoinMode {
  Approval = 'APPROVAL',
  Closed = 'CLOSED',
  Open = 'OPEN',
}

/** Group Location (if any is provided, the other one is required) */
export type GroupLocation = {
  geoLocation?: InputMaybe<GeoLocation>;
  pointLocation?: InputMaybe<PointLocation>;
};

export type GroupMemberConnection = {
  __typename?: 'GroupMemberConnection';
  edges: Array<GroupMemberEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type GroupMemberCounts = {
  __typename?: 'GroupMemberCounts';
  /** total number of members */
  all: Scalars['Int']['output'];
  /** total banned members */
  banned: Scalars['Int']['output'];
  /** total number of members on leadership team */
  leadership: Scalars['Int']['output'];
  /** total pending members */
  pending: Scalars['Int']['output'];
  /** total number of members pending payment */
  pendingPayment: Scalars['Int']['output'];
};

export type GroupMemberEdge = {
  __typename?: 'GroupMemberEdge';
  cursor: Scalars['String']['output'];
  metadata?: Maybe<Membership>;
  node?: Maybe<Member>;
};

/**
 * #########################
 *  search and filters
 * #########################
 */
export enum GroupMembersNamedQuery {
  /**
   * query for a set of "most active" Members of a Group
   * originally, in order to use in Step Up email to target this group of users
   * the definition of "most active" is volatile and business-defined heuristic
   * maintained by #notifications
   */
  TopActiveMembersInGroup = 'TOP_ACTIVE_MEMBERS_IN_GROUP',
}

export type GroupMembershipSort = {
  sortField?: InputMaybe<GroupMembershipSortField>;
  sortOrder?: InputMaybe<SortOrder>;
};

export enum GroupMembershipSortField {
  Dues = 'DUES',
  JoinDate = 'JOIN_DATE',
  LastVisited = 'LAST_VISITED',
  Name = 'NAME',
  Role = 'ROLE',
}

export type GroupMutation = {
  /** List of topics associated to group */
  activeTopics?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Indicates if members are allowed to upload photos */
  allowMemberPhotoUploads?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  /** The country/city/state/zip of the group */
  country?: InputMaybe<Scalars['String']['input']>;
  /**
   * Positive integer representing a numeric identifier for a photo, which must be one associated with this group. When undefined or 0, no photo is set.
   * This is refered to as Group.keyPhoto in Group responses
   */
  coverPhotoId?: InputMaybe<Scalars['Int']['input']>;
  /** The way members are called */
  customMemberLabel?: InputMaybe<Scalars['String']['input']>;
  /** Currency expressed in iso code 'USD', 'EUR', etc. */
  feeCurrency?: InputMaybe<Currency>;
  /** The way a new member let into the group */
  joinMode?: InputMaybe<GroupJoinMode>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** Indicates the username of the mailing list address */
  listAddress?: InputMaybe<Scalars['String']['input']>;
  lon?: InputMaybe<Scalars['Float']['input']>;
  /** Read-able name of the Group that members see */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Indicates if new member profile have to provide a photo */
  needsPhoto?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if new member must answer questions to join */
  needsQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  /** public or private */
  privacy?: InputMaybe<GroupPrivacy>;
  /** List of 1 to 5 questions to be answered by new members when join the group */
  questions?: InputMaybe<Array<GroupQuestionInput>>;
  shortDesc?: InputMaybe<Scalars['String']['input']>;
  /** List of social networks for the group */
  socialNetworks?: InputMaybe<Array<SocialNetworkInput>>;
  state?: InputMaybe<Scalars['String']['input']>;
  /** The name added after meetup.com */
  urlname?: InputMaybe<Scalars['String']['input']>;
  /** Group featured video. */
  video?: InputMaybe<GroupVideoInput>;
  /** Welcome message to new members */
  welcomeBlurb?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export enum GroupPrivacy {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type GroupQuestion = {
  __typename?: 'GroupQuestion';
  id: Scalars['ID']['output'];
  question: Scalars['String']['output'];
  sort: Scalars['Int']['output'];
};

/** Questions to be answered by new members when join the group */
export type GroupQuestionInput = {
  id: Scalars['ID']['input'];
  /** Question */
  question: Scalars['String']['input'];
  /** The position that ocupate in the list presented to the new member */
  sort: Scalars['Int']['input'];
};

export type GroupSearchConnection = {
  __typename?: 'GroupSearchConnection';
  edges: Array<GroupSearchEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GroupSearchEdge = {
  __typename?: 'GroupSearchEdge';
  cursor: Scalars['String']['output'];
  node: Group;
};

export type GroupSearchFilter = {
  /** ID of the event category */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  /** Whether to look for groups with FROZEN status only */
  frozenOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Latitude of the location of a group */
  lat: Scalars['Float']['input'];
  /** Longitude if the location of a group */
  lon: Scalars['Float']['input'];
  /** Prioritize groups with recent RSVP */
  prioritizeRsvps?: InputMaybe<Scalars['Boolean']['input']>;
  /** A pattern string for searching by occurrence in a group name */
  query: Scalars['String']['input'];
  /** Get groups within a Radius from lat/lon. Default is 25. */
  radius?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayOffset?: InputMaybe<Scalars['Int']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayScale?: InputMaybe<Scalars['Int']['input']>;
  /** The id of topicCategory [from topic taxonomy]. Used if categoryId is empty. */
  topicCategoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Use time of day embedding */
  useTimeOfDayEmbedding?: InputMaybe<Scalars['Boolean']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type GroupStats = {
  __typename?: 'GroupStats';
  eventRatings: GroupStatsEventRatings;
  memberCounts: GroupMemberCounts;
};

/** Summary of group event ratings. */
export type GroupStatsEventRatings = {
  __typename?: 'GroupStatsEventRatings';
  /** An average rating across all events in the group. */
  average: Scalars['Float']['output'];
  /** A total number of star ratings left by members. */
  totalRatings: Scalars['Int']['output'];
  /** A total number of reviews (stars, comments, likes/dislikes) left by members. */
  totalReviews: Scalars['Int']['output'];
};

export enum GroupStatus {
  /** Draft group */
  Abandoned = 'ABANDONED',
  /** Manually changed via platform administration */
  Blocked = 'BLOCKED',
  /** Had a status of FROZEN for 15 days */
  Dead = 'DEAD',
  Failed = 'FAILED',
  /** Does not have an active organizer */
  Frozen = 'FROZEN',
  /**
   * Has a organizer with a lapsed subscription.
   * Will change to FROZEN after 15 days
   */
  Grace = 'GRACE',
  OrgClosed = 'ORG_CLOSED',
  /** Has an organizer with an active subscription */
  Paid = 'PAID',
}

/**
 * #########################
 *  relationships
 * #########################
 */
export type GroupVenueConnection = {
  __typename?: 'GroupVenueConnection';
  edges: Array<GroupVenueEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GroupVenueEdge = {
  __typename?: 'GroupVenueEdge';
  cursor: Scalars['String']['output'];
  node: Venue;
};

/** Group featured video. */
export type GroupVideo = {
  __typename?: 'GroupVideo';
  /** Video provider (hosting service). */
  provider: GroupVideoProvider;
  /** Video URL. */
  url: Scalars['String']['output'];
};

/**
 * Group featured video input.
 * Provide values for all fields in order to create or update a video.
 * Set all fields to null in order to delete a video.
 * Other combinations are invalid.
 */
export type GroupVideoInput = {
  /** Video provider (hosting service). */
  provider?: InputMaybe<GroupVideoProvider>;
  /** Video URL. */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Group video provider (hosting service). */
export enum GroupVideoProvider {
  Vimeo = 'VIMEO',
  Youtube = 'YOUTUBE',
}

export enum GroupVisibility {
  All = 'ALL',
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type HostRsvpConnection = {
  __typename?: 'HostRsvpConnection';
  edges: Array<RsvpEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Only DESC order is supported at the moment */
export type KeywordSort = {
  /** Field for sorting */
  sortField?: InputMaybe<KeywordSortField>;
  /** Order of sorting */
  sortOrder?: InputMaybe<SortOrder>;
};

/** How should be sorted results of the search */
export enum KeywordSortField {
  /** Results will be sorted by datetime */
  Datetime = 'DATETIME',
  /** Results will be sorted by relevance */
  Relevance = 'RELEVANCE',
}

/** A registered member on Meetup */
export type Member = {
  __typename?: 'Member';
  adminProNetworks: Array<ProNetwork>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  /** Can create OAuth clients (has Pro subscription, Pro network admin, or is Local/Co-Organizer of Pro group) */
  canCreateOAuthClient: Scalars['Boolean']['output'];
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<MemberGender>;
  /** Highest current role of a member across all groups */
  highestCurrentRole?: Maybe<Role>;
  /** Unique identifier for member */
  id: Scalars['ID']['output'];
  /** Returns true if user is an Organizer, Co-Organizer, Assistant Organizer, or Event Organizer in any group */
  isLeader: Scalars['Boolean']['output'];
  /** Returns true if member has an active member subscription */
  isMemberPlusSubscriber: Scalars['Boolean']['output'];
  isOrganizer: Scalars['Boolean']['output'];
  /** Is on the leadership team of a pro group */
  isProOrganizer: Scalars['Boolean']['output'];
  /** Is a primary organizer of a pro group */
  isProPrimaryOrganizer: Scalars['Boolean']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  /** Events this member RSVP'd do */
  memberEvents: MemberEventConnection;
  memberPhoto?: Maybe<PhotoInfo>;
  /** Represents a link to the member on meetup.com */
  memberUrl: Scalars['String']['output'];
  /**
   * sort attribute:
   * the sortField/sortOrder only support sorting based on the group's upcoming events
   */
  memberships: MemberGroupConnection;
  /** Display name for member */
  name?: Maybe<Scalars['String']['output']>;
  /** Resolves a connection for this Member's list of Notifications */
  notifications?: Maybe<MemberNotificationConnection>;
  /**
   * A number of groups where member is a primary organizer
   * will return 0 if visitor does not have privs to view this field
   */
  organizedGroupCount: Scalars['Int']['output'];
  /**
   * Phone number in E.164 format for SMS notifications.
   * Format: +[country code][number]
   * Examples: +14155552671 (US), +442071838750 (UK)
   */
  phoneNumberE164?: Maybe<Scalars['String']['output']>;
  preferredLocale: Scalars['String']['output'];
  /** A list of reasons member has joined Meetup */
  reasonsForJoining?: Maybe<Array<ReasonForJoining>>;
  /** A list of recommended topics to add */
  recommendedTopics: TopicsConnection;
  rsvps: MemberRsvpConnection;
  /** Events this member saved */
  savedEvents: MemberEventConnection;
  /**
   * selectedTimezone is manually selected by the user whereas
   * timezone below is automatically set.
   */
  selectedTimezone?: Maybe<Scalars['String']['output']>;
  /** Represents DateTime when member was created */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  status: MemberStatus;
  username?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

/** A registered member on Meetup */
export type MemberMemberEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  eventStatus?: InputMaybe<Array<InputMaybe<EventStatus>>>;
  eventType?: InputMaybe<Array<InputMaybe<EventType>>>;
  first: Scalars['Int']['input'];
  isHosting?: InputMaybe<Scalars['Boolean']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lon?: InputMaybe<Scalars['Float']['input']>;
  membershipsFilter?: InputMaybe<MembershipsFilter>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<MemberEventSort>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

/** A registered member on Meetup */
export type MemberMembershipsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<MembershipSort>;
};

/** A registered member on Meetup */
export type MemberNotificationsArgs = {
  filter?: InputMaybe<MemberNotificationsFilter>;
};

/** A registered member on Meetup */
export type MemberRecommendedTopicsArgs = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A registered member on Meetup */
export type MemberRsvpsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<RsvpFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<RsvpSort>;
};

/** A registered member on Meetup */
export type MemberSavedEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  sort?: InputMaybe<SortOrder>;
};

export type MemberAnalytics = {
  __typename?: 'MemberAnalytics';
  /** The number of attended events */
  eventsAttended?: Maybe<Scalars['Int']['output']>;
  /** Count of groups where user is actual member */
  groupsCount?: Maybe<Scalars['Int']['output']>;
  /** Whether a User is organizer */
  isOrganizer?: Maybe<Scalars['Boolean']['output']>;
  joinTime?: Maybe<Scalars['DateTime']['output']>;
  /** The time when the last activity occured */
  lastAccessTime?: Maybe<Scalars['DateTime']['output']>;
  /** Members groups inside pro network */
  memberships?: Maybe<Array<Membership>>;
  /** Highest member role across all groups within Pro network */
  role?: Maybe<Role>;
};

export type MemberEventConnection = {
  __typename?: 'MemberEventConnection';
  edges: Array<MemberEventEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/**
 * The directed relationship between Member -> Event
 * A Member can be associated with an Event
 * e.g. a Member attends an Event, a Member hosts an Event
 */
export type MemberEventEdge = {
  __typename?: 'MemberEventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
  rsvpState?: Maybe<RsvpState>;
};

/** Member events connection sorting. */
export type MemberEventSort = {
  /** Sort field. Defaults to LOCAL_TIME. */
  sortField?: InputMaybe<MemberEventSortField>;
  /** Sort order. Defaults to ASC. */
  sortOrder?: InputMaybe<SortOrder>;
};

/** Member events sort options. */
export enum MemberEventSortField {
  /** Sort member events by last creation time. */
  Ctime = 'CTIME',
  /** Sort member events by local time. */
  LocalTime = 'LOCAL_TIME',
  /** Sort member events by last modification time. */
  Mtime = 'MTIME',
  /** Sort member events by a role the member has in the corresponding group. */
  Role = 'ROLE',
}

export enum MemberGender {
  Female = 'FEMALE',
  Male = 'MALE',
  None = 'NONE',
  NotChecked = 'NOT_CHECKED',
  Other = 'OTHER',
}

/**
 * #########################
 *  relationships
 * #########################
 */
export type MemberGroupConnection = {
  __typename?: 'MemberGroupConnection';
  edges: Array<MemberGroupEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type MemberGroupEdge = {
  __typename?: 'MemberGroupEdge';
  cursor: Scalars['String']['output'];
  /** The membership information associated with this Member and Group */
  metadata?: Maybe<Membership>;
  /** The group a member has an association with */
  node?: Maybe<Group>;
};

export type MemberNotificationConnection = {
  __typename?: 'MemberNotificationConnection';
  edges: Array<MemberNotificationEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  unreadCount?: Maybe<Scalars['Int']['output']>;
};

export type MemberNotificationEdge = {
  __typename?: 'MemberNotificationEdge';
  cursor: Scalars['String']['output'];
  node: Notification;
};

export type MemberNotificationsFilter = {
  /** Limits to the notifications to only those for organizers */
  organizerOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MemberRsvpConnection = {
  __typename?: 'MemberRsvpConnection';
  edges: Array<RsvpEdge>;
  pageInfo: PageInfo;
  /** total of RSVPS according to a provided filter */
  totalCount: Scalars['Int']['output'];
};

export enum MemberStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Bounced = 'BOUNCED',
  Invisible = 'INVISIBLE',
  Pending = 'PENDING',
  Pendremoved = 'PENDREMOVED',
  Preregistered = 'PREREGISTERED',
  Removed = 'REMOVED',
  Unverified = 'UNVERIFIED',
}

/** Represents a specific Member in the context of a specific Group */
export type Membership = {
  __typename?: 'Membership';
  bio?: Maybe<Scalars['String']['output']>;
  dues?: Maybe<MembershipDues>;
  joinTime?: Maybe<Scalars['DateTime']['output']>;
  lastAccessTime?: Maybe<Scalars['DateTime']['output']>;
  /**
   * The role of the Member within this group. This determines the member's action and visibility
   * permissions. This may be null in cases where the member does not have an active status, i.e. PENDING_PAYMENT
   */
  role?: Maybe<Role>;
  /** Rsvp statistics associated with this member */
  rsvpStats: MembershipRsvpStats;
  status: MembershipStatus;
};

/**
 * The last known state of member's dues in a group.
 *
 * The state is preserved across a member leaving and re-joining a group,
 * so that a user may have a dues record in a group while not being a member of that group.
 */
export type MembershipDues = {
  __typename?: 'MembershipDues';
  /** The last known dues grace period end date. Empty if a member has never been in dues grace. */
  graceEndDate?: Maybe<Scalars['DateTime']['output']>;
  /** The last known membership dues payment method. */
  method?: Maybe<MembershipDuesMethod>;
  /** The last known dues payment period end date. Empty if a member has never paid dues. */
  paidEndDate?: Maybe<Scalars['DateTime']['output']>;
  /** The last known membership dues status. */
  status?: Maybe<MembershipDuesStatus>;
  /** The last known dues trial period end date. Empty if a member has never enrolled into a trial. */
  trialEndDate?: Maybe<Scalars['DateTime']['output']>;
};

/** A membership dues payment collection method. */
export enum MembershipDuesMethod {
  Cash = 'CASH',
  Other = 'OTHER',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  Wepay = 'WEPAY',
}

/** Membership dues status. */
export enum MembershipDuesStatus {
  /** A member is exempt from paying dues by a group organizer, or the member IS the organizer. */
  Exempt = 'EXEMPT',
  /** A member missed their scheduled dues payment. */
  Grace = 'GRACE',
  /** A member has paid dues. */
  Paid = 'PAID',
  /** A member is in dues trial. */
  Trial = 'TRIAL',
  /** A member has never paid dues. */
  Unpaid = 'UNPAID',
}

/** Membership filter on group */
export type MembershipFilter = {
  excludeMemberIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter only memberships that have been active before the given date */
  lastActiveBeforeDate?: InputMaybe<Scalars['String']['input']>;
  memberIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter memberships by user name */
  name?: InputMaybe<Scalars['String']['input']>;
  namedQuery?: InputMaybe<GroupMembersNamedQuery>;
  status?: InputMaybe<Array<InputMaybe<MembershipStatus>>>;
};

export type MembershipRsvpStats = {
  __typename?: 'MembershipRsvpStats';
  /** total overall count of no show attendances */
  noShowCount: Scalars['Int']['output'];
};

export type MembershipSort = {
  sortField?: InputMaybe<MembershipSortField>;
  sortOrder?: InputMaybe<SortOrder>;
};

export enum MembershipSortField {
  CreateTime = 'CREATE_TIME',
  EventDate = 'EVENT_DATE',
  LeadershipStatus = 'LEADERSHIP_STATUS',
  /** Sort by leadership status, then by group name */
  LeadershipStatusName = 'LEADERSHIP_STATUS_NAME',
  /** Sort by the number of hosted events the requesting member as RSVP'd to */
  SelfRsvpCount = 'SELF_RSVP_COUNT',
}

export enum MembershipStatus {
  Abandoned = 'ABANDONED',
  /** Active member that is not part of the Group's leadership team */
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Booted = 'BOOTED',
  Bounced = 'BOUNCED',
  Dead = 'DEAD',
  GroupBlocked = 'GROUP_BLOCKED',
  GroupBlockedOrg = 'GROUP_BLOCKED_ORG',
  Incomplete = 'INCOMPLETE',
  /** Leaders are Organizers, Co-Organizers, Assistant Organizers, OR Event Organizers */
  Leader = 'LEADER',
  /** Pending organizer join approval */
  Pending = 'PENDING',
  /** Pending membership dues payment */
  PendingPayment = 'PENDING_PAYMENT',
  Removed = 'REMOVED',
  Unapproved = 'UNAPPROVED',
}

export type MembershipsFilter = {
  /** Filters memberships based on group */
  groupIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Filters memberships based on group status */
  groupStatus?: InputMaybe<Array<GroupStatus>>;
  /** Filter memberships down to those where the member was a guest host for an event */
  guestEventHosted?: InputMaybe<Scalars['Boolean']['input']>;
  /** When status is provided includes LEADER, leaderSubset indicates a subset of the LEADER status to be returned */
  leaderSubset?: InputMaybe<MembershipsFilterLeaderSubset>;
  /** Groups with no upcoming events */
  noUpcomingEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** Only groups with dues */
  onlyDues?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filters memberships based on membership status */
  status?: InputMaybe<Array<InputMaybe<MembershipStatus>>>;
};

export enum MembershipsFilterLeaderSubset {
  /** only the primary leader */
  Primary = 'PRIMARY',
  /** only the secondary leaders (Co-Organizer, Assistant Organizers, Event Organizers) */
  Secondary = 'SECONDARY',
}

export type MonthlyRecurrence = {
  /** The day of the week this event will be hosted on */
  monthlyDayOfWeek: DayOfWeek;
  /** Integer value between 1-7 (Monday-Sunday) for the day of week the recurrence occurs upon */
  monthlyWeekOfMonth: Scalars['Int']['input'];
};

export type MonthlyRecurrenceInfo = {
  __typename?: 'MonthlyRecurrenceInfo';
  /** The day of the week event this will be hosted on */
  monthlyDayOfWeek: DayOfWeek;
  /** Integer value between 1-7 (Monday-Sunday) for the day of week the recurrence occurs upon */
  monthlyWeekOfMonth: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addGroupToNetwork: AddGroupToNetworkPayload;
  /** Request to announce the event */
  announceEvent: AnnounceEventPayload;
  /** Request to close a possibility to accept RSVPs */
  closeEventRsvps: CloseEventRsvpsPayload;
  /** Request to create an event */
  createEvent: CreateEventPayload;
  /** Request to create a new group draft */
  createGroupDraft: CreateGroupDraftPayload;
  /** Create a photo in a group album */
  createGroupEventPhoto: PhotoUploadWithUrlPayload;
  createVenue: CreateVenuePayload;
  /** Request to delete event */
  deleteEvent: DeleteEventPayload;
  deleteGroupDraft: Scalars['Boolean']['output'];
  /** Request to edit the event */
  editEvent: EditEventPayload;
  /** Request to open a possibility to accept RSVPs */
  openEventRsvps: OpenEventRsvpsPayload;
  /** Request to publish the event draft */
  publishEventDraft: PublishEventDraftPayload;
  /** Request to publish the existing group draft */
  publishGroupDraft: PublishGroupDraftPayload;
  /**
   * Changes any field of a group using its id to identify it.
   * Returns null if input.id does not match any group, otherwise returns the updated group fields
   */
  updateGroup?: Maybe<Group>;
  /** Request to update the existing group draft */
  updateGroupDraft: UpdateGroupDraftPayload;
  /** Allows a Group leader to group membership role for a given member */
  updateGroupMembershipRole: UpdateGroupMembershipRolePayload;
};

export type MutationAddGroupToNetworkArgs = {
  input: AddGroupToNetworkInput;
};

export type MutationAnnounceEventArgs = {
  input: AnnounceEventInput;
};

export type MutationCloseEventRsvpsArgs = {
  input: CloseEventRsvpsInput;
};

export type MutationCreateEventArgs = {
  input: CreateEventInput;
};

export type MutationCreateGroupDraftArgs = {
  input: CreateGroupDraftInput;
};

export type MutationCreateGroupEventPhotoArgs = {
  input: GroupEventPhotoCreateInput;
};

export type MutationCreateVenueArgs = {
  input: CreateVenueInput;
};

export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};

export type MutationDeleteGroupDraftArgs = {
  input: DeleteGroupDraftInput;
};

export type MutationEditEventArgs = {
  input: EditEventInput;
};

export type MutationOpenEventRsvpsArgs = {
  input: OpenEventRsvpsInput;
};

export type MutationPublishEventDraftArgs = {
  input: PublishEventDraftInput;
};

export type MutationPublishGroupDraftArgs = {
  input: PublishGroupDraftInput;
};

export type MutationUpdateGroupArgs = {
  chapterId: Scalars['ID']['input'];
  input: GroupMutation;
};

export type MutationUpdateGroupDraftArgs = {
  input: UpdateGroupDraftInput;
};

export type MutationUpdateGroupMembershipRoleArgs = {
  input: UpdateGroupMembershipRoleInput;
};

/** A link between between a collection of Events hosted within a Pro Network */
export type NetworkEvent = {
  __typename?: 'NetworkEvent';
  /** Time network event was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Start time of network event */
  eventTime?: Maybe<Scalars['DateTime']['output']>;
  /** Number of groups participating in the network event */
  groupCount: Scalars['Int']['output'];
  /** Id of Network Event */
  id: Scalars['ID']['output'];
  /** If network event has been announced */
  isAnnounced?: Maybe<Scalars['Boolean']['output']>;
  /** Number of the network event attendees */
  rsvpCount: Scalars['Int']['output'];
  /** Status of network event */
  status?: Maybe<Scalars['String']['output']>;
  /** Timezone of network event */
  timezone?: Maybe<Scalars['String']['output']>;
  /** Title of network event */
  title?: Maybe<Scalars['String']['output']>;
};

export type NetworkEventsFilter = {
  /** Country */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The latest time an event starts */
  eventDateMax?: InputMaybe<Scalars['DateTime']['input']>;
  /** The earliest time an event starts */
  eventDateMin?: InputMaybe<Scalars['DateTime']['input']>;
  /** the excluded groups ids */
  excludedGroupIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** the groups ids that may belong to the organization */
  groupIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** the urlnames of chapters that may belong to the organization */
  groupUrlnames?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Hosts of the event looking for */
  hosts?: InputMaybe<Array<Scalars['String']['input']>>;
  isOnlineEvent?: InputMaybe<Scalars['Boolean']['input']>;
  /** Latitude */
  latitude?: InputMaybe<Scalars['Float']['input']>;
  /** Longitude */
  longitude?: InputMaybe<Scalars['Float']['input']>;
  /** Raw query to search from group name, description, leadership member name, or city */
  query?: InputMaybe<Scalars['String']['input']>;
  /** Search radius in miles */
  radius?: InputMaybe<Scalars['Float']['input']>;
  /** The maximum number of rsvps */
  rsvpsPerEventMax?: InputMaybe<Scalars['Int']['input']>;
  /** The minimum number of rsvps */
  rsvpsPerEventMin?: InputMaybe<Scalars['Int']['input']>;
  /** Statuses of the event looking for */
  status?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Title of the event looking for */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Zip code */
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkGroupsFilter = {
  /** only active groups if true, only delisted if false */
  activeGroups?: InputMaybe<Scalars['Boolean']['input']>;
  /** including only those groups that had event in the last specified days */
  activeWithinDays?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum range of the number of age */
  averageAgeMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum range of the number of age */
  averageAgeMin?: InputMaybe<Scalars['Int']['input']>;
  /** the ids of the category of the group */
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Country */
  country?: InputMaybe<Scalars['String']['input']>;
  /** the excluded groups ids */
  excludedGroupIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Maximum range of the date that the group founded */
  foundedDateMax?: InputMaybe<Scalars['DateTime']['input']>;
  /** Minimum range of the date that the group founded */
  foundedDateMin?: InputMaybe<Scalars['DateTime']['input']>;
  /** the groups ids that may belong to the organization */
  groupIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** the urlnames of chapters that may belong to the organization */
  groupUrlnames?: InputMaybe<Array<Scalars['String']['input']>>;
  /** including only those groups that did not have event in the last specified days */
  inactiveWithinDays?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum range of the date that the last meetup happened */
  lastEventMax?: InputMaybe<Scalars['DateTime']['input']>;
  /** Minimum range of the date that the last meetup happened */
  lastEventMin?: InputMaybe<Scalars['DateTime']['input']>;
  /** Latitude */
  latitude?: InputMaybe<Scalars['Float']['input']>;
  /** The ids of leadership team members */
  leadershipMemberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Longitude */
  longitude?: InputMaybe<Scalars['Float']['input']>;
  /** Maximum range of the number of members */
  memberCountMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum range of the number of members */
  memberCountMin?: InputMaybe<Scalars['Int']['input']>;
  /** Name of the group looking for */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Maximum range of the date that the next meetup is scheduled */
  nextEventMax?: InputMaybe<Scalars['DateTime']['input']>;
  /** Minimum range of the date that the next meetup is scheduled */
  nextEventMin?: InputMaybe<Scalars['DateTime']['input']>;
  /** Maximum range of the number of the past events held */
  pastEventsMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum range of the number of the past events held */
  pastEventsMin?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum range of the dates the groups joined Pro organization */
  proJoinDateMax?: InputMaybe<Scalars['DateTime']['input']>;
  /** Minimum range of the dates the groups joined Pro organization */
  proJoinDateMin?: InputMaybe<Scalars['DateTime']['input']>;
  /** Raw query to search from group name, description, leadership member name, or city */
  query?: InputMaybe<Scalars['String']['input']>;
  /** Search radius in miles */
  radius?: InputMaybe<Scalars['Float']['input']>;
  /** Maximum range of the average number of repeat rsvpers */
  repeatRsvpersMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum range of the average number of repeat rsvpers */
  repeatRsvpersMin?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum range of the number of the upcoming events */
  upcomingEventsMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum range of the number of the upcoming events */
  upcomingEventsMin?: InputMaybe<Scalars['Int']['input']>;
  /** Zip code */
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkUsersFilter = {
  /** The range of date from the past until today, for the recent activity */
  activeWithinDays?: InputMaybe<Scalars['Int']['input']>;
  /** Searching only the members who can or cannot receive mass email */
  canReceiveEmails?: InputMaybe<Scalars['Boolean']['input']>;
  /** Country */
  country?: InputMaybe<Scalars['String']['input']>;
  /** Maximum number of attended events */
  eventsAttendedMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum number of attended events */
  eventsAttendedMin?: InputMaybe<Scalars['Int']['input']>;
  /** The members to exclude from result */
  excludedUsers?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The groups which the member belongs to */
  groups?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The latest time limit for member join */
  joinDateTimeMax?: InputMaybe<Scalars['DateTime']['input']>;
  /** The oldest time limit for member join */
  joinDateTimeMin?: InputMaybe<Scalars['DateTime']['input']>;
  /** Latitude */
  latitude?: InputMaybe<Scalars['Float']['input']>;
  /** Longitude */
  longitude?: InputMaybe<Scalars['Float']['input']>;
  /** raw query string to search from member name or city */
  query?: InputMaybe<Scalars['String']['input']>;
  /** Search radius in miles */
  radius?: InputMaybe<Scalars['Float']['input']>;
  /** List of member roles to search by */
  roles?: InputMaybe<Array<Role>>;
  /** Name of the member */
  userName?: InputMaybe<Scalars['String']['input']>;
  /** The member ids that may belong to the organization */
  users?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Zip code */
  zip?: InputMaybe<Scalars['String']['input']>;
};

/** An notable activity or event that happened on the platform */
export type Notification = {
  __typename?: 'Notification';
  category: NotificationCategory;
  clicked: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  important: Scalars['Boolean']['output'];
  kind: NotificationKind;
  link?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<PhotoInfo>;
  photoType?: Maybe<NotificationPhotoType>;
  read: Scalars['Boolean']['output'];
  text?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * derived from
 * Act.Category.values().sorted.foreach(println)
 */
export enum NotificationCategory {
  Comment = 'COMMENT',
  Default = 'DEFAULT',
  Event = 'EVENT',
  Group = 'GROUP',
  Money = 'MONEY',
  Photo = 'PHOTO',
}

/**
 * derived from
 * NotificationBusiness.KINDS.asScala.map(_.toUpperCase).toList.sorted.foreach(println)
 */
export enum NotificationKind {
  AttendanceReminder = 'ATTENDANCE_REMINDER',
  Comment = 'COMMENT',
  Custom = 'CUSTOM',
  DonationExpireNotice = 'DONATION_EXPIRE_NOTICE',
  DonationPotentialPayment = 'DONATION_POTENTIAL_PAYMENT',
  Dues = 'DUES',
  DuesConfirm = 'DUES_CONFIRM',
  DuesTrialNotice = 'DUES_TRIAL_NOTICE',
  EventAnnounce = 'EVENT_ANNOUNCE',
  EventAnnounceToOrgs = 'EVENT_ANNOUNCE_TO_ORGS',
  EventAnnounceUntrusted = 'EVENT_ANNOUNCE_UNTRUSTED',
  EventCancel = 'EVENT_CANCEL',
  EventChange = 'EVENT_CHANGE',
  /** @deprecated feature removed */
  EventChatMessage = 'EVENT_CHAT_MESSAGE',
  EventInterestOrgPush = 'EVENT_INTEREST_ORG_PUSH',
  EventReminder = 'EVENT_REMINDER',
  ExternalUrl = 'EXTERNAL_URL',
  FinalAttendanceReminder = 'FINAL_ATTENDANCE_REMINDER',
  GroupAnnounce = 'GROUP_ANNOUNCE',
  GroupAnnouncePush = 'GROUP_ANNOUNCE_PUSH',
  InvitationAcceptance = 'INVITATION_ACCEPTANCE',
  Join = 'JOIN',
  Like = 'LIKE',
  MugCommAnnounce = 'MUG_COMM_ANNOUNCE',
  MugCommComment = 'MUG_COMM_COMMENT',
  MugCommCommentLike = 'MUG_COMM_COMMENT_LIKE',
  MugCommConversationLike = 'MUG_COMM_CONVERSATION_LIKE',
  MugCommInvite = 'MUG_COMM_INVITE',
  NetworkEventAnnounce = 'NETWORK_EVENT_ANNOUNCE',
  NetworkEventAnnounceToOrgs = 'NETWORK_EVENT_ANNOUNCE_TO_ORGS',
  NetworkEventAnnounceUntrusted = 'NETWORK_EVENT_ANNOUNCE_UNTRUSTED',
  OrgApprove = 'ORG_APPROVE',
  /** deprecated */
  OutsideMupRec = 'OUTSIDE_MUP_REC',
  PendingMember = 'PENDING_MEMBER',
  Photo = 'PHOTO',
  PhotoTag = 'PHOTO_TAG',
  PostAttendance = 'POST_ATTENDANCE',
  PostEventFeedback = 'POST_EVENT_FEEDBACK',
  Reply = 'REPLY',
  Rsvp = 'RSVP',
  RsvpConfirm = 'RSVP_CONFIRM',
  SavedEventReminder = 'SAVED_EVENT_REMINDER',
  SpotOpen = 'SPOT_OPEN',
  WebviewUrl = 'WEBVIEW_URL',
}

export enum NotificationPhotoType {
  Event = 'EVENT',
  Member = 'MEMBER',
}

export type OpenEventRsvpsInput = {
  /** Identifier of event which will be edited */
  eventId: Scalars['ID']['input'];
};

export type OpenEventRsvpsPayload = {
  __typename?: 'OpenEventRsvpsPayload';
  errors?: Maybe<Array<PayloadError>>;
  /** The updated event, if successful */
  event?: Maybe<Event>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export enum PayStatus {
  EcheckPending = 'ECHECK_PENDING',
  Exempt = 'EXEMPT',
  None = 'NONE',
  Paid = 'PAID',
  PartialRefund = 'PARTIAL_REFUND',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
  RefundPending = 'REFUND_PENDING',
}

export type PayloadError = {
  __typename?: 'PayloadError';
  code: Scalars['String']['output'];
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export enum PaymentMethod {
  Cash = 'CASH',
  Paypal = 'PAYPAL',
}

/** Standard photo information */
export type PhotoInfo = {
  __typename?: 'PhotoInfo';
  baseUrl?: Maybe<Scalars['String']['output']>;
  highResUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  standardUrl?: Maybe<Scalars['String']['output']>;
  thumbUrl?: Maybe<Scalars['String']['output']>;
};

export enum PhotoType {
  AlbumPhoto = 'ALBUM_PHOTO',
  EmailPhoto = 'EMAIL_PHOTO',
  /** @deprecated feature removed */
  EventChatPhoto = 'EVENT_CHAT_PHOTO',
  EventPhoto = 'EVENT_PHOTO',
  GroupPhoto = 'GROUP_PHOTO',
  MemberPhoto = 'MEMBER_PHOTO',
  NetworkBg = 'NETWORK_BG',
  NetworkLogo = 'NETWORK_LOGO',
  ProBulkGroupPhoto = 'PRO_BULK_GROUP_PHOTO',
  SponsorLogo = 'SPONSOR_LOGO',
}

/** The result of request for uploading the image */
export type PhotoUploadWithUrlPayload = {
  __typename?: 'PhotoUploadWithUrlPayload';
  /** will only be populated if there is a non-system error during processing */
  error?: Maybe<PayloadError>;
  /** image url */
  imagePath?: Maybe<Scalars['String']['output']>;
  /** The object which contain the image info */
  photo?: Maybe<PhotoInfo>;
  /** The url, which can be used for uploading the image */
  uploadUrl?: Maybe<Scalars['String']['output']>;
};

export type PointLocation = {
  /** Latitude of the city */
  latitude: Scalars['Float']['input'];
  /** Longitude of the city */
  longitude: Scalars['Float']['input'];
};

/**
 * type used in @purgePageCache directive
 * Where can the EntityId be found?
 */
export enum Pointcut {
  /**  in input parameters to mutation */
  Input = 'INPUT',
  /**  in output payload of successful mutation */
  Output = 'OUTPUT',
}

export type ProEventRegistration = {
  __typename?: 'ProEventRegistration';
  answers?: Maybe<Array<ProEventRegistrationAnswer>>;
  event: Event;
  member: Member;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProEventRegistrationAnswer = {
  __typename?: 'ProEventRegistrationAnswer';
  answer: Scalars['String']['output'];
  question: Scalars['String']['output'];
};

export type ProEventRegistrationAnswersConnection = {
  __typename?: 'ProEventRegistrationAnswersConnection';
  edges: Array<ProEventRegistrationAnswersEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProEventRegistrationAnswersEdge = {
  __typename?: 'ProEventRegistrationAnswersEdge';
  cursor: Scalars['String']['output'];
  node: ProEventRegistration;
};

export type ProEventRegistrationAnswersFilter = {
  eventIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ProEventRegistrationAnswersInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ProEventRegistrationAnswersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type ProGroupSponsorsConnection = {
  __typename?: 'ProGroupSponsorsConnection';
  edges: Array<SponsorEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Represents pro network information */
export type ProNetwork = {
  __typename?: 'ProNetwork';
  /** Whether the network allows members to upload group and event photos */
  allowPhotoUploads: Scalars['Boolean']['output'];
  /** Contact email of the network */
  contactEmail?: Maybe<Scalars['String']['output']>;
  /** Description of the network */
  description?: Maybe<Scalars['String']['output']>;
  /** A list of event registration responses for the events across the entire Pro network */
  eventRegistrationAnswers: ProEventRegistrationAnswersConnection;
  /** Search network groups */
  eventsSearch: ProNetworkEventsSearchConnection;
  /** External URL of the network */
  externalUrl?: Maybe<Scalars['String']['output']>;
  /** Search network groups */
  groupsSearch: ProNetworkGroupsSearchConnection;
  /** ID of the network */
  id: Scalars['ID']['output'];
  /** If user's email is shared to a network */
  isProEmailShared: Scalars['Boolean']['output'];
  /** Link for the network on meetup.com */
  link: Scalars['String']['output'];
  /** Photo object for the logo */
  logo?: Maybe<PhotoInfo>;
  /** Search network members */
  membersSearch: ProNetworkMemberSearchConnection;
  /** Display name of the network */
  name: Scalars['String']['output'];
  /** Pro network stats */
  networkAnalytics?: Maybe<ProNetworkAnalytics>;
  /** Payment model of the network */
  paymentModel: ProNetworkPaymentModel;
  /** Primary administrator of the network */
  primaryAdmin?: Maybe<Member>;
  /** Returns positive RSVPs for a network */
  rsvpsSearch: ProNetworkRsvpConnection;
  /** A list of links to network's social platforms */
  socialNetworks: Array<SocialNetwork>;
  /** A list of network's sponsors */
  sponsors: Array<Sponsor>;
  /** Status of the network, one of ACTIVE | INACTIVE | FROZEN */
  status: ProNetworkStatus;
  /** Get suggested network events */
  suggestedEvents: ProNetworkSuggestedEventsConnection;
  /** Urlname used to identify the network on meetup.com */
  urlname: Scalars['String']['output'];
};

/** Represents pro network information */
export type ProNetworkEventRegistrationAnswersArgs = {
  input: ProEventRegistrationAnswersInput;
};

/** Represents pro network information */
export type ProNetworkEventsSearchArgs = {
  input: ProNetworkEventsSearchInput;
};

/** Represents pro network information */
export type ProNetworkGroupsSearchArgs = {
  input: ProNetworkGroupsSearchInput;
};

/** Represents pro network information */
export type ProNetworkMembersSearchArgs = {
  input: ProNetworkMemberSearchInput;
};

/** Represents pro network information */
export type ProNetworkRsvpsSearchArgs = {
  input: ProNetworkRsvpsSearchInput;
};

/** Represents pro network information */
export type ProNetworkSuggestedEventsArgs = {
  input: ProNetworkSuggestedEventsInput;
};

export type ProNetworkAnalytics = {
  __typename?: 'ProNetworkAnalytics';
  totalCountries: Scalars['Int']['output'];
  totalGroups: Scalars['Int']['output'];
  totalMembers: Scalars['Int']['output'];
};

export type ProNetworkEventsInput = {
  /** A network filter to apply Event changes to */
  filterId?: InputMaybe<Scalars['String']['input']>;
  /** An ID of an event we are copying from */
  fromEventId?: InputMaybe<Scalars['ID']['input']>;
  /** A signifier to stop the propagation of this event */
  stopPropagation?: InputMaybe<Scalars['Boolean']['input']>;
  /** An override the timezone the Event will be scheduled in */
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type ProNetworkEventsSearchConnection = {
  __typename?: 'ProNetworkEventsSearchConnection';
  edges: Array<ProNetworkEventsSearchEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProNetworkEventsSearchEdge = {
  __typename?: 'ProNetworkEventsSearchEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type ProNetworkEventsSearchInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<NetworkEventsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type ProNetworkFilter = {
  status?: InputMaybe<Array<InputMaybe<ProNetworkTieStatus>>>;
};

export type ProNetworkGroupsSearchConnection = {
  __typename?: 'ProNetworkGroupsSearchConnection';
  edges: Array<ProNetworkGroupsSearchEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProNetworkGroupsSearchEdge = {
  __typename?: 'ProNetworkGroupsSearchEdge';
  cursor: Scalars['String']['output'];
  metadata?: Maybe<GroupAnalytics>;
  node: Group;
};

export type ProNetworkGroupsSearchInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<NetworkGroupsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  networkEventFilterId?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type ProNetworkMemberSearchConnection = {
  __typename?: 'ProNetworkMemberSearchConnection';
  edges: Array<ProNetworkMemberSearchEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProNetworkMemberSearchEdge = {
  __typename?: 'ProNetworkMemberSearchEdge';
  cursor: Scalars['String']['output'];
  metadata?: Maybe<MemberAnalytics>;
  node: Member;
};

export type ProNetworkMemberSearchInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  /** Whether to sort in descending order, defaults to false */
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<NetworkUsersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Field to sort on, defaults to memberId */
  sort?: InputMaybe<Scalars['String']['input']>;
};

export enum ProNetworkPaymentModel {
  Ownership = 'OWNERSHIP',
  Sponsorship = 'SPONSORSHIP',
}

export type ProNetworkRsvpConnection = {
  __typename?: 'ProNetworkRsvpConnection';
  edges: Array<ProNetworkRsvpEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProNetworkRsvpEdge = {
  __typename?: 'ProNetworkRsvpEdge';
  cursor: Scalars['String']['output'];
  node: Rsvp;
};

export type ProNetworkRsvpsSearchInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProNetworkStatus {
  Active = 'ACTIVE',
  Frozen = 'FROZEN',
  Inactive = 'INACTIVE',
}

export type ProNetworkSuggestedEventsConnection = {
  __typename?: 'ProNetworkSuggestedEventsConnection';
  edges: Array<ProNetworkSuggestedEventsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProNetworkSuggestedEventsEdge = {
  __typename?: 'ProNetworkSuggestedEventsEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type ProNetworkSuggestedEventsFilter = {
  /** Filter only online/physical events */
  isOnline?: InputMaybe<Scalars['Boolean']['input']>;
  /** Latitude */
  latitude: Scalars['Float']['input'];
  /** Longitude */
  longitude: Scalars['Float']['input'];
  /** Search radius in miles */
  radius?: InputMaybe<Scalars['Float']['input']>;
};

export type ProNetworkSuggestedEventsInput = {
  filter: ProNetworkSuggestedEventsFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProNetworkTieStatus {
  Active = 'ACTIVE',
  Delisted = 'DELISTED',
  Inactive = 'INACTIVE',
}

/** Date range when a promo code is valid. */
export type PromoCodeDateRangeInput = {
  /**
   * Date in a group time zone when the promo code becomes unavailable.
   * An ISO-8601 local date-time, e.g. "2023-09-19T15:01:52".
   */
  endDate: Scalars['LocalDateTime']['input'];
  /**
   * Date in a group time zone when the promo code becomes available.
   * An ISO-8601 local date-time, e.g. "2023-09-19T15:01:52".
   */
  startDate: Scalars['LocalDateTime']['input'];
};

export type PublishEventDraftInput = {
  eventId: Scalars['ID']['input'];
};

export type PublishEventDraftPayload = {
  __typename?: 'PublishEventDraftPayload';
  /** Null if event has been successfuly published or array of errors if something gone wrong */
  errors?: Maybe<Array<PayloadError>>;
  /** The event with which the operation was carried out */
  event?: Maybe<Event>;
};

export type PublishGroupDraftInput = {
  /** Id of a ticket issued by a Pro network sponsoring the organizer. */
  ticketId?: InputMaybe<Scalars['ID']['input']>;
  token: Scalars['String']['input'];
};

export type PublishGroupDraftPayload = {
  __typename?: 'PublishGroupDraftPayload';
  errors?: Maybe<Array<PayloadError>>;
  group?: Maybe<Group>;
};

export enum PublishStatus {
  /** Visible to leadership team */
  Draft = 'DRAFT',
  /** Visible to the group */
  Published = 'PUBLISHED',
}

export type Query = {
  __typename?: 'Query';
  /** Returns an event according to requested id */
  event?: Maybe<Event>;
  /** Search events using keywords and a location. */
  eventSearch: EventSearchConnection;
  /** Fetch a single group by its id */
  group?: Maybe<Group>;
  /** Fetch a single group by its urlname */
  groupByUrlname?: Maybe<Group>;
  /** Search groups using keywords and a location. */
  groupSearch: GroupSearchConnection;
  /** Query a Pro Network by either id or urlname */
  proNetwork?: Maybe<ProNetwork>;
  /** Search events using only location. */
  recommendedEvents: RecommendedEventsConnection;
  recommendedGroups: RecommendedGroupsConnection;
  /** The currently authenticated member */
  self?: Maybe<Member>;
  /** Suggest topics given a search term */
  suggestTopics: TopicsConnection;
  /** List top level topic categories */
  topicCategories?: Maybe<TopicCategoryConnection>;
};

export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEventSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  dataConfiguration?: InputMaybe<Scalars['String']['input']>;
  filter: EventSearchFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<KeywordSort>;
};

export type QueryGroupArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGroupByUrlnameArgs = {
  urlname: Scalars['String']['input'];
};

export type QueryGroupSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  dataConfiguration?: InputMaybe<Scalars['String']['input']>;
  filter: GroupSearchFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryProNetworkArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  urlname?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryRecommendedEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  dataConfiguration?: InputMaybe<Scalars['String']['input']>;
  filter: RecommendedEventsFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<RecommendedEventsSort>;
};

export type QueryRecommendedGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter: RecommendedGroupsFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
  ignoreNewGroups?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QuerySuggestTopicsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  excludeMemberTopics?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type QueryTopicCategoriesArgs = {
  includeNewGroups?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QuestionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  order: Scalars['String']['input'];
  required: Scalars['Boolean']['input'];
  type: QuestionType;
};

export enum QuestionType {
  Multiple = 'MULTIPLE',
  Phone = 'PHONE',
  Single = 'SINGLE',
  Text = 'TEXT',
}

export enum ReasonForJoining {
  BuildProfessionalNetwork = 'BUILD_PROFESSIONAL_NETWORK',
  MakingFriends = 'MAKING_FRIENDS',
  PracticeHobby = 'PRACTICE_HOBBY',
  Socializing = 'SOCIALIZING',
}

export type RecommendedEventsConnection = {
  __typename?: 'RecommendedEventsConnection';
  edges: Array<RecommendedEventsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RecommendedEventsEdge = {
  __typename?: 'RecommendedEventsEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type RecommendedEventsFilter = {
  /** Boost events from chapters with at least N photos */
  boostEventsWithAtLeastNumImagesInChapter?: InputMaybe<
    Scalars['Int']['input']
  >;
  /** The id of category of the event */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  /** City Boroughs or Neighborhoods Locations */
  cityLocations?: InputMaybe<Array<CityLocation>>;
  country?: InputMaybe<Scalars['String']['input']>;
  /** If true, consolidate events in series and return the latest event of the series/recurring events */
  doConsolidateEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** If true, get a paypal event and put it into third search result */
  doPromotePaypalEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** The maximal date for filtering */
  endDateRange?: InputMaybe<Scalars['String']['input']>;
  /** The end time of day to filter events to */
  endTime?: InputMaybe<Scalars['String']['input']>;
  /** The type of the event */
  eventType?: InputMaybe<EventType>;
  /** Who can join the group hosting the event and how. One of "approval", "closed", or "open" */
  groupJoinMode?: InputMaybe<GroupJoinMode>;
  /** Limit the event recommendations to a set of groups */
  groupList?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** If the group hosting the event has join questions */
  hasJoinQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  /** ElasticSearch index or alias to query */
  indexAlias?: InputMaybe<Scalars['String']['input']>;
  /** The event is happening now */
  isHappeningNow?: InputMaybe<Scalars['Boolean']['input']>;
  /** Events starting within the hour */
  isStartingSoon?: InputMaybe<Scalars['Boolean']['input']>;
  /** List of reasons to filter events more further */
  joinReasons?: InputMaybe<Array<ReasonForJoining>>;
  /**
   * Latitude where the event is held.
   * If Lat/lon is not used, then "city, state, country" are used.
   */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /**
   * Longitude where the event is held
   * If Lat/lon is not used, then "city, state, country" are used.
   */
  lon?: InputMaybe<Scalars['Float']['input']>;
  /** Penalize online events */
  penalizeOnlineEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** Prioritize groups with recent RSVP */
  prioritizeRsvps?: InputMaybe<Scalars['Boolean']['input']>;
  /** Radius of searching the event (in miles). */
  radius?: InputMaybe<Scalars['Float']['input']>;
  /** If the group hosting the event requires a photo to join */
  requiresPhotoToJoin?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * If false, explicitly disable injection of NGA events.
   * If not provided, defaults to true for direct queries and false for meta category queries.
   */
  shouldInjectNgaEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** The minimal date for filtering */
  startDateRange?: InputMaybe<Scalars['String']['input']>;
  /** The start time of day to filter events from */
  startTime?: InputMaybe<Scalars['String']['input']>;
  /** Location-related state */
  state?: InputMaybe<Scalars['String']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayOffset?: InputMaybe<Scalars['Int']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayScale?: InputMaybe<Scalars['Int']['input']>;
  /**
   * The id of topicCategory [from topic taxonomy] of the event.
   * Used if categoryId is empty.
   */
  topicCategoryId?: InputMaybe<Scalars['ID']['input']>;
  /** A list of topic ids which are used to filter for groups */
  topicList?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** If the events should require payment or not */
  usePayPalEvents?: InputMaybe<Scalars['Boolean']['input']>;
  /** Use time of day embedding */
  useTimeOfDayEmbedding?: InputMaybe<Scalars['Boolean']['input']>;
  /** Location-related zip code */
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type RecommendedEventsSort = {
  sortField?: InputMaybe<RecommendedEventsSortField>;
};

export enum RecommendedEventsSortField {
  /** Results will be sorted by datetime */
  Datetime = 'DATETIME',
  Relevance = 'RELEVANCE',
}

export type RecommendedGroupEdge = {
  __typename?: 'RecommendedGroupEdge';
  cursor: Scalars['String']['output'];
  node: Group;
};

export type RecommendedGroupsConnection = {
  __typename?: 'RecommendedGroupsConnection';
  edges: Array<RecommendedGroupEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Filter for recommendedGroups (aka rankedGroups) */
export type RecommendedGroupsFilter = {
  /** When true, enables the artificial popularity boost given to groups less than 14 days old. Default: true */
  boostNewGroup?: InputMaybe<Scalars['Boolean']['input']>;
  /** An optional category ID to further filter down to groups in a particular category */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Controls the distance decay rate in scoring. Range: 0 to 1 (excluded). Lower values make distance matter more. */
  distanceDecayRate?: InputMaybe<Scalars['Float']['input']>;
  /** Whether to look for groups with FROZEN status only */
  frozenOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Who can join this group and how. One of "approval", "closed", or "open" */
  groupJoinMode?: InputMaybe<GroupJoinMode>;
  /** If the group has join questions */
  hasJoinQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  /** ElasticSearch index or alias to query */
  indexAlias?: InputMaybe<Scalars['String']['input']>;
  /** The latitude of the centroid around which we want to show Groups */
  lat: Scalars['Float']['input'];
  /** The longitude of the centroid around which we want to show Groups */
  lon: Scalars['Float']['input'];
  /** Prioritize groups with recent RSVP */
  prioritizeRsvps?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * A radius to filter groups outside the provided lat/lon. Default = 50 miles.
   * New-group search defaults to 3000 miles.
   */
  radius?: InputMaybe<Scalars['Int']['input']>;
  /** If the group requires a photo to join */
  requiresPhotoToJoin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayOffset?: InputMaybe<Scalars['Int']['input']>;
  /** Prioritize groups with recent activity */
  timeDecayScale?: InputMaybe<Scalars['Int']['input']>;
  /**
   * An optional topicCategoryID [from topic taxonomy] to further filter down to Groups in a particular category only.
   * Used if categoryId is empty.
   */
  topicCategoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Controls how topicList matching works */
  topicMatchMode?: InputMaybe<TopicMatchMode>;
  /** A list of topic ids which are used to filter for groups */
  topicsList?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Use time of day embedding */
  useTimeOfDayEmbedding?: InputMaybe<Scalars['Boolean']['input']>;
  /** A visibility group. Default = all */
  visibility?: InputMaybe<GroupVisibility>;
};

export type RecurringEvents = {
  /** An ISO date in the form `YYYY-MM-DD` or `2011-12-03` */
  endDate?: InputMaybe<Scalars['String']['input']>;
  monthlyRecurrence?: InputMaybe<MonthlyRecurrence>;
  weeklyRecurrence?: InputMaybe<WeeklyRecurrence>;
};

export type RecurringEventsEdit = {
  enabled: Scalars['Boolean']['input'];
  settings?: InputMaybe<RecurringEvents>;
};

export type RefundPolicy = {
  __typename?: 'RefundPolicy';
  days?: Maybe<Scalars['Int']['output']>;
  notes: Scalars['String']['output'];
};

export enum Role {
  AsstOrganizer = 'ASST_ORGANIZER',
  Coorganizer = 'COORGANIZER',
  EventOrganizer = 'EVENT_ORGANIZER',
  Member = 'MEMBER',
  Organizer = 'ORGANIZER',
}

export type Rsvp = {
  __typename?: 'Rsvp';
  /** This member's answer to the event RSVP question */
  answer?: Maybe<RsvpAnswer>;
  event: Event;
  /** The number of guests the member has for this event */
  guestsCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** Indicator that this RSVP is the first RSVP for member associated with the RSVP */
  isFirstEvent: Scalars['Boolean']['output'];
  /** Indicator that the member associated with this RSVP is a host for this event */
  isHost: Scalars['Boolean']['output'];
  member: Member;
  /** Membership associated with the RSVP. This may be absent for former members */
  membership?: Maybe<Membership>;
  /**
   * The current event payment status for the RSVP for ticketed events from the perspective of the provided memberId.
   * A payment status is only available if the RSVP belongs to the calling member or if
   * the calling member has permission to manage money within the hosting group.
   */
  payStatus?: Maybe<PayStatus>;
  status?: Maybe<RsvpStatus>;
  /** time this RSVP was last updated */
  updated?: Maybe<Scalars['DateTime']['output']>;
  /** May be null for physical (in-person) events */
  venue?: Maybe<Venue>;
};

export type RsvpAnswer = {
  __typename?: 'RsvpAnswer';
  text: Scalars['String']['output'];
};

export type RsvpConnection = {
  __typename?: 'RsvpConnection';
  /** total overall count of members marked as absent */
  absentCount?: Maybe<Scalars['Int']['output']>;
  /** total overall count of members marked as attended */
  attendedCount?: Maybe<Scalars['Int']['output']>;
  edges: Array<RsvpEdge>;
  /** total overall count of no RSVPS */
  noCount?: Maybe<Scalars['Int']['output']>;
  /** total overall count of members marked as a no show */
  noShowCount?: Maybe<Scalars['Int']['output']>;
  pageInfo?: Maybe<PageInfo>;
  /** total overall count of RSVPs based on requested RSVP statuses */
  totalCount?: Maybe<Scalars['Int']['output']>;
  /** total overall count of waitlisted RSVPS */
  waitlistCount?: Maybe<Scalars['Int']['output']>;
  /** total overall count of yes RSVPS */
  yesCount?: Maybe<Scalars['Int']['output']>;
};

export type RsvpEdge = {
  __typename?: 'RsvpEdge';
  cursor: Scalars['String']['output'];
  node: Rsvp;
};

export enum RsvpEventStatus {
  Cancelled = 'CANCELLED',
  Past = 'PAST',
  Pending = 'PENDING',
  Proposed = 'PROPOSED',
  Upcoming = 'UPCOMING',
}

export type RsvpFilter = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  /** The status of the Event associated with the RSVP. defaults to all RsvpEventStatuses */
  eventStatus?: InputMaybe<Array<InputMaybe<RsvpEventStatus>>>;
  eventType?: InputMaybe<Array<InputMaybe<EventType>>>;
  /** An optional group id to filter on */
  groupId?: InputMaybe<Scalars['ID']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lon?: InputMaybe<Scalars['Float']['input']>;
  /**
   * Optional indicator to only include rsvps associated with hosts.
   * defaults to false.
   */
  onlyHosts?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Optional indicator to only include rsvps for members bringing guests.
   * defaults to false.
   */
  onlyWithGuests?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Optional indicator to only include rsvps for members who are
   * potential member connection candidates
   */
  potentialMemberConnections?: InputMaybe<Scalars['Boolean']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  /**
   * The status of the RSVP. defaults to YES and ATTENDED.
   * A filter containing HAVENT will only returned HAVENT responses, irrespective to other RsvpStatus included.
   */
  rsvpStatus?: InputMaybe<Array<InputMaybe<RsvpStatus>>>;
  /**
   * Currently only supported by Member.Rsvps() query
   * NOTE: This will only be used if no cursor is provided.
   *       It is intended to be used on the first request.
   */
  startDate?: InputMaybe<Scalars['String']['input']>;
  /** An optional venueId to perform filtering by attending in-person or online */
  venueId?: InputMaybe<Scalars['ID']['input']>;
};

export type RsvpOpenSettings = {
  __typename?: 'RsvpOpenSettings';
  rsvpCloseTime?: Maybe<Scalars['DateTime']['output']>;
  rsvpOpenTime?: Maybe<Scalars['DateTime']['output']>;
  rsvpsClosed?: Maybe<Scalars['Boolean']['output']>;
};

export type RsvpQuestion = {
  __typename?: 'RsvpQuestion';
  questionId: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type RsvpSearchConnection = {
  __typename?: 'RsvpSearchConnection';
  edges: Array<RsvpEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RsvpSearchFilter = {
  /** The name of the member */
  query: Scalars['String']['input'];
  /** An optional list of RSVP statuses to preform secondary filtering on */
  status?: InputMaybe<Array<InputMaybe<RsvpStatus>>>;
  /** An optional venueId to perform filtering by attending in-person or online */
  venueId?: InputMaybe<Scalars['ID']['input']>;
};

export type RsvpSettings = {
  /** Positive integer representing the number of guests that members may include in their RSVP, 0 inclusive. This defaults to 2. */
  guestLimit?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Duration, Should be according to the ISO 8601 duration specified format
   *
   * To remove the RSVP close time from an existing event, set rsvpCloseDuration to PT0S
   */
  rsvpCloseDuration?: InputMaybe<Scalars['String']['input']>;
  /**
   * Field representing the time before which members
   * will be allowed to RSVP to the event in milliseconds since the epoch.
   * This can only be set if there is a start time for the event.
   * This defaults to no RSVP close time restriction.
   *
   * To remove the RSVP close time from an existing event, set rsvpCloseDuration to PT0S
   */
  rsvpCloseTime?: InputMaybe<Scalars['String']['input']>;
  /**
   * Positive integer representing total number of RSVP slots available for the event.
   * When undefined or defined as 0, there will be no set limit.
   *
   * To remove the RSVP limit from an existing event, provide a value of 0
   */
  rsvpLimit?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Duration, Should be according to the ISO 8601 duration specified format
   *
   * To remove the RSVP open time from an existing event, set rsvpOpenDuration to PT0S
   */
  rsvpOpenDuration?: InputMaybe<Scalars['String']['input']>;
  /**
   * Field representing the time after which members
   * will be allowed to RSVP to the event in milliseconds since the epoch.
   * This can only be set if there is a start time for the event.
   * This defaults to no RSVP open time restriction.
   *
   * To remove the RSVP open time from an existing event, set rsvpOpenDuration to PT0S
   */
  rsvpOpenTime?: InputMaybe<Scalars['String']['input']>;
};

export type RsvpSort = {
  /** Order placing hosts first, followed by the provided or default sorting */
  hostsFirst?: InputMaybe<Scalars['Boolean']['input']>;
  /** Order placing pending member connections awaiting the authenticated member first, if they are a subscriber, followed by the provided or default sorting */
  memberConnectionsFirst?: InputMaybe<Scalars['Boolean']['input']>;
  /** The field to sort on. Defaults to RsvpSortField.RSVP_ID */
  sortField?: InputMaybe<RsvpSortField>;
  /** The direction of sort. Defaults to SortOrder.ASC */
  sortOrder?: InputMaybe<SortOrder>;
};

export enum RsvpSortField {
  /**
   * In the case of member.rsvps, the normalized time of the event
   * In the case of event.rsvps, the rsvp's updated time
   */
  Datetime = 'DATETIME',
  /**
   * In the case of member.rsvps, the local time of the event according to the hosting groups timezone
   * In the case of event.rsvps the same as DATETIME
   */
  LocalTime = 'LOCAL_TIME',
  /** The name of member rsvping */
  Name = 'NAME',
  /** What's relevant to most members, you typically want pair this with SortOrder.DESC */
  Relevance = 'RELEVANCE',
  /** The unique id associated with the rsvp */
  RsvpId = 'RSVP_ID',
  /** Number of shared groups in common with a given member, you typically want pair this with SortOrder.DESC */
  SharedGroups = 'SHARED_GROUPS',
}

export enum RsvpState {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Dues = 'DUES',
  ExternalYes = 'EXTERNAL_YES',
  Full = 'FULL',
  JoinApproval = 'JOIN_APPROVAL',
  JoinDuesApproval = 'JOIN_DUES_APPROVAL',
  JoinOpen = 'JOIN_OPEN',
  No = 'NO',
  None = 'NONE',
  NotOpenYet = 'NOT_OPEN_YET',
  Past = 'PAST',
  Requested = 'REQUESTED',
  Rsvp = 'RSVP',
  Waitlist = 'WAITLIST',
  Yes = 'YES',
}

/**
 * #########################
 *  search and filters
 * #########################
 */
export enum RsvpStatus {
  /** An organizer confirmed attendance */
  Attended = 'ATTENDED',
  /** A organizer confirmed absence */
  ExcusedAbsence = 'EXCUSED_ABSENCE',
  /** An unresponded to RSVP */
  Havent = 'HAVENT',
  /** No longer supported */
  Maybe = 'MAYBE',
  /** A member's response expressing they won't attend */
  No = 'NO',
  /** An organized flagged RSVP for a member that was expected to attend but didn't */
  NoShow = 'NO_SHOW',
  /** A member's response expressing an intent to attend to an over capacity event */
  Waitlist = 'WAITLIST',
  /** A member's response expressing an intent to attend */
  Yes = 'YES',
  /** A member's expressed intent to go to an paid event before payment has been processed */
  YesPendingPayment = 'YES_PENDING_PAYMENT',
}

export type RsvpSurvey = {
  questions: Array<RsvpSurveyQuestion>;
  rsvpQuestions?: InputMaybe<Array<QuestionInput>>;
};

export type RsvpSurveyEdit = {
  enabled: Scalars['Boolean']['input'];
  survey?: InputMaybe<RsvpSurvey>;
};

export enum RsvpSurveyQuestion {
  Company = 'COMPANY',
  FirstName = 'FIRST_NAME',
  LastName = 'LAST_NAME',
  Phone = 'PHONE',
  Role = 'ROLE',
  Topic = 'TOPIC',
}

export enum SavedEventsFilter {
  All = 'ALL',
  Future = 'FUTURE',
  Past = 'PAST',
}

/** Properties of an event series that recurs over a period of time */
export type Series = {
  __typename?: 'Series';
  /** A human-readable description of the series */
  description: Scalars['String']['output'];
  /** An ISO date in the form `YYYY-MM-DD` or `2011-12-03` */
  endDate?: Maybe<Scalars['String']['output']>;
  /** id of the series */
  id?: Maybe<Scalars['ID']['output']>;
  /** Returned for events that are part of a monthly recurring series of events */
  monthlyRecurrence?: Maybe<MonthlyRecurrenceInfo>;
  /** Returned for events that are part of a weekly recurring series of events */
  weeklyRecurrence?: Maybe<WeeklyRecurrenceInfo>;
};

export type SocialNetwork = {
  __typename?: 'SocialNetwork';
  /** Social network identifier */
  identifier?: Maybe<Scalars['String']['output']>;
  /** Social network service */
  service: SocialNetworkService;
  /** Social network url */
  url?: Maybe<Scalars['String']['output']>;
};

/** Social Network Input for group update */
export type SocialNetworkInput = {
  /** Social network identifier */
  identifier: Scalars['String']['input'];
  /** Social network service */
  service: SocialNetworkService;
  /** Social network status */
  status: SocialNetworkStatus;
};

export enum SocialNetworkService {
  Facebook = 'FACEBOOK',
  Flickr = 'FLICKR',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Other = 'OTHER',
  Tiktok = 'TIKTOK',
  Tumblr = 'TUMBLR',
  Twitter = 'TWITTER',
}

export enum SocialNetworkStatus {
  /** Show */
  Active = 'ACTIVE',
  /** Not show */
  Hidden = 'HIDDEN',
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SpeakerDetails = {
  __typename?: 'SpeakerDetails';
  /** Description of a speaker */
  description: Scalars['String']['output'];
  /** Name of a speaker */
  name: Scalars['String']['output'];
  /** Speaker's PhotoInfo */
  photo?: Maybe<PhotoInfo>;
  /** List of a speaker's social networks */
  socialNetworks: Array<SocialNetwork>;
};

export type SpeakerDetailsInput = {
  /** Description of a speaker */
  description: Scalars['String']['input'];
  /** Name of a speaker */
  name: Scalars['String']['input'];
  /** Positive integer representing a numeric identifier for a photo, which must be one associated with this group. When undefined or 0, no photo is set. */
  photoId?: InputMaybe<Scalars['ID']['input']>;
  /** List of a speaker's social networks */
  socialNetworks?: InputMaybe<Array<SpeakerSocialNetworkInputNode>>;
};

export type SpeakerSocialNetworkInputNode = {
  /** The actual identifier of the social network */
  identifier: Scalars['String']['input'];
  /** Service of the social network */
  service: SocialNetworkService;
};

/** The sponsor */
export type Sponsor = {
  __typename?: 'Sponsor';
  /** The sponsor description */
  description: Scalars['String']['output'];
  /** Id of the sponsor */
  id: Scalars['ID']['output'];
  /**
   * The sponsor logo photo id
   * @deprecated use `logoPhoto.id` instead
   */
  logoId?: Maybe<Scalars['ID']['output']>;
  /** The sponsor logo photo */
  logoPhoto?: Maybe<PhotoInfo>;
  /** The sponsor name */
  name: Scalars['String']['output'];
  /** The sponsor url */
  url?: Maybe<Scalars['String']['output']>;
};

export type SponsorEdge = {
  __typename?: 'SponsorEdge';
  cursor: Scalars['String']['output'];
  node: Sponsor;
};

export enum SponsorType {
  Group = 'GROUP',
  Network = 'NETWORK',
}

/** Set of fields to filter sponsors */
export type SponsorsFilter = {
  type?: InputMaybe<SponsorType>;
};

export type Topic = {
  __typename?: 'Topic';
  /** Description of topic. Supports localization when Accept-Language HTTP header is provided */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Name of topic. Supports localization when Accept-Language HTTP header is provided */
  name: Scalars['String']['output'];
  urlkey: Scalars['String']['output'];
};

export type TopicCategory = {
  __typename?: 'TopicCategory';
  color: Scalars['String']['output'];
  /** The default topic for the topic category */
  defaultTopic: Topic;
  /** Unique id for the topic category */
  id: Scalars['ID']['output'];
  /** A representative image url for the topic category */
  imageUrl: Scalars['String']['output'];
  /** Name of topic category translated based on requested language */
  name: Scalars['String']['output'];
  topics: TopicsConnection;
  /** UrlKey used in urls */
  urlkey: Scalars['String']['output'];
};

export type TopicCategoryTopicsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type TopicCategoryConnection = {
  __typename?: 'TopicCategoryConnection';
  edges: Array<TopicCategoryEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type TopicCategoryEdge = {
  __typename?: 'TopicCategoryEdge';
  cursor: Scalars['String']['output'];
  node: TopicCategory;
};

export type TopicEdge = {
  __typename?: 'TopicEdge';
  cursor: Scalars['String']['output'];
  node: Topic;
};

export enum TopicMatchMode {
  /** Match groups by topic categories (broader matching) */
  Categories = 'CATEGORIES',
  /** Match groups by individual topics (default) */
  Topics = 'TOPICS',
}

export type TopicsConnection = {
  __typename?: 'TopicsConnection';
  edges: Array<TopicEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type UpdateGroupDraftInput = {
  /** What members of the group will be called. Can be at most 32 characters */
  customMembersLabel?: InputMaybe<Scalars['String']['input']>;
  /** Summary of what the Meetup group is about in simple HTML format */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Group Location */
  location?: InputMaybe<GroupLocation>;
  /** Display name of the group. Can be at most 60 characters */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Group draft token */
  token: Scalars['String']['input'];
  /** Sets the specified topics to the group overwriting any existing topics. Topics are identified by ids and can be obtained from find topics query */
  topics?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Name used for the group's web address on meetup.com. Must be between 6 and 60 characters */
  urlname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGroupDraftPayload = {
  __typename?: 'UpdateGroupDraftPayload';
  errors?: Maybe<Array<PayloadError>>;
  group?: Maybe<Group>;
};

export type UpdateGroupMembershipRoleInput = {
  groupId: Scalars['ID']['input'];
  memberId: Scalars['ID']['input'];
  role: Role;
};

export type UpdateGroupMembershipRolePayload = {
  __typename?: 'UpdateGroupMembershipRolePayload';
  errors?: Maybe<Array<PayloadError>>;
  membership?: Maybe<Membership>;
};

export type Venue = {
  __typename?: 'Venue';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  /** the type of venue. may be "online" for a virtual venue or empty string at present for in-person events */
  venueType?: Maybe<Scalars['String']['output']>;
};

export type VenueOptionInput = {
  /**
   * Representing attributes for paid events.
   * Used only for the online venue of the hybrid event.
   * Physical venue part is populated using existing field under event type.
   */
  feeOption?: InputMaybe<EventFeeOption>;
  /**
   * Positive integer representing the number of guests that members
   * may include in their RSVP, 0 inclusive. This defaults to 2.
   */
  guestLimit?: InputMaybe<Scalars['Int']['input']>;
  /**
   * String setting the description for the location of the host(s) at the event venue.
   * For online events this field is used for the event's url.
   */
  howToFindUs?: InputMaybe<Scalars['String']['input']>;
  /**
   * Positive integer representing total number of RSVP slots available for this particular venue.
   * When undefined or defined as 0, there will be no set limit.
   *
   * To remove the RSVP limit from an existing event venue, provide a value of 0.
   */
  rsvpLimit?: InputMaybe<Scalars['Int']['input']>;
  /** Id of the venue which should have the options below. */
  venueId: Scalars['String']['input'];
};

/** Waitlist handling when RSVP limit is reached */
export enum WaitlistMode {
  /** If a spot opens up, the next member in line claims it */
  Auto = 'AUTO',
  /** Waitlists are turned off only in cases where payments are required and there is an rsvp limit */
  Off = 'OFF',
}

export type WeeklyRecurrence = {
  /** List days of the week this event will be hosted on */
  weeklyDaysOfWeek: Array<DayOfWeek>;
  /** Integer number of weeks between each recurrence */
  weeklyInterval: Scalars['Int']['input'];
};

export type WeeklyRecurrenceInfo = {
  __typename?: 'WeeklyRecurrenceInfo';
  /** List days of the week this event will be hosted on */
  weeklyDaysOfWeek: Array<DayOfWeek>;
  /** Integer number of weeks between each recurrence */
  weeklyInterval: Scalars['Int']['output'];
};

export type MeetupArticleLeadFragment = {
  __typename?: 'Event';
  id: string;
  title: string;
  dateTime?: any | null;
  description: string;
  eventUrl: string;
};

export type MeetupArticleFragment = {
  __typename?: 'Event';
  id: string;
  title: string;
  eventUrl: string;
  description: string;
  dateTime?: any | null;
  duration?: any | null;
  eventHosts?: Array<{
    __typename?: 'EventHost';
    name?: string | null;
  } | null> | null;
  featuredEventPhoto?: {
    __typename?: 'PhotoInfo';
    id: string;
    baseUrl?: string | null;
    standardUrl?: string | null;
    thumbUrl?: string | null;
  } | null;
  group?: {
    __typename?: 'Group';
    id: string;
    name: string;
    urlname: string;
  } | null;
  venues?: Array<{
    __typename?: 'Venue';
    id: string;
    name?: string | null;
    lat?: number | null;
    lon?: number | null;
  }> | null;
};

export type AllPostsQueryVariables = Exact<{
  urlname: Scalars['String']['input'];
}>;

export type AllPostsQuery = {
  __typename?: 'Query';
  allEvents?: {
    __typename?: 'Group';
    events: {
      __typename?: 'GroupEventConnection';
      totalCount?: number | null;
      pageInfo?: {
        __typename?: 'PageInfo';
        endCursor?: string | null;
        startCursor?: string | null;
      } | null;
      edges: Array<{
        __typename?: 'EventEdge';
        node: {
          __typename?: 'Event';
          id: string;
          title: string;
          dateTime?: any | null;
          description: string;
          eventUrl: string;
        };
      }>;
    };
  } | null;
};

export type PastEventsQueryVariables = Exact<{
  urlname: Scalars['String']['input'];
  itemsNum: Scalars['Int']['input'];
}>;

export type PastEventsQuery = {
  __typename?: 'Query';
  groupByUrlname?: {
    __typename?: 'Group';
    events: {
      __typename?: 'GroupEventConnection';
      edges: Array<{
        __typename?: 'EventEdge';
        node: {
          __typename?: 'Event';
          id: string;
          title: string;
          eventUrl: string;
          description: string;
          dateTime?: any | null;
          duration?: any | null;
          eventHosts?: Array<{
            __typename?: 'EventHost';
            name?: string | null;
          } | null> | null;
          featuredEventPhoto?: {
            __typename?: 'PhotoInfo';
            id: string;
            baseUrl?: string | null;
            standardUrl?: string | null;
            thumbUrl?: string | null;
          } | null;
          group?: {
            __typename?: 'Group';
            id: string;
            name: string;
            urlname: string;
          } | null;
          venues?: Array<{
            __typename?: 'Venue';
            id: string;
            name?: string | null;
            lat?: number | null;
            lon?: number | null;
          }> | null;
        };
      }>;
    };
  } | null;
};

export type LatestUpcomingEventsQueryVariables = Exact<{
  urlname: Scalars['String']['input'];
}>;

export type LatestUpcomingEventsQuery = {
  __typename?: 'Query';
  groupByUrlname?: {
    __typename?: 'Group';
    events: {
      __typename?: 'GroupEventConnection';
      edges: Array<{
        __typename?: 'EventEdge';
        node: {
          __typename?: 'Event';
          id: string;
          title: string;
          eventUrl: string;
          description: string;
          dateTime?: any | null;
          duration?: any | null;
          eventHosts?: Array<{
            __typename?: 'EventHost';
            name?: string | null;
          } | null> | null;
          featuredEventPhoto?: {
            __typename?: 'PhotoInfo';
            id: string;
            baseUrl?: string | null;
            standardUrl?: string | null;
            thumbUrl?: string | null;
          } | null;
          group?: {
            __typename?: 'Group';
            id: string;
            name: string;
            urlname: string;
          } | null;
          venues?: Array<{
            __typename?: 'Venue';
            id: string;
            name?: string | null;
            lat?: number | null;
            lon?: number | null;
          }> | null;
        };
      }>;
    };
  } | null;
};

export type EventsByEventIdQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;

export type EventsByEventIdQuery = {
  __typename?: 'Query';
  event?: {
    __typename?: 'Event';
    id: string;
    title: string;
    eventUrl: string;
    description: string;
    dateTime?: any | null;
    duration?: any | null;
    eventHosts?: Array<{
      __typename?: 'EventHost';
      name?: string | null;
    } | null> | null;
    featuredEventPhoto?: {
      __typename?: 'PhotoInfo';
      id: string;
      baseUrl?: string | null;
      standardUrl?: string | null;
      thumbUrl?: string | null;
    } | null;
    group?: {
      __typename?: 'Group';
      id: string;
      name: string;
      urlname: string;
    } | null;
    venues?: Array<{
      __typename?: 'Venue';
      id: string;
      name?: string | null;
      lat?: number | null;
      lon?: number | null;
    }> | null;
  } | null;
};

export type AllEventsCountQueryVariables = Exact<{
  urlname: Scalars['String']['input'];
}>;

export type AllEventsCountQuery = {
  __typename?: 'Query';
  groupByUrlname?: {
    __typename?: 'Group';
    events: { __typename?: 'GroupEventConnection'; totalCount?: number | null };
  } | null;
};

export const MeetupArticleLeadFragmentDoc = gql`
  fragment MeetupArticleLead on Event {
    id
    title
    dateTime
    description
    eventUrl
  }
`;
export const MeetupArticleFragmentDoc = gql`
  fragment MeetupArticle on Event {
    id
    title
    eventUrl
    description
    dateTime
    duration
    eventHosts {
      name
    }
    featuredEventPhoto {
      id
      baseUrl
      standardUrl
      thumbUrl
    }
    group {
      id
      name
      urlname
    }
    venues {
      id
      name
      lat
      lon
    }
  }
`;
export const AllPostsDocument = gql`
  query allPosts($urlname: String!) {
    allEvents: groupByUrlname(urlname: $urlname) {
      events(first: 55, sort: DESC, filter: { status: [PAST, ACTIVE] }) {
        totalCount
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            ...MeetupArticleLead
          }
        }
      }
    }
  }
  ${MeetupArticleLeadFragmentDoc}
`;
export const PastEventsDocument = gql`
  query pastEvents($urlname: String!, $itemsNum: Int!) {
    groupByUrlname(urlname: $urlname) {
      events(first: $itemsNum, sort: DESC, filter: { status: [PAST] }) {
        edges {
          node {
            ...MeetupArticle
          }
        }
      }
    }
  }
  ${MeetupArticleFragmentDoc}
`;
export const LatestUpcomingEventsDocument = gql`
  query latestUpcomingEvents($urlname: String!) {
    groupByUrlname(urlname: $urlname) {
      events(first: 10, sort: DESC, filter: { status: [ACTIVE] }) {
        edges {
          node {
            ...MeetupArticle
          }
        }
      }
    }
  }
  ${MeetupArticleFragmentDoc}
`;
export const EventsByEventIdDocument = gql`
  query eventsByEventId($eventId: ID!) {
    event(id: $eventId) {
      ...MeetupArticle
    }
  }
  ${MeetupArticleFragmentDoc}
`;
export const AllEventsCountDocument = gql`
  query allEventsCount($urlname: String!) {
    groupByUrlname(urlname: $urlname) {
      events(sort: DESC, filter: { status: [ACTIVE, PAST] }) {
        totalCount
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    allPosts(
      variables: AllPostsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal']
    ): Promise<AllPostsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllPostsQuery>({
            document: AllPostsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'allPosts',
        'query',
        variables
      );
    },
    pastEvents(
      variables: PastEventsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal']
    ): Promise<PastEventsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PastEventsQuery>({
            document: PastEventsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'pastEvents',
        'query',
        variables
      );
    },
    latestUpcomingEvents(
      variables: LatestUpcomingEventsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal']
    ): Promise<LatestUpcomingEventsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestUpcomingEventsQuery>({
            document: LatestUpcomingEventsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'latestUpcomingEvents',
        'query',
        variables
      );
    },
    eventsByEventId(
      variables: EventsByEventIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal']
    ): Promise<EventsByEventIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EventsByEventIdQuery>({
            document: EventsByEventIdDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'eventsByEventId',
        'query',
        variables
      );
    },
    allEventsCount(
      variables: AllEventsCountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal']
    ): Promise<AllEventsCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllEventsCountQuery>({
            document: AllEventsCountDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'allEventsCount',
        'query',
        variables
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
