import React from 'react';
import { useRange } from './counter';

export interface PaginationProps {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
  pages: (number | string)[];
}

const COUNT_NEIGHBORHOOD_ELEMENTS = 1;

interface PaginationInfo {
  countEntries: number;
  pageSize: number;
}

export function usePagination(
  value: number,
  onChange: (page: number) => void,
  { countEntries, pageSize = 25 }: PaginationInfo
): PaginationProps {
  const countPages = React.useMemo(
    () => Math.ceil(countEntries / pageSize),
    [countEntries, pageSize]
  );
  const {
    value: currentPage,
    increment: nextPage,
    decrement: previousPage,
    setValue: setPage,
  } = useRange(value, onChange, 1, countPages);
  const pages: (number | string)[] = React.useMemo(() => {
    // TODO: Next is something magic. Need define correct methods and implementation
    let startFrom = currentPage - COUNT_NEIGHBORHOOD_ELEMENTS;
    if (startFrom < 4) {
      startFrom = 1;
    } else if (countPages - currentPage < 4) {
      startFrom = countPages - 4;
    }
    let endTo = currentPage + COUNT_NEIGHBORHOOD_ELEMENTS;
    if (countPages - currentPage < 5) {
      endTo = countPages;
    } else if (startFrom < 4 && countPages > 7 && currentPage < 5) {
      endTo = 5;
    }
    let neighborhoodItems = [];
    for (let i = startFrom; i <= endTo; i++) {
      neighborhoodItems.push(i);
    }

    const dotsBefore = startFrom > 3 ? '...' : undefined;
    const dotsAfter = endTo < countPages - 2 ? '...' : undefined;
    return [
      startFrom > 1 ? 1 : undefined,
      dotsBefore,
      ...neighborhoodItems,
      dotsAfter,
      endTo < countPages ? countPages : undefined,
    ].filter((x) => x !== undefined) as (number | string)[];
  }, [countPages, currentPage]);

  return { currentPage, nextPage, previousPage, setPage, pages };
}
