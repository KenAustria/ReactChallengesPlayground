import { useState } from "react";

export default function Tabs({ defaultValue, items }) {
  // if defaultValue isn't provided, use first item as value
  const [tabValue, setTabValue] = useState(defaultValue ?? items[0].value);

  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map(({ value, label }) => {
          // if tabValue state matches value key, then that's the active tab
          const isActiveValue = value === tabValue;
          return (
            <button
              type="button"
              key={value}
              // tabs-list-item style is always applied
              // if isActiveValue is truthy, also apply tabs-list-item--active styles
              // elements that pass null check are passed to new array
              // then join to create "tabs-list-item tabs-list-item--active"
              className={[
                "tabs-list-item",
                isActiveValue && "tabs-list-item--active"
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setTabValue(value)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ value, content }) => {
          return (
            <div key={value} hidden={value !== tabValue}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
