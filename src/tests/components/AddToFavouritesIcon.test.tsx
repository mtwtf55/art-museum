import "@testing-library/jest-dom";

import { AddToFavouritesIcon } from "@Components";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const ICON_TEST_ID = "icon";
const ICON_HOVERED_TEST_ID = "icon-hovered";
const ICON_FILLED_TEST_ID = "filled-icon";
const ICON_FILLED_HOVERED_TEST_ID = "filled-icon-hovered";

describe(AddToFavouritesIcon.name, () => {
  it("should render icon when isFavourite false", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={false} />);
    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
  });

  it("should render icon filled when isFavourite true", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={true} />);
    expect(screen.getByTestId(ICON_FILLED_TEST_ID)).toBeInTheDocument();
  });

  it("should render icon hovered when hover event triggers", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={false} />);

    userEvent.hover(screen.getByTestId(ICON_TEST_ID));
    expect(screen.getByTestId(ICON_HOVERED_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_TEST_ID)).toBeNull();

    userEvent.unhover(screen.getByTestId(ICON_HOVERED_TEST_ID));
    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_HOVERED_TEST_ID)).toBeNull();
  });

  it("should render icon filled hovered when hover event triggers", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={true} />);

    userEvent.hover(screen.getByTestId(ICON_FILLED_TEST_ID));
    expect(screen.getByTestId(ICON_FILLED_HOVERED_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_FILLED_TEST_ID)).toBeNull();

    userEvent.unhover(screen.getByTestId(ICON_FILLED_HOVERED_TEST_ID));
    expect(screen.getByTestId(ICON_FILLED_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_FILLED_HOVERED_TEST_ID)).toBeNull();
  });
});
