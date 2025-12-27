import { GraphQLClient } from 'graphql-request';
import { queryCacheClient } from '../query-client';
import type { FetchQueryOptions } from '@tanstack/solid-query';
import { getSdk, type MeetupArticleFragment } from './events.graphql.generated';

/**
 * A simple graqhql client not backed by a cache.
 *
 * The caching layer is provided by {@link queryCacheClient}.
 *
 * @see {@link https://www.npmjs.com/package/graphql-request}
 */
const meetupApiClient = getSdk(
  new GraphQLClient(import.meta.env.MEETUP_GRAPHQL_ENDPOINT || '')
);

// Additional `cache.fetchQuery` parameters that can be added to customize the cache behavior
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
  eventId: string
): Promise<MeetupArticleFragment | undefined> {
  return queryCacheClient.fetchQuery({
    queryKey: ['fetchMeetupEventById', eventId],
    async queryFn({ queryKey }) {
      const data = await meetupApiClient.eventsByEventId({
        eventId: queryKey[1],
      });

      return data.event ?? undefined;
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
export async function fetchRomajsMeetupsCount(): Promise<number | undefined> {
  return queryCacheClient.fetchQuery({
    queryKey: ['fetchRomajsMeetupsCount'],
    async queryFn() {
      const data = await meetupApiClient.allEventsCount({
        urlname: import.meta.env.MEETUP_GROUP_ID,
      });
      return data.groupByUrlname?.events.totalCount ?? undefined;
    },
  });
}

/**
 * ### Usage
 *
 * ```ts
 * import { fetchUpcomingRomajsEvents } from '@api/meetup/queries.server';
 *
 * const upcomingRomaJsEvents = await fetchUpcomingRomajsEvents();
 * ```
 */
export async function fetchUpcomingRomajsEvents(): Promise<
  MeetupArticleFragment[] | undefined
> {
  return queryCacheClient.fetchQuery({
    queryKey: ['fetchUpcomingRomajsEvents'],
    async queryFn() {
      const data = await meetupApiClient.latestUpcomingEvents({
        urlname: import.meta.env.MEETUP_GROUP_ID,
      });

      return data.groupByUrlname?.events.edges.map((edge) => edge.node);
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
export async function fetchAllPastRomajsEvents(): Promise<
  MeetupArticleFragment[] | undefined
> {
  return queryCacheClient.fetchQuery({
    queryKey: ['fetchAllPastRomajsEvents'],
    async queryFn() {
      const data = await meetupApiClient.pastEvents({
        urlname: import.meta.env.MEETUP_GROUP_ID,
        itemsNum: 999_999,
      });

      return data.groupByUrlname?.events.edges.map((edge) => edge.node);
    },
  });
}
