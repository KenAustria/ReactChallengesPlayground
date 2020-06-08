import React, { useState } from "react";

export const Collapse = props => {
  const [isCollapsed, setIsCollapsed] = useState(props.collapsed);
  const style = {
    collapsed: {
      display: "none"
    },
    expanded: {
      display: "block"
    }
  };

  return (
    <div>
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "Hide" : "Show"}
      </button>
      <div
        style={isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={isCollapsed ? style.collapsed : style.expanded}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Collapse;

{/* <Collapse>
  <h1>Here I am</h1>
  <h2>Rock you like a HURRICANE</h2>
</Collapse> */}