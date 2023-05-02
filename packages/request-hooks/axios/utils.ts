import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";
import { getCookie } from "cookies-next";
import { RequestError } from "./types";

export function createRequestError(error: any): RequestError {
  if (axios.isAxiosError(error)) {
    return {
      data: error.response?.data ?? null,
      message: error.message,
      code: error.response?.status,
      isCancel: axios.isCancel(error),
    };
  } else {
    return {
      data: null,
      message: error.message,
      code: error.code,
      isCancel: false,
    };
  }
}

const errorInterceptor = (error: AxiosError): Promise<RequestError> => {
  if (error.response?.status === 401) {
    // eslint-disable-next-line no-console
    console.error("auth failure");
  }
  return Promise.reject(createRequestError(error));
};

export const getAuthHeader = (accessToken: string) => ({
  Authorization: `Token ${accessToken}`,
});

export const setAuthHeader = (
  axiosInstance: AxiosInstance,
  accessToken: string
) => (axiosInstance.defaults.headers["Authorization"] = `Token ${accessToken}`);

export const getCsrfConfig = (baseURL: string): AxiosRequestConfig => {
  const accessToken = getCookie("access_token");
  return {
    baseURL,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      ...(accessToken ? getAuthHeader(String(accessToken)) : {}),
    },
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  };
};

export const createRequestInstance = (
  config: AxiosRequestConfig,
  withDefaultInterceptor = false
): AxiosInstance => {
  const axiosInstance = axios.create(config);
  if (withDefaultInterceptor) {
    axiosInstance.interceptors.response.use(
      (response) => response,
      errorInterceptor
    );
  }
  return axiosInstance;
};
