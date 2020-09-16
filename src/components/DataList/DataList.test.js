import React from "react";
import { render, getAllByRole } from "@testing-library/react";
import DataList from "./DataList";

test("renders list items", () => {
  const names = ["John", "Paul", "Mary"];

  const { getAllByRole } = render(<DataList data={names} />);

  const listItems = getAllByRole("listitem");
  expect(listItems).toHaveLength(3);
});
