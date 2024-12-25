import "@testing-library/jest-dom";

import FavouritesLink from "@Components/Header/Links/FavouritesLink";
import HomeLink from "@Components/Header/Links/HomeLink";
import pathNames from "@Constants/path-names";
import Favourites from "@Pages/Favourites/Favourites";
import Home from "@Pages/Home/Home";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { ICON_TEST_ID } from "../testIds";

const HOME_PAGE_TEST_ID = "home-page";
const FAVOURITES_PAGE_TEST_ID = "favourites-page";

jest.mock("@Pages/Home/Home", () => ({
  __esModule: true,
  default: () => <div data-testid={HOME_PAGE_TEST_ID} />,
}));

jest.mock("@Pages/Favourites/Favourites", () => ({
  __esModule: true,
  default: () => <div data-testid={FAVOURITES_PAGE_TEST_ID} />,
}));

describe("Links", () => {
  it("should be defined", () => {
    expect(HomeLink).toBeDefined();
    expect(FavouritesLink).toBeDefined();
  });

  it("should navigate between pages", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path={pathNames.HOME} element={<Home />} />
          <Route path={pathNames.FAVOURITES} element={<Favourites />} />
        </Routes>
        <FavouritesLink />
        <HomeLink />
      </MemoryRouter>,
    );

    const links = screen.getAllByTestId(ICON_TEST_ID);
    expect(links.length).toBe(2);

    userEvent.click(links[0]);
    expect(screen.queryByTestId(FAVOURITES_PAGE_TEST_ID)).toBeInTheDocument();

    userEvent.click(links[1]);
    expect(screen.queryByTestId(HOME_PAGE_TEST_ID)).toBeInTheDocument();
  });
});
