import * as types from "./types";

type NumberFilters = Record<string, string | undefined | number>;
export const BASE_URL = "/api/v1";

export class BaseEndpoint {
  uri: string;

  constructor(uri: string) {
    this.uri = BASE_URL + uri;
  }
}

export class RestEndpoint extends BaseEndpoint {
  retrieve = (id?: string | string[]) => {
    if (!id || typeof id === "object") {
      return {
        url: null,
        method: "GET",
      };
    }
    return {
      url: `${this.uri}${id}/`,
      method: "GET",
    };
  };

  destroy = (id?: string | string[]) => {
    if (!id || typeof id === "object") {
      return {
        url: undefined,
        method: "DELETE",
      };
    }
    return {
      url: `${this.uri}${id}/`,
      method: "DELETE",
    };
  };
}

export class Endpoint<F = NumberFilters> extends RestEndpoint {
  list = (params?: F) => ({
    url: this.uri,
    method: "GET",
    params,
  });
}

export class PaginatedEndpoint<
  F = types.RelaxedPageFilters
> extends RestEndpoint {
  list = (params?: F & types.RelaxedPageFilters) => ({
    url: this.uri,
    method: "GET",
    params,
  });
}

export class SaveEndpoint<
  U extends { id?: string },
  F = NumberFilters
> extends Endpoint<F> {
  save = (data: U) => ({
    url: data.id ? `${this.uri}${data.id}/` : this.uri,
    method: data.id ? "PUT" : "POST",
    data,
  });
}

export class PaginatedSaveEndpoint<
  T extends { id?: string },
  F = types.RelaxedPageFilters,
  U extends { id?: string } = T
> extends PaginatedEndpoint<F> {
  save = (data: U) => ({
    url: data.id ? `${this.uri}${data.id}/` : this.uri,
    method: data.id ? "PUT" : "POST",
    data,
  });
}

// export class DictionaryEndpoint<
//   T extends types.Dictionary = types.Dictionary
// > extends BaseEndpoint {
//   create = (data: Omit<T, 'id'>) => {
//     return request<T & { id: string }>({
//       url: this.uri,
//       method: 'POST',
//       data,
//     });
//   };
//   list = () => {
//     return request<T[]>({
//       url: this.uri,
//       method: 'GET',
//     });
//   };
// }
