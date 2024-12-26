import "@testing-library/jest-dom";

import { ArtworkCardSmall } from "@Components";
import { ArtworkCardSmallProps } from "@Components/OtherWorks/ArtworkCardSmall/ArtworkCardSmall";
import { render, screen } from "@testing-library/react";

import { mockArtwork } from "../helpers/mocks";

const MOCK_PROPS: ArtworkCardSmallProps = {
  artwork: mockArtwork(),
  iiifUrl: "iiifUrl",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe(ArtworkCardSmall.name, () => {
  it("should be defined", () => {
    expect(ArtworkCardSmall.name).toBeDefined();
  });

  it("should display props", () => {
    render(
      <ArtworkCardSmall
        artwork={MOCK_PROPS.artwork}
        iiifUrl={MOCK_PROPS.iiifUrl}
      />,
    );
    expect(screen.getByText(MOCK_PROPS.artwork.title)).toBeInTheDocument();
    expect(
      screen.getByText(MOCK_PROPS.artwork.artist_title),
    ).toBeInTheDocument();
    expect(screen.getByText("Public")).toBeInTheDocument();
  });
});
