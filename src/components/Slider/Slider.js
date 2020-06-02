import React from "react";
import PropTypes from "prop-types";

const Slider = ({ callback, disabled = false, readOnly = false }) => {
  return (
    <input
      type="range"
      readOnly={readOnly}
      disabled={disabled}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
};

Slider.propTypes = {
  callback: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default Slider;

/* <Slider callback={value => console.log(value)} /> */