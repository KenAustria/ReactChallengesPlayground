import React, { useState } from "react";

const style = {
  listContainer: {
    listStyle: "none",
    paddingLeft: 0
  },
  itemStyle: {
    cursor: "pointer",
    padding: 5
  }
};

export const MultiselectCheckbox = ({ options, onChange }) => {
  const [data, setData] = useState(options);

  const toggle = item => {
    data.forEach((_, key) => {
      if (data[key].label === item.label) data[key].checked = !item.checked;
    });
    setData([...data]);
    onChange(data);
  };

  return (
    <ul style={style.listContainer}>
      {data.map(item => {
        return (
          <li
            key={item.label}
            style={style.itemStyle}
            onClick={() => toggle(item)}
          >
            <input readOnly type="checkbox" checked={item.checked || false} />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};

export default MultiselectCheckbox;

// const baz = [{ label: "Hi" }, { label: "Hey" }, { label: "Hello" }];
// <MultiselectCheckbox
//   options={baz}
//   onChange={data => {
//     console.log(data);
//   }}
// />;
