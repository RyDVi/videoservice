import { SortQuery, usePage, UsePageProps, UsePageReturnProps, useSort } from '@modules/nextjs';
import { GridSortModel } from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';

export const sortModelAdapter = (sorting: SortQuery): GridSortModel => {
  // MIT version support only one sort column per table
  return Object.entries(sorting).map(([field, sort]) => ({ field, sort }));
};

export function useGridSortModel(): [GridSortModel, (model: GridSortModel) => void] {
  const { clearSort, setSort, sorting } = useSort();
  const sortModel = useMemo(() => sortModelAdapter(sorting), [sorting]);
  const onSortModelChange = useCallback(
    (model: GridSortModel) => {
      // MIT version support only one sort column per table
      if (!model.length) {
        clearSort();
        return;
      }
      setSort(model[0].field, model[0].sort);
    },
    [clearSort, setSort]
  );
  return [sortModel, onSortModelChange];
}

export function useMuiPage(pageProps: UsePageProps): UsePageReturnProps {
  // MUI grid return page starts from zero
  const [page, setPage, pageSize, setPageSize] = usePage(pageProps);
  const muiPage = useMemo(() => page - 1, [page]);
  const setFromMuiPage = useCallback((page: number) => setPage(page), [setPage]);
  return [muiPage, setFromMuiPage, pageSize, setPageSize];
}
