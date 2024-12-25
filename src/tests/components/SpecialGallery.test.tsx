import "@testing-library/jest-dom";

import { SpecialGallery } from "@Components";
import { render, screen } from "@testing-library/react";

import { mockArtwork } from "../helpers/mocks";

const CARD_COUNT = 3;
const CARD_TEST_ID = "card";

jest.mock("@Components/SpecialGallery/ArtworkCard", () => ({
  __esModule: true,
  ArtworkCard: () => <div data-testid={CARD_TEST_ID} />,
}));

describe(SpecialGallery.name, () => {
  it("should be defined", () => {
    expect(SpecialGallery).toBeDefined();
  });

  it("should render all cards", () => {
    const artworks = Array.from({ length: CARD_COUNT }, mockArtwork);

    render(
      <SpecialGallery
        artworks={artworks}
        iiifUrl={""}
        onNextPage={jest.fn()}
        currentPage={0}
      />,
    );

    expect(screen.getAllByTestId(CARD_TEST_ID).length).toBe(CARD_COUNT);
  });

  it("should display title", () => {
    render(
      <SpecialGallery
        artworks={[]}
        iiifUrl={""}
        onNextPage={jest.fn()}
        currentPage={0}
      />,
    );

    expect(screen.getByText("Topics for you")).toBeInTheDocument();
    expect(screen.getByText("Our special gallery")).toBeInTheDocument();
  });
});
