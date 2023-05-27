export interface Dictionary {
  readonly id: string;
  name: string;
}
export type PageFiltersKeys = "page" | "page_size";
export type OrderingKey<Key extends string = "ordering"> = Key;
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

export interface ListValidationErrors<T> {
  [index: number]: T extends string | number | symbol
    ? string[]
    : ValidationErrors<T>;
}

export type ValidationErrors<T> = {
  [K in keyof T]?: T[K] extends any[]
    ? ListValidationErrors<T[K][number]>
    : T[K] extends Record<string, any> | undefined | null
    ? ValidationErrors<T[K]>
    : string[];
} & { non_field_errors?: string[] };

export interface ApiRequest<Data = any> {
  url: string;
  method: "POST" | "PUT" | "DELETE" | "HEAD" | "GET" | "OPTIONS";
  data: Data;
}
