import { AxiosResponse } from "axios";
import { ValidationErrors } from "@modules/api";

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
