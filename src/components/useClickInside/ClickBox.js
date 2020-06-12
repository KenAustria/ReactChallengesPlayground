import React, { useRef } from "react";
import useClickInside from "./UseClickInside";
import PropTypes from "prop-types";

const ClickBox = ({ onClickInside }) => {
  const clickRef = useRef();
  useClickInside(clickRef, onClickInside);
  return (
    <div
      className="click-box"
      ref={clickRef}
      style={{
        border: "2px dashed orangered",
        height: 200,
        width: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <p>Click inside this element</p>
    </div>
  );
};

ClickBox.propTypes = {
  onClickInside: PropTypes.func
};

export default ClickBox;

/* <ClickBox onClickInside={() => alert("what did you do?")} /> */
