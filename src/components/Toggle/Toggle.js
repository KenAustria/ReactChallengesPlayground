import React, { useState } from "react";

export const Toggle = () => {
  const [isToggleOn, setIsToggleOn] = useState("off");

  const toggleStyle = {
    on: {
      backgroundColor: "red"
    },
    off: {
      backgroundColor: "yellow"
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsToggleOn(!isToggleOn)}
        style={isToggleOn ? toggleStyle.on : toggleStyle.off}
      >
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default Toggle;
