import { useId, useState } from "react";

// declaring the function outside of scope for readability and reusability.

// generates a unique id string to use as the value of the id attribute of tab items
function getTabListItemId(tabsId, value) {
  return tabsId + "-tab-" + value;
}

// generates unique id string to use as value of the id attribute of tabpanels
function getTabPanelId(tabsId, value) {
  return tabsId + "-tabpanel-" + value;
}

export default function Tabs({ defaultValue, items }) {
  // generate unique id
  const [tabsId] = useId();
  // if defaultValue isn't provided, use first item as value
  const [tabValue, setTabValue] = useState(defaultValue ?? items[0].value);

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist">
        {items.map(({ value, label }) => {
          // if tabValue state matches value key, then that's the active tab
          const isActiveValue = value === tabValue;
          return (
            <button
              type="button"
              role="tab"
              key={value}
              id={getTabListItemId(tabsId, value)}
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
              // identifies element whose contents are controlled by element this attribute is set
              aria-controls={getTabPanelId(tabsId, value)}
              // indicates current selected state
              aria-selected={isActiveValue}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ value, panel }) => {
          return (
            <div
              role="tabpanel"
              key={value}
              id={getTabPanelId(tabsId, value)}
              //  identifies element that labels the element it is applied to
              aria-labelledby={getTabListItemId(tabsId, value)}
              hidden={value !== tabValue}
            >
              {panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
