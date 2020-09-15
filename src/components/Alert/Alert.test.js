import React from "react";
import { render, waitForElement } from "@testing-library/react";
import Alert from "./Alert";

test("renders an alert", async () => {
  const { getByTestId } = render(<Alert />);
  await waitForElement(() => getByTestId("alert"));
  expect(getByTestId("alert")).toBeInTheDocument();
});
