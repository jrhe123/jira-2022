import React from "react";
import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("test Mark component highlight feat", () => {
  const name = "test 123";
  const keyword = "test";

  render(<Mark name={name} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle({ color: "#257AFD" });
  expect(screen.getByText("123")).not.toHaveStyle({ color: "#257AFD" });
});
