import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SortMenu from "../../components/SortMenu/SortMenu";
import { ICON_TEST_ID } from "../testIds";

const SORT_MENU_TEST_ID = "sort-menu";

describe(SortMenu.name, () => {
  it("should be defined", () => {
    expect(SortMenu).toBeDefined();
  });

  it("should render select sort type icon", () => {
    render(<SortMenu data={[]} setData={jest.fn()} />);

    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
  });

  it("should render menu items when menu icon is clicked", () => {
    render(<SortMenu data={[]} setData={jest.fn()} />);

    userEvent.click(screen.getByTestId(ICON_TEST_ID));
    expect(screen.getByTestId(SORT_MENU_TEST_ID)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ICON_TEST_ID));
    expect(screen.queryByTestId(SORT_MENU_TEST_ID)).toBeFalsy();
  });
});
