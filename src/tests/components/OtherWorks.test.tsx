import "@testing-library/jest-dom";

import { OtherWorks } from "@Components";
import { render, screen } from "@testing-library/react";

import { mockArtwork } from "../helpers/mocks";

const CARD_MOCK_ID = "card-mock";

jest.mock("@Components/OtherWorks/ArtworkCardSmall/ArtworkCardSmall", () => ({
  __esModule: true,
  ArtworkCardSmall: () => <div data-testid={CARD_MOCK_ID} />,
}));

jest.mock("@Components/SortMenu/SortMenu");

describe(OtherWorks.name, () => {
  it("should be defined", () => {
    expect(OtherWorks).toBeDefined();
  });

  it("should display title", () => {
    render(
      <OtherWorks artworks={[]} setArtworks={() => jest.fn()} iiifUrl={""} />,
    );

    expect(screen.getByText("Here some more")).toBeInTheDocument();
    expect(screen.getByText("Other works for you")).toBeInTheDocument();
  });

  it("should render all cards", () => {
    const artworks = Array.from({ length: 5 }).map(mockArtwork);

    render(
      <OtherWorks
        artworks={artworks}
        setArtworks={() => jest.fn()}
        iiifUrl={"iiifUrl"}
      />,
    );
    expect(screen.queryAllByTestId(CARD_MOCK_ID).length).toBe(5);
  });
});
