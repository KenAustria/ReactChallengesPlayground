import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ControlledInput = ({
  callback,
  defaultValue,
  placeholder = "",
  type = "text",
  disabled = false,
  readOnly = false
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    callback(value);
  }, [value]);

  return (
    <div>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  );
};

ControlledInput.propTypes = {
  callback: PropTypes.func,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default ControlledInput;
