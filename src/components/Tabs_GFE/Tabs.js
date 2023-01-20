import { useState } from "react";

export default function Tabs({ defaultValue, items }) {
  const [value, setValue] = useState(defaultValue ?? items[0].value);

  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map(({ value: itemValue, label }) => {
          const isActiveValue = itemValue === value;
          return (
            <button
              type="button"
              key={itemValue}
              className={[
                "tabs-list-item",
                isActiveValue && "tabs-list-item--active"
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setValue(itemValue)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ value: itemValue, content }) => {
          return (
            <div key={itemValue} hidden={itemValue !== value}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
