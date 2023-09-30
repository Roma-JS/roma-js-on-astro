import { QueryClient } from '@tanstack/solid-query';

/**
 * ### programmatic usage
 *
 * ```ts
 * queryCacheClient.fetchQuery([...])
 * ```
 *
 * @see https://tanstack.com/query/v4/docs/react/reference/QueryClient
 */
export const queryCacheClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Cache first without invalidation on request
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});
