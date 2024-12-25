import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import FavouritesLink from "../../components/Header/Links/FavouritesLink";
import HomeLink from "../../components/Header/Links/HomeLink";
import { ICON_TEST_ID } from "../testIds";

jest.mock("@Components/Header/Links/HomeLink");
jest.mock("@Components/Header/Links/FavouritesLink");

const BURGER_MENU_ICON = ICON_TEST_ID;
const BURGER_MENU_LINKS = "links-container";

describe(BurgerMenu.name, () => {
  beforeEach(() => {
    render(<BurgerMenu />);
  });

  it("should be defined", () => {
    expect(BurgerMenu).toBeDefined();
  });

  it("should render burger icon and links", () => {
    expect(HomeLink).toHaveBeenCalled();
    expect(FavouritesLink).toHaveBeenCalled();
    expect(screen.getByTestId(BURGER_MENU_ICON)).toBeInTheDocument();
  });

  it("should activate menu links when clicked on icon", () => {
    userEvent.click(screen.getByTestId(BURGER_MENU_ICON));
    expect(
      screen.getByTestId(BURGER_MENU_LINKS).className.includes("active"),
    ).toBe(true);

    userEvent.click(screen.getByTestId(BURGER_MENU_ICON));
    expect(
      screen.getByTestId(BURGER_MENU_LINKS).className.includes("active"),
    ).toBe(false);
  });
});
