import { API_BASE_URL } from "@Constants/constants";

type CreateRequestUrlType = {
  limit: (limit: number) => CreateRequestUrlType;
  fields: (fields: string[]) => CreateRequestUrlType;
  page: (page: number) => CreateRequestUrlType;
  q: (q: string) => CreateRequestUrlType;
  artwork: (id: number) => CreateRequestUrlType;
  search: (q: string) => CreateRequestUrlType;
  ids: (ids: number[]) => CreateRequestUrlType;
  random: (length?: number) => CreateRequestUrlType;
  offset: (value: number) => CreateRequestUrlType;
  build: () => string;
};

const RANDOM_CEILING = 10000;
const RANDOM_ARTWORKS_COUNT = 30;

export function createRequestUrl(): CreateRequestUrlType {
  let reqUrl = `${API_BASE_URL}`;

  const params: {
    limit?: number;
    fields?: string[];
    page?: number;
    q?: string;
    ids?: number[];
    offset?: number;
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

  function random(this: CreateRequestUrlType, length?: number) {
    params.ids = Array.from({ length: length ?? RANDOM_ARTWORKS_COUNT }, () =>
      Math.round(Math.random() * RANDOM_CEILING),
    );
    return this;
  }

  function offset(this: CreateRequestUrlType, value: number) {
    params.offset = value;
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
    _processOffset();

    const urlParams = Object.entries(params)
      .map((entry) => `${entry[0]}=${entry[1].toString()}`)
      .join("&");

    return `${reqUrl}?${urlParams}`;

    function _processOffset() {
      if (params.offset && !params.page) params.page = params.offset;
      else if (params.page && params.offset) params.page += params.offset;
    }
  }

  return {
    limit,
    artwork,
    build,
    fields,
    page,
    q,
    search,
    ids,
    random,
    offset,
  };
}
