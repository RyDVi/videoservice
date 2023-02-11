import { useRouter } from 'next/router';
import React from 'react';

export type Queries = Record<string, any>;

export function useQuery<Params extends Queries>(): Record<
  keyof Params,
  string | undefined
> {
  return useRouter().query as Params;
}

export function useUpsertQuery() {
  const query = useQuery();
  const router = useRouter();
  return React.useCallback(
    (queries: Queries, replace?: 'replace' | 'push') => {
      const method = replace === 'replace' ? router.replace : router.push;
      // TODO: incorrect. Need full data from router
      method({ pathname: router.pathname, query: { ...query, ...queries } });
    },
    [query, router.pathname, router.push, router.replace]
  );
}

export function useSetQuery() {
  const router = useRouter();
  return React.useCallback(
    (queries: Queries, replace?: boolean) => {
      const method = replace ? router.replace : router.push;
      // TODO: incorrect. Need full data from router
      method({ pathname: router.pathname, query: queries });
    },
    [router.pathname, router.push, router.replace]
  );
}

export function useQueryActions(): [
  ReturnType<typeof useQuery>,
  ReturnType<typeof useUpsertQuery>,
  ReturnType<typeof useSetQuery>
] {
  const query = useQuery();
  const upsertQuery = useUpsertQuery();
  const setQuery = useSetQuery();
  return [query, upsertQuery, setQuery];
}
