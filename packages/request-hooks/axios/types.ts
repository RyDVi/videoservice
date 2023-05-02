import { AxiosResponse } from "axios";

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

export type RequestType<D = any, R = any, E = ValidationErrors<D>> = {
  data: D;
  setData: (data: D) => void;
  error?: E | null;
  request: (data?: D) => Promise<AxiosResponse<R>>;
  response?: AxiosResponse<R>;
  loading: boolean;
};

export interface RequestError<T = any> {
  data: T | null;
  message: string;
  code?: string | number;
  isCancel: boolean;
}
