import React from "react";
import PropTypes from "prop-types";

export const Textarea = ({
  cols,
  rows,
  placeholder,
  callback,
  disabled = false,
  readOnly = false
}) => {
  return (
    <textarea
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      onChange={({ target: { val } }) => callback(val)}
      disabled={false}
    />
  );
};

Textarea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  callback: PropTypes.func,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool
};

export default Textarea;

/* <Textarea
  cols={20}
  rows={2}
  placeholder="Hello"
  callback={val => console.log(val)}
/> */