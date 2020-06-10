import React, { useState } from "react";

const Tabs = props => {
  const [bindIndex, setBindIndex] = useState();
  const items = props.children.filter(item => item.type.name === "TabItem");
  const changeTab = newIndex => {
    if (typeof props.onTabClick === "function") props.onTabClick(newIndex);
    setBindIndex(newIndex);
  };

  return (
    <div className="wrapper">
      <div className="tab-menu">
        {items.map(({ props: { index, label } }) => (
          <button
            onClick={() => changeTab(index)}
            className={bindIndex === index ? "focus" : ""}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {items.map(({ props }) => (
          <div
            {...props}
            className="tab-view_item"
            key={props.index}
            style={{ display: bindIndex === props.index ? "block" : "none" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Tabs;

/* <Tabs defaultIndex="1" onTabClick={console.log}>
	<TabItem label="A" index="1">
		Lorem ipsum
	</TabItem>
	<TabItem label="B" index="2">
		Dolor sit amet
	</TabItem>
</Tabs> */