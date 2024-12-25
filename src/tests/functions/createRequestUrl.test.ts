import { REQUESTED_FIELDS } from "@Constants";
import { createRequestUrl } from "@Utils";
const QUERY_REGEX = /[?&]([^=]+)(=([^&#]*))?/g;

describe(createRequestUrl.name, () => {
  it("should return correct request url", () => {
    const reqUrl = createRequestUrl()
      .limit(1)
      .offset(1)
      .fields(REQUESTED_FIELDS)
      .page(1)
      .q("q")
      .ids([1, 2, 3])
      .build();

    expect(Array.from(reqUrl.matchAll(QUERY_REGEX)).length).toBe(6);
  });
});
