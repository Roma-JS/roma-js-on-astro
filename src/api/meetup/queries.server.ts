import { GraphQLClient } from 'graphql-request';
import {
  EVENT_BY_EVENTID,
  MEETUP_EVENTS_COUNT,
  LAST_UPCOMING_EVENT_QUERY,
  PAST_EVENT_QUERY,
} from './event.graphql';
import type { MeetupEventType } from './event.graqhql.types';
import { queryCacheClient } from '../query-client';
import type { FetchQueryOptions } from '@tanstack/solid-query';

/**
 * A simple graqhql client not backed by a cache.
 *
 * The caching layer is provided by {@link queryCacheClient}.
 *
 * @see {@link https://www.npmjs.com/package/graphql-request}
 */
const meetupGraqhqlClient = new GraphQLClient(
  import.meta.env.MEETUP_GRAPHQL_ENDPOINT || ''
);

export type MeetupQueryConfig<Data> = Omit<
  FetchQueryOptions<unknown, unknown, Data, string[]>,
  'queryKey' | 'queryFn'
>;

/**
 * ### Usage
 * ```ts
 * import { fetchMeetupEventById } from '@api/meetup/queries.server';
 *
 * const meetupById = await fetchMeetupEventById('295438372');
 * ```
 *
 * @see {@link MeetupQueryConfig}
 */
export async function fetchMeetupEventById(
  eventId: string,
  config?: MeetupQueryConfig<MeetupEventType | null>
) {
  return queryCacheClient.fetchQuery({
    ...config,
    queryKey: ['fetchMeetupEventById', eventId],
    async queryFn({ queryKey }) {
      const data = await meetupGraqhqlClient.request<{
        event: MeetupEventType | null;
      }>({
        document: EVENT_BY_EVENTID,
        variables: { eventId: queryKey[1] },
      });

      return data.event;
    },
  });
}

/**
 * ### Usage
 *
 * ```ts
 * import { fetchRomajsMeetupsCount } from '@api/meetup/queries.server';
 *
 * const romaJsMeetupsCount: number = await fetchRomajsMeetupsCount();
 * ```
 *
 * @see {@link MeetupQueryConfig}
 */
export async function fetchRomajsMeetupsCount(
  config?: MeetupQueryConfig<number>
): Promise<number> {
  return queryCacheClient.fetchQuery({
    ...config,
    queryKey: ['fetchRomajsMeetupsCount'],
    async queryFn() {
      const data = await meetupGraqhqlClient.request<{
        groupByUrlname: { pastEvents: { count: number } };
      }>({
        document: MEETUP_EVENTS_COUNT,
        variables: {
          urlname: import.meta.env.MEETUP_GROUP_ID,
        },
      });

      const {
        groupByUrlname: {
          pastEvents: { count },
        },
      } = data;
      return count;
    },
  });
}

/**
 * ### Usage
 *
 * ```ts
 * import { fetchNextUpcomingRomajsEvent } from '@api/meetup/queries.server';
 *
 * const upcomingRomaJsEvents = await fetchNextUpcomingRomajsEvent();
 * ```
 */
export async function fetchUpcomingRomajsEvents(
  config?: MeetupQueryConfig<MeetupEventType[] | null>
): Promise<MeetupEventType[] | null> {
  return queryCacheClient.fetchQuery({
    ...config,
    queryKey: ['fetchUpcomingRomajsEvents'],
    async queryFn() {
      const data = await meetupGraqhqlClient.request<{
        groupByUrlname: {
          upcomingEvents: { edges: { node: MeetupEventType }[] };
        };
      }>({
        document: LAST_UPCOMING_EVENT_QUERY,
        variables: {
          urlname: import.meta.env.MEETUP_GROUP_ID,
        },
      });

      const {
        groupByUrlname: {
          upcomingEvents: { edges },
        },
      } = data;

      return edges.map((eventElement) => ({
        ...eventElement.node,
      }));
    },
  });
}

/**
 * ### Usage
 *
 * ```ts
 * import { fetchAllPastRomajsEvents } from '@api/meetup/queries.server';
 *
 * const allPastEvents = await fetchAllPastRomajsEvents();
 * ```
 */
export async function fetchAllPastRomajsEvents(
  config?: MeetupQueryConfig<MeetupEventType[]>
): Promise<MeetupEventType[]> {
  return queryCacheClient.fetchQuery({
    ...config,
    queryKey: ['fetchAllPastRomajsEvents'],
    async queryFn() {
      const itemsNum = await fetchRomajsMeetupsCount(
        config as unknown as MeetupQueryConfig<number>
      );

      const data = await meetupGraqhqlClient.request<{
        groupByUrlname: { pastEvents: { edges: { node: MeetupEventType }[] } };
      }>({
        document: PAST_EVENT_QUERY,
        variables: {
          urlname: import.meta.env.MEETUP_GROUP_ID,
          itemsNum,
        },
      });

      const {
        groupByUrlname: {
          pastEvents: { edges },
        },
      } = data;

      return edges.map((eventElement) => ({
        ...eventElement.node,
        id: eventElement.node.id.replace('!chp', ''),
      }));
    },
  });
}
