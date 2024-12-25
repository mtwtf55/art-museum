import "@testing-library/jest-dom";

import { FavouritesLink, HomeLink } from "@Components";
import { PathNames } from "@Constants";
import { Favourites, Home } from "@Pages";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { ICON_TEST_ID } from "../testIds";

const HOME_PAGE_TEST_ID = "home-page";
const FAVOURITES_PAGE_TEST_ID = "favourites-page";

jest.mock("@Pages/Home/Home", () => ({
  __esModule: true,
  Home: () => <div data-testid={HOME_PAGE_TEST_ID} />,
}));

jest.mock("@Pages/Favourites/Favourites", () => ({
  __esModule: true,
  Favourites: () => <div data-testid={FAVOURITES_PAGE_TEST_ID} />,
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
          <Route path={PathNames.HOME} element={<Home />} />
          <Route path={PathNames.FAVOURITES} element={<Favourites />} />
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
