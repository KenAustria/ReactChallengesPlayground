import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

test("renders an alert", () => {
  const { getByTestId } = render(<Alert />);
  expect(getByTestId("alert")).toBeInTheDocument();
});
