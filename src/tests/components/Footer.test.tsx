import { Footer } from "@Components";
import { render, screen } from "@testing-library/react";
import React from "react";

import { ICON_TEST_ID } from "../testIds";

describe(Footer.name, () => {
  it("should be defined", () => {
    expect(Footer).toBeDefined();
  });

  it("should display two icons when rendered", () => {
    render(<Footer />);
    expect(screen.getAllByTestId(ICON_TEST_ID).length).toBe(2);
  });
});
