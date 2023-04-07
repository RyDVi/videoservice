import { useMemo, useState, useCallback } from "react";
import { useQueryActions } from "./query";

export interface UsePageProps {
  pageSize?: number;
}

export type UsePageReturnProps = [
  number,
  (page: number) => void,
  number,
  (pageSize: number) => void
];

export function usePage({
  pageSize: initialPageSize = 25,
}: UsePageProps): UsePageReturnProps {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [query, upsertQuery] = useQueryActions();
  const updatePage = useCallback(
    (page: number) => upsertQuery({ page }),
    [upsertQuery]
  );
  const page = useMemo(
    () => (query.page ? Number(query.page) : 1),
    [query.page]
  );
  const updatePageSize = useCallback(
    (pageSize: number) => {
      setPageSize(pageSize);
      upsertQuery({ page_size: pageSize });
    },
    [upsertQuery]
  );
  return [page, updatePage, pageSize, updatePageSize];
}
