import { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import axiosInstance from './axios';
import { RequestError } from './types';

export interface ListValidationErrors<T> {
  [index: number]: T extends string | number | symbol ? string[] : ValidationErrors<T>;
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

export function useRequest<D = any, R = any, E = ValidationErrors<D>>({
  initial,
  config,
}: {
  initial: D;
  config: (data: D) => AxiosRequestConfig<D>;
}): RequestType<D, R, E> {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<E | null>();
  const [data, setData] = React.useState<D>(initial);
  const [response, setResponse] = React.useState<AxiosResponse<R>>();
  const request = React.useCallback(
    async (requestData?: D) => {
      setLoading(true);
      return axiosInstance.request<D, AxiosResponse<R>>(config(requestData || data)).then(
        (response) => {
          setLoading(false);
          setResponse(response);
          return response;
        },
        (error: RequestError<E>) => {
          setLoading(false);
          setError(error.data);
          throw error.data;
        }
      );
    },
    [data, config, setError]
  );
  return {
    request: request as RequestType<D, R, E>['request'],
    data,
    setData,
    error,
    response,
    loading,
  };
}
