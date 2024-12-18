import { API_BASE_URL } from "@constants/constants";

type CreateRequestUrlType = {
  limit: (limit: number) => CreateRequestUrlType;
  fields: (fields: string[]) => CreateRequestUrlType;
  page: (page: number) => CreateRequestUrlType;
  q: (q: string) => CreateRequestUrlType;
  artwork: (id: number) => CreateRequestUrlType;
  search: (q: string) => CreateRequestUrlType;
  ids: (ids: number[]) => CreateRequestUrlType;
  build: () => string;
};

export function createRequestUrl(): CreateRequestUrlType {
  let reqUrl = `${API_BASE_URL}`;

  const params: {
    limit?: number;
    fields?: string[];
    page?: number;
    q?: string;
    ids?: number[];
  } = {};

  function limit(this: CreateRequestUrlType, limit: number) {
    params.limit = limit;
    return this;
  }

  function fields(this: CreateRequestUrlType, fields: string[]) {
    params.fields = fields;
    return this;
  }

  function page(this: CreateRequestUrlType, page: number) {
    params.page = page;
    return this;
  }

  function q(this: CreateRequestUrlType, q: string) {
    params.q = q;
    return this;
  }

  function ids(this: CreateRequestUrlType, ids: number[]) {
    params.ids = ids;
    return this;
  }

  function artwork(this: CreateRequestUrlType, id: number) {
    reqUrl = API_BASE_URL + `/${id}`;
    return this;
  }

  function search(this: CreateRequestUrlType, q: string) {
    reqUrl = API_BASE_URL + `/search`;
    this.q(q);
    return this;
  }

  function build() {
    const urlParams = Object.entries(params)
      .map((entry) => `${entry[0]}=${entry[1].toString()}`)
      .join("&");

    return `${reqUrl}?${urlParams}`;
  }

  return { limit, artwork, build, fields, page, q, search, ids };
}
