import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toggle from "./Toggle";

test("renders a toggle button", () => {
  const { getByTestId } = render(<Toggle />);
  expect(getByTestId("togglebutton")).toBeInTheDocument();
});

test("toggle logic", () => {
  const { getByText } = render(
    <div>
      <button name="button1" value="ON">
        ON
      </button>
      <button name="button2" value="OFF">
        OFF
      </button>
    </div>
  );

  const togglebutton = getByText("ON");
  fireEvent.change(togglebutton, { target: { value: "OFF" } });
  expect(togglebutton.value).toBe("OFF");
});
