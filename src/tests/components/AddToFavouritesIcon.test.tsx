import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddToFavouritesIcon from "../../components/Buttons/AddToFavourites/AddToFavouritesIcon";
import ErrorBoundaryFallback from "../../components/ErrorBoundaryFallback/ErrorBoundaryFallback";

const ICON_TESTID = "icon";
const ICON_HOVERED_TESTID = "icon-hovered";
const ICON_FILLED_TESTID = "filled-icon";
const ICON_FILLED_HOVERED_TESTID = "filled-icon-hovered";

describe(ErrorBoundaryFallback.name, () => {
  it("should render icon when isFavourite false", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={false} />);
    expect(screen.getByTestId(ICON_TESTID)).toBeInTheDocument();
  });

  it("should render icon filled when isFavourite true", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={true} />);
    expect(screen.getByTestId(ICON_FILLED_TESTID)).toBeInTheDocument();
  });

  it("should render icon hovered when hover event triggers", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={false} />);

    userEvent.hover(screen.getByTestId(ICON_TESTID));
    expect(screen.getByTestId(ICON_HOVERED_TESTID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_TESTID)).toBeNull();

    userEvent.unhover(screen.getByTestId(ICON_HOVERED_TESTID));
    expect(screen.getByTestId(ICON_TESTID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_HOVERED_TESTID)).toBeNull();
  });

  it("should render icon filled hovered when hover event triggers", () => {
    render(<AddToFavouritesIcon onClick={jest.fn()} isFavourite={true} />);

    userEvent.hover(screen.getByTestId(ICON_FILLED_TESTID));
    expect(screen.getByTestId(ICON_FILLED_HOVERED_TESTID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_FILLED_TESTID)).toBeNull();

    userEvent.unhover(screen.getByTestId(ICON_FILLED_HOVERED_TESTID));
    expect(screen.getByTestId(ICON_FILLED_TESTID)).toBeInTheDocument();
    expect(screen.queryByTestId(ICON_FILLED_HOVERED_TESTID)).toBeNull();
  });
});
