import "@testing-library/jest-dom";

import Header from "@Components/Header/Header";
import { render, screen } from "@testing-library/react";

import * as useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { BURGER_MENU_TEST_ID } from "../testIds";

const MAIN_MENU_TEST_ID = "main-menu";
const BIG_DIMENSIONS = [1920, 1080];
const SMALL_DIMENSIONS = [320, 240];

jest.mock("@Components/Header/Links/HomeLink");
jest.mock("@Components/Header/Links/FavouritesLink");

function mockUseDimensionsHook(width: number, height: number) {
  jest.spyOn(useWindowDimensions, "default").mockImplementation(() => ({
    width,
    height,
  }));
}

describe(Header.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(Header).toBeDefined();
  });

  it("should display main menu when dimensions are big enough", () => {
    mockUseDimensionsHook(BIG_DIMENSIONS[0], BIG_DIMENSIONS[1]);

    render(<Header />);
    expect(screen.queryByTestId(MAIN_MENU_TEST_ID)).toBeTruthy();
    expect(screen.queryByTestId(MAIN_MENU_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(BURGER_MENU_TEST_ID)).toBeFalsy();
  });

  it("should display burger menu when dimensions are small", () => {
    mockUseDimensionsHook(SMALL_DIMENSIONS[0], SMALL_DIMENSIONS[1]);

    render(<Header />);
    expect(screen.queryByTestId(BURGER_MENU_TEST_ID)).toBeTruthy();
    expect(screen.queryByTestId(BURGER_MENU_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(MAIN_MENU_TEST_ID)).toBeFalsy();
  });
});
