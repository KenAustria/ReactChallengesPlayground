import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ToggleButton = styled.button`
  margin: 5px;
  padding: 5px;
  font-size: 12px;
  border-radius: 4px;
  width: 100px;
  height: 40px;
  color: #ffffff;
  background-color: #70a3cc;
`;

const Toggle = ({ defaultToggled }) => {
  const [isToggleOn, setIsToggleOn] = useState(defaultToggled);

  return (
    <div>
      <ToggleButton
        data-testid="togglebutton"
        onClick={() => {
          setIsToggleOn(!isToggleOn);
        }}
      >
        {isToggleOn ? "ON" : "OFF"}
      </ToggleButton>
    </div>
  );
};

Toggle.propTypes = {
  defaultToggled: PropTypes.bool
};

export default Toggle;
// <Toggle defaultToggled="false" />