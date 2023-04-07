import React, { useCallback } from "react";
import { Queries, useQuery, useUpsertQuery } from "./query";

export type SortQuery<Fields extends string | number | symbol = string> =
  Record<Fields, "asc" | "desc" | undefined | null>;

const buildSortQuery = (sorting: SortQuery) =>
  Object.entries(sorting)
    .filter(([, ascending]) => !!ascending)
    .map(
      ([sortKey, ascending]) => `${ascending === "asc" ? "" : "-"}${sortKey}`
    )
    .join(",");

export interface SortReturn<Fields extends string | number | symbol> {
  ordering?: string;
  sorting: SortQuery<Fields>;
  upsertSort: (field: Fields, ascending?: "asc" | "desc" | null) => void;
  removeSort: (field: Fields) => void;
  setSort: (field: Fields, ascending?: "asc" | "desc" | null) => void;
  clearSort: () => void;
}

export function useSort<
  Params extends Queries & { ordering?: string },
  Fields extends Extract<keyof Params, string> = Extract<keyof Params, string>
>(): SortReturn<Fields> {
  const query = useQuery<Params>();
  const upsertQuery = useUpsertQuery();

  const sorting: SortQuery = React.useMemo(() => {
    if (!query.ordering) {
      return {};
    }
    const sortFields = query.ordering.split(",");
    return Object.fromEntries(
      sortFields.map((sortField) => {
        if (sortField[0] === "-") {
          return [sortField.slice(1), "desc"];
        }
        return [sortField, "asc"];
      })
    );
  }, [query.ordering]);

  const removeSort = React.useCallback(
    (field: Fields) => {
      const sortEntries = Object.entries(sorting)
        .map(([sortKey, acsending]) => {
          if (sortKey === field) {
            return undefined;
          }
          return [sortKey, acsending];
        })
        .filter(Boolean) as [string, "asc" | "desc"][];
      const sortQuery = buildSortQuery(Object.fromEntries(sortEntries));
      upsertQuery({ ordering: sortQuery });
    },
    [sorting, upsertQuery]
  );

  const upsertSort = React.useCallback(
    (field: Fields, ascending?: "asc" | "desc" | null) => {
      const sortQuery = buildSortQuery({
        ...sorting,
        [field]: ascending,
      });
      upsertQuery({ ordering: sortQuery });
    },
    [sorting, upsertQuery]
  );

  const setSort = useCallback(
    (field: Fields, ascending?: "asc" | "desc" | null) => {
      upsertQuery({ ordering: buildSortQuery({ [field]: ascending }) });
    },
    [upsertQuery]
  );

  const clearSort = useCallback(
    () => upsertQuery({ ordering: undefined }),
    [upsertQuery]
  );

  return {
    ordering: query.ordering,
    sorting,
    upsertSort,
    removeSort,
    clearSort,
    setSort,
  };
}
