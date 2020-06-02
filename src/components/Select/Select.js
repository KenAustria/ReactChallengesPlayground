import React from "react";
import PropTypes from "prop-types";

export const Select = ({
  values,
  selected,
  callback,
  disabled = false,
  readonly = false
}) => {
  return (
    <select
      disabled={disabled}
      readOnly={readonly}
      onChange={({ target: { value } }) => callback(value)}
    >
      {values.map(([value, text]) => (
        <option key={value} selected={selected === value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  values: PropTypes.array,
  selected: PropTypes.bool,
  callback: PropTypes.func,
  disabled: PropTypes.bool,
  readyonly: PropTypes.bool
};

export default Select;

// const choices = [
// 	["micheal jordan", "Micheal Jordan"],
// 	["kobe bryant", "Kobe Bryant"],
// 	["lebron james", "LeBron James"]
// ];

// <Select values={choices} selected="micheal jordan" callback={val => console.log(val)} />