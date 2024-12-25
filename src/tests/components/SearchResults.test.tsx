import "@testing-library/jest-dom";

import { SearchResults } from "@Components";
import { render, screen } from "@testing-library/react";

import { mockArtwork } from "../helpers/mocks";
import { NOT_FOUND_PLACEHOLDER_TEST_ID } from "../testIds";

const SEARCH_RESULTS_COUNT = 5;
const CARD_TEST_ID = "card";

jest.mock("@Components/OtherWorks/ArtworkCardSmall/ArtworkCardSmall", () => ({
  __esModule: true,
  ArtworkCardSmall: () => <div data-testid={CARD_TEST_ID} />,
}));

describe(SearchResults.name, () => {
  it("should be defined", () => {
    expect(SearchResults).toBeDefined();
  });

  it("should render search results", () => {
    const searchResults = Array.from({ length: SEARCH_RESULTS_COUNT }).map(
      mockArtwork,
    );

    render(
      <SearchResults
        artworks={searchResults}
        setArtworks={jest.fn()}
        iiifUrl={""}
      />,
    );

    expect(screen.getAllByTestId(CARD_TEST_ID).length).toBe(
      SEARCH_RESULTS_COUNT,
    );
  });

  it("should render not found placeholder if no search results", () => {
    render(
      <SearchResults artworks={[]} setArtworks={jest.fn()} iiifUrl={""} />,
    );

    expect(
      screen.getByTestId(NOT_FOUND_PLACEHOLDER_TEST_ID),
    ).toBeInTheDocument();
    expect(screen.queryAllByTestId(CARD_TEST_ID).length).toBe(0);
  });
});
