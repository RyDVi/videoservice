import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { RequestError, RequestType, ValidationErrors } from "./types";

export const AxiosContext = React.createContext<AxiosInstance>(null as any);
export function useAxiosContext() {
  const context = React.useContext(AxiosContext);
  if (!context) {
    throw new Error("AxiosContext is not available");
  }
  return context;
}

export function useAxiosRequest<D = any, R = any, E = ValidationErrors<D>>({
  initial,
  config,
}: {
  initial: D;
  config: (data: D) => AxiosRequestConfig<D>;
}): RequestType<D, R, E> {
  const axiosInstance = useAxiosContext();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<E | null>();
  const [data, setData] = React.useState<D>(initial);
  const [response, setResponse] = React.useState<AxiosResponse<R>>();
  const request = React.useCallback(
    async (requestData?: D) => {
      setLoading(true);
      return axiosInstance
        .request<D, AxiosResponse<R>>(config(requestData || data))
        .then(
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
    [axiosInstance, config, data]
  );
  return {
    request: request as RequestType<D, R, E>["request"],
    data,
    setData,
    error,
    response,
    loading,
  };
}
