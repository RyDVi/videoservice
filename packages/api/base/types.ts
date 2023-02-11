export interface Dictionary {
  readonly id: string;
  name: string;
}
export type PageFiltersKeys = 'page' | 'page_size';
export type OrderingKey<Key extends string = 'ordering'> = Key;
export type RelaxedPageFilters = Partial<
  Record<PageFiltersKeys | OrderingKey, string | number>
>;
export interface Paginated<T> {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
  summary?: Record<string, number>;
}

export interface RequestError<T = any> {
  data: T | null;
  message: string;
  code?: string | number;
  isCancel: boolean;
}
